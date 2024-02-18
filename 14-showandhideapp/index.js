let eyeicon = document.getElementById("eyeicon");
let password = document.getElementById("password");

eyeicon.onclick = () => {
    if(password.type == "password") {
        password.type = "text";
        eyeicon.src = "images/open.png"
    }else {
        password.type = "password"
        eyeicon.src = "images/close.png"
    }
}

