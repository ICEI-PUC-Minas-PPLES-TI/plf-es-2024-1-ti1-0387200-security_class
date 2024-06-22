// Função para verificar se há dados no localStorage 
async function verificarDadosLocalStorage() {
    try {
        const response = await fetch('http://localhost:3000/blacklist');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados');
        }
        const data = await response.json();
        localStorage.setItem('postagens', JSON.stringify(data));
        adicionarLinhasTabela(); // Atualizar a tabela após carregar dados
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}

// Função para adicionar linhas à tabela
function adicionarLinhasTabela() {
    const postagens = JSON.parse(localStorage.getItem('postagens')) || [];
    const tabela = document.getElementById('blacklistTable').getElementsByTagName('tbody')[0];

    // Limpar a tabela
    tabela.innerHTML = '';

    // Adiciona cada postagem à tabela
    postagens.forEach(postagem => {
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `<td>${postagem.titulo}</td><td><a href="${postagem.link}" target="_blank">${postagem.link}</a></td><td>${postagem.data}</td>`;
    });
}

window.onload = function() {
    verificarDadosLocalStorage();
};

// Código que faz a busca na barra de busca
function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("blacklistTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        if (td.length > 0) {
            txtValue = td[1].textContent || td[1].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
function verificarLogin() {
    const user = sessionStorage.getItem("user");
    if (!user) {
        window.location.href = "../views/login.html";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    verificarLogin();
});
