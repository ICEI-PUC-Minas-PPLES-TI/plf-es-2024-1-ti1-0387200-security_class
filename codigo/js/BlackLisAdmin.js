// Função para excluir a linha selecionada
function excluirLinha() {
    const tabela = document.getElementById('blacklistTable').getElementsByTagName('tbody')[0];
    const linhas = tabela.getElementsByTagName('tr');

    // Verifica se alguma linha está selecionada
    let linhaSelecionada = null;
    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].classList.contains('selecionada')) {
            linhaSelecionada = linhas[i];
            break;
        }
    }

    // Se nenhuma linha estiver selecionada
    if (!linhaSelecionada) {
        alert('Nenhuma linha selecionada.');
        return;
    }
    
    if (confirm('Tem certeza que deseja excluir esta linha?')) {
        linhaSelecionada.remove();
    }
}
