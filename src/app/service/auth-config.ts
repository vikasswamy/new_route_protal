import {LogLevel, Configuration, BrowserCacheLocation} from '@azure/msal-browser';
import {environment} from '../environments/environment';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/*B2C ABM*/
export const b2cPolicies = {
    names: {
        signIn: "B2C_1_cft-signin"
    },
    authorities: {
        signIn: {
            authority: environment.authority,
        }
    },
    authorityDomain: environment.authorityDomain
};

/*B2C ABM*/
export const customerMsalConfig: Configuration = {
    auth: {
        clientId: environment.clientId, //Client App ID
        authority: b2cPolicies.authorities.signIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: environment.redirectUri,
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE,
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

//ABM
export const abmMsalConfig: Configuration = {
    auth: {
        clientId: environment.clientId,
        authority: 'https://login.microsoftonline.com/' + environment.tenantId,
        redirectUri: environment.redirectUri,
        postLogoutRedirectUri: environment.postLogoutRedirectUri
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE,
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                //console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

export const protectedResources = {
    Smart_Routing: {
        endpoint: environment.smartRoutingBaseUrl,
        scopes: [environment.accessScope]
    }
}

export const loginRequest = {
    scopes: [''] // B2C
};
