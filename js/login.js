const usuarios = {
    "César Jayo": "cjayo!",
    "Angie Santos": "santosA#"
};

function login() {
    const user = document.getElementById("usuario").value.trim();
    const pass = document.getElementById("password").value.trim();
    const error = document.getElementById("error");


    if (usuarios[user] && usuarios[user] === pass) {
        localStorage.setItem("usuarioLogeado", user);
        window.location.href = "index.html";
    } else {
        error.textContent = "Usuario o contraseña incorrectos";
    }
}