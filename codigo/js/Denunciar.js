// Função para cadastrar a denúncia
function cadastrarDenuncia() {
    var titulo = document.getElementById('titulo').value;
    var descricao = document.getElementById('descricao').value;
    var usuario = document.getElementById('usuario').value;

    var denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];

    var novoId = 1;
    if (denuncias.length > 0) {
        novoId = Math.max(...denuncias.map(denuncia => denuncia.id)) + 1;
    }

    var novaDenuncia = {
        id: novoId,
        titulo: titulo,
        descricao: descricao,
        denunciadoPor: usuario,
        status: "Em análise"
    };

    denuncias.push(novaDenuncia);
    localStorage.setItem('denuncias', JSON.stringify(denuncias));
    alert('Denúncia cadastrada com sucesso!');
    console.log('Denúncia cadastrada com sucesso!');
    document.getElementById('denunciaForm').reset();
    window.location.href = 'formulario.html';
}

//FUNÇÃO EXCLUIR DENUNCIA

// Preencher o select
function preencherSelectorDenuncias() {
    var denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
    var select = document.getElementById('denunciaSelector');

    select.innerHTML = '';

    var option = document.createElement('option');
    option.value = '';
    option.textContent = 'Selecione uma denúncia';
    select.appendChild(option);

    denuncias.forEach(function(denuncia) {
        var option = document.createElement('option');
        option.value = denuncia.id;
        option.textContent = 'ID: ' + denuncia.id + ' - ' + denuncia.titulo;
        select.appendChild(option);
    });
}

// Função para excluir a denúncia selecionada
function excluirDenuncia() {
    var select = document.getElementById('denunciaSelector');
    var idSelecionado = select.value;

    if (idSelecionado) {
        var confirmacao = confirm('Tem certeza que deseja excluir esta denúncia?');

        if (confirmacao) {
            var denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];

            var denunciasRestantes = denuncias.filter(function(denuncia) {
                return denuncia.id !== parseInt(idSelecionado);
            });

            localStorage.setItem('denuncias', JSON.stringify(denunciasRestantes));

            preencherSelectorDenuncias();

            alert('Denúncia excluída com sucesso!');

            closeModal();
        }
    } else {
        alert('Selecione uma denúncia para excluir.');
    }
}

// Função para abrir o modal Excluir
function abrirModalExcluir() {
    preencherSelectorDenuncias(); // Preencher o seletor de denúncias ao abrir o modal
    document.getElementById('modalExcluir').style.display = 'block';
}

// Função para fechar o modal Excluir
function fecharModalExcluir() {
    document.getElementById('modalExcluir').style.display = 'none';
}
document.getElementById('denunciaSelector').addEventListener('change', excluirDenuncia);
