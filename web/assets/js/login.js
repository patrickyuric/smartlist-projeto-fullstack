
function realizarLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email.trim() === "" || password.trim() === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (email === "patrick@gmail.com" && password === "123456") {
        window.location.href = "app/index.html"; // Redireciona para a página app.html
    }

    alert("Login realizado com sucesso!");
}
