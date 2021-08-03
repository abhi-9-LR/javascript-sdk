# LoginRadius 

![Home Image](https://docs.lrcontent.com/resources/github/banner-1544x500.png)

JS SDK
=====

Customer Identity public repo for the LoginRadius JS SDK, based on LoginRadius V2 APIs.

>Disclaimer<br>
<br>
This library is meant to help you with a quick implementation of the LoginRadius platform and also to serve as a reference point for the LoginRadius API. Keep in mind that it is an open source library, which means you are free to download and customize the library functions based on your specific application needs.

## Installation
In order to utilize the LoginRadius JS SDK, you will need to initialize the SDK with the following configurations:

```
import initializeSDKClient from './loginRadiusJsSdk.js'

    LoginRadiusSDK = new initializeSDKClient({
      appName: {{Required | YOUR App Name}},
      apiKey: {{Required | YOUR API KEY}},
      customDomain: {{Optional | custom domain name, default is hub.loginradius.com}}
      apiDomain: {{Optional | Api endpoint , default is https://api.loginradius.com}}
      debugMode: {{Optional| true/false}}

    });
```