const jsforce = require('jsforce');
const userDomain = require('./domain/userDomain');

let oauth2;

let auth = {
    setOAuthInfo(clientId, clientSecret, loginCallback) {
        oauth2 = new jsforce.OAuth2({
            loginUrl : 'https://login.salesforce.com',
            clientId : clientId,
            clientSecret: clientSecret,
            redirectUri : loginCallback
        });
    },
    getConnection(req) {
        let authInfo = req.session.authInfo;
        let conn = new jsforce.Connection({
            logLevel: 'DEBUG',
            oauth2: oauth2,
            instanceUrl : authInfo.instanceUrl,
            accessToken : authInfo.accessToken,
            refreshToken : authInfo.refreshToken
        });
        conn.on("refresh", function(accessToken, res) {
            console.log('Refresh handler received accessToken: ' + accessToken);
            let authInfo = req.session.authInfo;
            authInfo.accessToken = accessToken
            req.session.authInfo = authInfo;
        });

        return conn;
    },
    getUserInfo(req) {
        let authInfo = req.session.authInfo;
        let userInfo = req.session.userInfo;
        let info = {
            loggedIn: false,
            username: null
        };

        console.log('Auth Info: ' + JSON.stringify(authInfo));
        console.log('User Info: ' + JSON.stringify(userInfo));

        if (authInfo != null && userInfo != null) {
            info.loggedIn = true;
            info.username = authInfo.username;
            info.userDisplayName = userInfo.userDisplayName;
            info.points = userInfo.points;
            info.rank = userInfo.rank;
            info.instanceUrl = authInfo.instanceUrl;
        }

        return info;
    },
    getDbUserId(req) {
        if (req.session && req.session.userInfo && req.session.userInfo.dbId) {
            return req.session.userInfo.dbId;
        }
        return null;
    },
    getLoginUrl(state) {
        return oauth2.getAuthorizationUrl({ 
            scope : 'api refresh_token',
            state: state
        });
    },
    loginCallback(req, res) {
        return new Promise(function (resolve, reject) {
            var conn = new jsforce.Connection({ oauth2 : oauth2 });
            var code = req.param('code');
            var path = req.param('state');
            if (path !== null && path !== undefined) {
                path = decodeURIComponent(path);
            }
            conn.authorize(code)
            .then(function(userInfo) {
                conn.identity(function (err, idResponse) {
                    if (err) { throw err; }
                    console.log("User Name: " + idResponse.display_name);
                    console.log("User Email: " + idResponse.email);
                    userDomain.createOrGetUserRecord(idResponse.username, idResponse.email)
                    .then((userRecord) => {
                        console.log("User's database ID: " + userRecord.id);
                        req.session.authInfo = { 
                            accessToken: conn.accessToken,
                            refreshToken: conn.refreshToken,
                            instanceUrl: conn.instanceUrl,
                            userId: userInfo.id,
                            organizationId: userInfo.organizationId
                        };
                        req.session.userInfo = {
                            dbId: userRecord.id,
                            username: idResponse.username,
                            userDisplayName: idResponse.display_name,
                            userEmail: idResponse.email,
                            points: userRecord.points
                        }
                        return userDomain.getPercentileValueForPoints(userRecord.points);
                    })
                    .then((percentileRank) => {
                        let userInfo = req.session.userInfo;
                        userInfo.rank = percentileRank;
                        req.session.userInfo = userInfo;
                        resolve(path);
                    });
                });
            })
            .catch(function (err) {
                reject(err);
            })
        });
    },
    async updateUserPointsInSession(req, points) {
        let userInfo = req.session.userInfo;
        let percentileRank = await userDomain.getPercentileValueForPoints(points);
        userInfo.rank = percentileRank;
        userInfo.points = points;
        req.session.userInfo = userInfo;
    },
    logout(req) {
        console.log('Destroying session with Session ID: ' + req.sessionID);
        req.session.destroy();
    }
}

module.exports = auth;