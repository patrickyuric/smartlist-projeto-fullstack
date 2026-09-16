//ADICIONAR PRODUTO A LISTA DE COMPRAS

alert("Bem-vindo à Smart List! Adicione produtos à sua lista de compras.");

function adicionarItem() {
    const input = document.getElementById("itemInput");
    const lista = document.getElementById("listaCompras");

    if (input.value.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = input.value;
        lista.appendChild(li);
        input.value = ""; // Limpa o campo
        input.focus();
    } else {
        alert("Por favor, digite o nome de um produto!");
    }
}