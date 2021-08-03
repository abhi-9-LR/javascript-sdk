import initializeSDKClient from './loginRadiusJsSdk.js'



const fetchAuthConfig = () => fetch("options.js");

let LoginRadiusSDK;

const configureClient = async () => {
    const response = await fetchAuthConfig();
    const config = await response.json();

    LoginRadiusSDK = new initializeSDKClient({
      appName: config.appName,
      apiKey: config.apiKey
    });
    return LoginRadiusSDK;
};



function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

window.onload = async () => {
  
    await configureClient();
    
    await LoginRadiusSDK.appCallback();

    const query = window.location.search;

    if (query.includes("action_completed=")) {
        var action =  getUrlParameter("action_completed");
       
          if(action == 'forgotpassword'){

            document.getElementById("forgot_msg").style.display = "block";

 setTimeout( function () {document.getElementById("forgot_msg").style.display = "none"}, 2500);

        }else if(action == 'register'){

            document.getElementById("registration_msg").style.display = "block";
            setTimeout( function () {
                document.getElementById("registration_msg").style.display = "none"
            }, 2500);

        }
    } 

    const isAuthenticated = await LoginRadiusSDK.isLoggedIn();

    if (isAuthenticated) {

        console.log("> User is authenticated");
        window.history.replaceState({}, document.title, window.location.pathname);
        updateUI();
        return;
    } else {
        console.log("> User not authenticated");

    }



};

 window.login = async () => {
 
    await LoginRadiusSDK.openLoginPage({
        redirect_uri: window.location.href
    });

};




window.logout = async () => {

    LoginRadiusSDK.logout({
        returnTo: window.location.href
    });
};

window.register = async () => {

    LoginRadiusSDK.openRegisterPage({
        returnTo: window.location.href
    });
};

window.updateProfile = async () => {

    LoginRadiusSDK.profileUpdate();
};

window.forgotPassword = async () => {

    LoginRadiusSDK.forgotPassword({
        redirect_uri: window.location.href
    });
};


const updateUI = async () => {
    var LoginRadiusSDK = await configureClient();

    const isAuthenticated = await LoginRadiusSDK.isLoggedIn();

    document.getElementById("btn-logout").disabled = !isAuthenticated;
    document.getElementById("btn-login").disabled = isAuthenticated;

    // NEW - add logic to show/hide gated content after authentication
    if (isAuthenticated) {
        document.getElementById("login-elem").style.display = "none";
        document.getElementById("btn-logout").style.display = "block";
        document.getElementById("signup-elem").style.display = "block";
        document.getElementById("btn-login").style.display = "none";
        document.getElementById("btn-singnup").style.display = "none";
        document.getElementById("btn-updateProfile").style.display = "block";
        document.getElementById("btn-forgotPassword").style.display = "none";
        var profileSection = document.createTextNode('| Profile section');                 // Create a <li> node

        document.getElementById("header-text").append(profileSection);

        let token = await LoginRadiusSDK.getToken();
        document.getElementById("ipt-user-token").textContent = token;


        try {

            var userProfile = await LoginRadiusSDK.getUserProfile();

            var firstName = userProfile.FullName ? userProfile.FullName : userProfile.Email[0].Value;
            var node = document.createTextNode('Hello ' + firstName + ', ');                 // Create a <li> node

            document.getElementById("profile-text").prepend(node);

            document.getElementById("user-Profie-toggel").style.display = "block";


            document.getElementById("ipt-user-profile").textContent = JSON.stringify(userProfile,null,2);

        } catch (err) {

            console.log("fetch", err); // handle error here
        }

      



    }
};

