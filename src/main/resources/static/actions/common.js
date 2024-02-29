var isLogin = false;
var currentPage = "";

function ajaxLoader(option, callback) {
    let contentType = "", dataType = "";
    if (option.contentType == null || typeof option.contentType == "undefined") {
        option.contentType = "";
    }else{
//        option.contentType = "application/json";
         contentType = option.contentType;
    }

    if (option.dataType == null || typeof option.dataType == "undefined") {
        option.dataType = "";
    }else{
//        option.dataType = "json";
        dataType = option.dataType;
    }

    $.ajax({
        type: option.method,
        url: option.url,
        data: option.params,
        contentType: contentType,
        dataType: dataType,
        cache: false,
        timeout: 600000,
        headers: { "Authorization": ""},
        success: function (data) {
          callback(data);
        },
        error: function (e) {
          callback(e);
        },
    });
}

function getURL() {
    return "http://" + window.location.hostname + ":8080";
}

function showNavBar() {
    ajaxLoader({
        method: "GET",
        url: "http://localhost:8080/pages/navbar.html",
    }, function(resp){
        let navbar = document.getElementById("navbarComponent");
        navbar.innerHTML = resp;

        changeStatusLoginButton();
    });
}

function changePage(page, title, func){
    document.title = title;
//    if(!isLogin){
//        page = 'login.html';
//    }
//    currentPage = page;
    var initFunc = window[func]; //prepare a parameter as function

    ajaxLoader({
        method: "GET",
        url: getURL() + "/pages/" + page,
    }, function(resp){
        let content = document.getElementById("content");
        content.innerHTML = resp;

       if (typeof initFunc === "function") {
            initFunc(); //call a parameter as function
       }
    });
}

function changeStatusLoginButton(){
    if(currentPage == 'login.html' && isLogin != true){
        document.getElementById("btnLogin").style.display = "none";
    }
}