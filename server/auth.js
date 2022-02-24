const jsforce = require('jsforce');

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
    isLoggedIn() {
        
    },
    getConnection(req) {
        let authInfo = req.session.authInfo;
        let conn = new jsforce.Connection({
            oauth2: oauth2,
            instanceUrl : authInfo.instanceUrl,
            accessToken : authInfo.accessToken,
            refreshToken : authInfo.refreshToken
        });
        conn.on("refresh", function(accessToken, res) {
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
            info.instanceUrl = authInfo.instanceUrl;
        }

        return info;
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
                // Now you can get the access token, refresh token, and instance URL information.
                // Save them to establish connection next time.
                req.session.authInfo = { 
                    accessToken: conn.accessToken,
                    refreshToken: conn.refreshToken,
                    instanceUrl: conn.instanceUrl,
                    userId: userInfo.id,
                    organizationId: userInfo.organizationId
                };
                conn.identity(function (err, idResponse) {
                    if (err) { throw err; }
                    console.log("User Name: " + idResponse.display_name);
                    req.session.userInfo = {
                        username: idResponse.username,
                        userDisplayName: idResponse.display_name
                    };
                    resolve(path);
                });
            })
            .catch(function (err) {
                reject(err);
            })
        });
    },
    logout(req) {
        req.session.destroy(req.sessionId);
    }
}

module.exports = auth;