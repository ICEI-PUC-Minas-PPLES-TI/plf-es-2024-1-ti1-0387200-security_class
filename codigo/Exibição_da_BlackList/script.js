// Função para verificar se há dados no localStorage 
function verificarDadosLocalStorage() {
    if (!localStorage.getItem('postagens')) {
        fetch('dados.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('postagens', JSON.stringify(data));
            })
            .catch(error => console.error('Erro ao carregar dados:', error));
    }
}


function adicionarPostagem(link, descricao, data) {
    let postagens = JSON.parse(localStorage.getItem('postagens')) 
    // Gerar um ID 
    const id = Date.now().toString();
    // Adiciona a nova postagem à lista
    postagens.push({ id, link, descricao, data });
    // Atualiza a lista de postagens no localStorage
    localStorage.setItem('postagens', JSON.stringify(postagens));
}


// Função para adicionar linhas à tabela
function adicionarLinhasTabela() {
    const postagens = JSON.parse(localStorage.getItem('postagens'));
    const tabela = document.getElementById('blacklistTable').getElementsByTagName('tbody')[0];

    // Limpar a tabela
    tabela.innerHTML = '';

    // Adiciona cada postagem à tabela
    postagens.forEach(postagem => {
        const novaLinha = tabela.insertRow();
        novaLinha.innerHTML = `<td>${postagem.data}</td><td>${postagem.link}</td><td>${postagem.descricao}</td>`;
    });
}


function popularTabelaComExemplos() {
    adicionarPostagem('iitau.com.br.login/MeuBanco', 'Este site do Itaú é falso, tomem cuidado!', '01/05/2024');
    adicionarPostagem('faceboook.com.ru', 'Eu fiz login neste site falso e tive minha conta invadida', '02/05/2024');
    adicionarPostagem('magazineluizza.com.br/PromocaoGratis', 'Site falso! comprei um telefone e veio um tijolo', '03/05/2024');
    adicionarLinhasTabela(); // Atualiza a tabela com os exemplos adicionados
}

popularTabelaComExemplos();
