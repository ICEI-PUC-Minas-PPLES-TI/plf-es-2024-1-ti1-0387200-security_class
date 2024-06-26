// Função para verificar se há dados no localStorage 
async function verificarDadosLocalStorage() {
    if (!localStorage.getItem('postagens')) {
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

    // Adicionar cada postagem à tabela
    postagens.forEach(postagem => {
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${new Date(postagem.dataPost).toLocaleDateString()}</td>
            <td><a href="${postagem.link}" target="_blank">${postagem.link}</a></td>
            <td>${postagem.descricao}</td>
            <td><button class="btn btn-danger" onclick="excluirLinha(${postagem.id})">Excluir</button></td>
        `;
    });
}

// Função para excluir uma linha e remover do localStorage
async function excluirLinha(id) {
    let postagens = JSON.parse(localStorage.getItem('postagens')) || [];

    // Enviar requisição DELETE ao JSON Server
    try {
        const response = await fetch(`http://localhost:3000/blacklist/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir postagem');
        }

        // Remover do localStorage
        postagens = postagens.filter(postagem => postagem.id != id);
        localStorage.setItem('postagens', JSON.stringify(postagens));

        // Atualizar a tabela
        adicionarLinhasTabela();
    } catch (error) {
        console.error('Erro ao excluir postagem:', error);
    }
}

window.onload = function() {
    verificarDadosLocalStorage();
}

// Método que faz a busca na barra de busca
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
