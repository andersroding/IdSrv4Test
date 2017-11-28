function log() {
    document.getElementById('results').innerText = '';

    Array.prototype.forEach.call(arguments, function (msg) {
        if (msg instanceof Error) {
            msg = "Error: " + msg.message;
        }
        else if (typeof msg !== 'string') {
            msg = JSON.stringify(msg, null, 2);
        }
        document.getElementById('results').innerHTML += msg + '\r\n';
    });
}

document.getElementById("login").addEventListener("click", login, false);
document.getElementById("api").addEventListener("click", api, false);
document.getElementById("api2").addEventListener("click", api2, false);
document.getElementById("api3").addEventListener("click", api3, false);
document.getElementById("logout").addEventListener("click", logout, false);

var config = {
    //authority: "https://localhost:5000/core",
    authority: "https://vgids4.anders.test/identityserver",
    client_id: "jsidsrv4test",
    redirect_uri: "https://vgids4.anders.test/web/callback.html",
    response_type: "id_token token",
    //scope:"openid profile api1 write",
    scope: "openid profile",
    post_logout_redirect_uri : "https://vgids4.anders.test/web/index.html"
};
var mgr = new Oidc.UserManager(config);

mgr.getUser().then(function (user) {
    if (user) {
        log("User logged in", user.profile);
    }
    else {
        log("User not logged in");
    }
});


function login() {
    mgr.signinRedirect();
}

function api() {
    mgr.getUser().then(function (user) {
        debugger;
        var url = "https://vgids4.anders.test/api/identity";
        //var url = "http://localhost:12343/identity";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            debugger;
            log(xhr.status, JSON.parse(xhr.responseText));
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}

function api2() {
    mgr.getUser().then(function (user) {

        var url = "https://vgids4.anders.test/api2/identity";
        //var url = "http://localhost:12343/identity";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.status >= 400) {
                debugger;
            } else {

                log(xhr.status, JSON.parse(xhr.responseText));
            }
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}

function api3() {
    mgr.getUser().then(function (user) {
        var url = "https://vgids4.anders.test/api3/identity";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.status >= 400) {
                debugger;
            } else {

                log(xhr.status, JSON.parse(xhr.responseText));
            }
        }
        xhr.setRequestHeader("Authorization", "Bearer " + user.access_token);
        xhr.send();
    });
}


//function useToken() {
//    clear();

//    var xhr = new XMLHttpRequest();
//    xhr.onload = function (e) {
//        if (xhr.status >= 400) {
//            show({
//                status: xhr.status,
//                statusText: xhr.statusText,
//                wwwAuthenticate: xhr.getResponseHeader("WWW-Authenticate")
//            });
//        }
//        else {
//            show(JSON.parse(xhr.response));
//        }
//    };
//    xhr.onerror = function (e) {
//        console.log(e, xhr);
//        show({ error: "unknown http error" });
//    };
//    xhr.open("GET", "http://localhost:2727/identity", true);
//    xhr.setRequestHeader("Authorization", "Bearer " + token);
//    xhr.send();
//}



function logout() {
    mgr.signoutRedirect();
}
