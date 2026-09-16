// Função direta e isolada
function fazerCadastro() {

    // Obter os valores dos campos
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const emailConfirm = document.getElementById("email_confirm").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password_confirm").value;

    // Validações
    if (nome.trim() === "" || email.trim() === "" || emailConfirm.trim() === "" || password.trim() === "" || passwordConfirm.trim() === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (email !== emailConfirm) {
        alert("Os e-mails não coincidem!");
        return;
    } else if (password !== passwordConfirm) {
        alert("As senhas não coincidem!");
        return;
    } else if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres!");
        return;
    } else if (nome.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres!");
        return;
    } else if (!email.includes("@") || !email.includes(".")) {
        alert("Por favor, insira um e-mail válido!");
        return;
    }

    // Se passou pelas validações, faz o Fetch
    const dadosUsuario = {
        nome: nome,
        email: email,
        password: password
    };

    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    })
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.erro) {
                alert(dados.erro);
            } else {
                // Redirecionamento!
                window.location.href = "index.html";

                // Alerta de sucesso
                alert("Cadastro realizado com sucesso e salvo no banco de dados!");

            }
        })
        .catch(erro => {
            console.error("Erro:", erro);
            alert("Erro ao conectar com o servidor.");
        });
}