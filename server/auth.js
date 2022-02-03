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
            instanceUrl : authInfo.instanceUrl,
            accessToken : authInfo.accessToken
            //refreshToken : authInfo.refreshToken
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

        if (authInfo != null && userInfo != null) {
            info.loggedIn = true;
            info.username = authInfo.username;
            info.userDisplayName = userInfo.userDisplayName;
            info.instanceUrl = authInfo.instanceUrl;
        }

        return info;
    },
    getLoginUrl() {
        return oauth2.getAuthorizationUrl({ scope : 'api refresh_token' });
    },
    loginCallback(req, res) {
        var conn = new jsforce.Connection({ oauth2 : oauth2 });
        var code = req.param('code');
        conn.authorize(code)
        .then(function(userInfo) {
            // Now you can get the access token, refresh token, and instance URL information.
            // Save them to establish connection next time.
            console.log("Access token: " + conn.accessToken);
            console.log("Refresh token: " + conn.refreshToken);
            console.log("Instance URL: " + conn.instanceUrl);
            console.log("User ID: " + userInfo.id);
            console.log("Organization ID: " + userInfo.organizationId);
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
                res.redirect('http://localhost:3000');
            });
        })
        .then(function () {})
        .catch(function (err) {
            res.json({message: 'Error!', error: err});
        })
    },
    logout(req) {
        req.session.destroy();
    }
}

module.exports = auth;