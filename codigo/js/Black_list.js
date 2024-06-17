// Função para verificar se há dados no localStorage 
function verificarDadosLocalStorage() {
    if (!localStorage.getItem('postagens')) {
        fetch('dados.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('postagens', JSON.stringify(data));
                adicionarLinhasTabela(); // Atualizar a tabela após carregar dados
            })
            .catch(error => console.error('Erro ao carregar dados:', error));
    } else {
        adicionarLinhasTabela(); // Atualizar a tabela se já houver dados
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
        novaLinha.innerHTML = `<td>${new Date(postagem.dataPost).toLocaleDateString()}</td><td><a href="${postagem.link}" target="_blank">${postagem.link}</a></td><td>${postagem.descricao}</td>`;
    });
}


window.onload = function() {
    verificarDadosLocalStorage();
};
//Codigo que faz a busca na barra de busca
function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("blacklistTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}

