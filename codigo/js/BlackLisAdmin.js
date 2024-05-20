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

    // Adicionar cada postagem à tabela
    postagens.forEach(postagem => {
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `
            <td>${new Date(postagem.dataPost).toLocaleDateString()}</td>
            <td><a href="${postagem.link}" target="_blank">${postagem.link}</a></td>
            <td>${postagem.descricao}</td>
            <td><button class="btn btn-danger" onclick="excluirLinha('${postagem.id}')">Excluir</button></td>
        `;
    });
}

// Função para excluir uma linha e remover do localStorage
function excluirLinha(id) {
    let postagens = JSON.parse(localStorage.getItem('postagens')) || [];

    postagens = postagens.filter(postagem => postagem.id != id);
    localStorage.setItem('postagens', JSON.stringify(postagens));

    // Atualizar a tabela
    adicionarLinhasTabela();
}


window.onload = function() {
    verificarDadosLocalStorage();
};
