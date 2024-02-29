function verifyLogin() {
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log("username : " + username + ", password : " + password);

     if(username == null){
        alert("Username cannot be null");
        return false;
     }

    if(password == null){
        alert("Password cannot be null");
        return false;
    }

    let params = {username: username, password: password};
    ajaxLoader({
        method: "POST",
        url: getURL() + "/login/verify",
        params: JSON.stringify(params),
        contentType: "application/json",
        dataType: "json"
    }, function(resp){
        if(resp.statusCode != 200){
            alert(resp.errors);
            return false;
        }

        isLogin = true;
        changePage('home.html');
        document.getElementById("btnLogin").style.display = "block";
    });
}

function logout(event){
    event.target.innerText = "Login";
    isLogin = false;
    changePage('login.html');
    document.getElementById("btnLogin").style.display = "none";
}