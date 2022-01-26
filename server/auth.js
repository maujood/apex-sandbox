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
    getConnection() {

    },
    getUserInfo(req) {
        let authInfo = req.session.authInfo;
        let info = {
            loggedIn: false,
            username: null
        };

        if (authInfo != null) {
            info.loggedIn = true;
            info.userId = authInfo.userId;
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

            res.redirect('http://localhost:3000');
        })
        .catch(function (err) {
            res.json({message: 'Error!', error: err});
        });
    },
    logout(req) {
        req.session.destroy();
    }
}

module.exports = auth;