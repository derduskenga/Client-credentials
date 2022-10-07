require('dotenv').config();
const express = require('express');
const msal = require('@azure/msal-node');

const msalConfig = {
    auth: {
        clientId: process.env.APP_CLIENT_ID,
        authority: process.env.SUSI_POLICY_AUTHORITY,
        clientSecret: process.env.APP_CLIENT_SECRET,
        knownAuthorities: [process.env.AUTHORITY_DOMAIN]
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: msal.LogLevel.Verbose,
        }
    }
   };



// With client credentials flows permissions need to be granted in the portal by a tenant administrator. 
// The scope is always in the format '<resource>/.default'.
const tokenRequest = {
    //Use this scope to receive an access token you use to access resources protected by Azure AD B2C itself. 
    scopes: ['https://Contosob2c2233.onmicrosoft.com/client-credentials-api/.default']
    //Use this is you need a token to access graph; use Azure AD  endpoint.
    //scopes: ['https://graph.microsoft.com/.default']
};
//Create msal application object
const cca = new msal.ConfidentialClientApplication(msalConfig);

cca.acquireTokenByClientCredential(tokenRequest).then((authResponse)=>{
    console.log('accessToke: ' + authResponse.accessToken)

}).catch((error)=>{
    console.log("\nErrorAtLogin: \n" + error);
});

const app = express();

app.listen(process.env.SERVER_PORT,  () => {
    console.log(`Client credentials app listening accessToken = ` + process.env.SERVER_PORT);
});