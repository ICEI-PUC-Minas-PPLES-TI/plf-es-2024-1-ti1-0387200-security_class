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
    document.querySelector('form').reset(); // Corrigido para selecionar o formulário correto
    window.location.href = 'Denunciar.html';
}

// Função para preencher o seletor de denúncias
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

            localStorage.removeItem(idSelecionado);

            localStorage.setItem('denuncias', JSON.stringify(denunciasRestantes));

            preencherSelectorDenuncias();

            alert('Denúncia excluída com sucesso!');

            fecharModalExcluir();
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

// Função para abrir o modal Editar
function abrirModalEditar() {
    const selectDenuncia = document.getElementById('selectDenuncia');
    selectDenuncia.innerHTML = '<option value="">Selecione</option>';

    const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];

    denuncias.forEach(function(denuncia) {
        const option = document.createElement('option');
        option.value = denuncia.id;
        option.textContent = denuncia.titulo;
        selectDenuncia.appendChild(option);
    });

    document.getElementById('modalEditar').style.display = 'block';
}

// Função para preencher o formulário de edição
function preencherFormularioEdicao() {
    const selectDenuncia = document.getElementById('selectDenuncia');
    const selectedId = selectDenuncia.value;

    if (selectedId) {
        const denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];
        const item = denuncias.find(denuncia => denuncia.id == selectedId);

        if (item) {
            document.getElementById('editId').value = item.id;
            document.getElementById('editTitulo').value = item.titulo;
            document.getElementById('editDescricao').value = item.descricao;
            document.getElementById('editDenunciadoPor').value = item.denunciadoPor;
            document.getElementById('editStatus').value = item.status;
        }
    } else {
        document.getElementById('formEditar').reset();
    }
}

// Função para salvar a edição
function salvarEdicao() {
    const id = document.getElementById('editId').value;
    const titulo = document.getElementById('editTitulo').value;
    const descricao = document.getElementById('editDescricao').value;
    const denunciadoPor = document.getElementById('editDenunciadoPor').value;
    const status = document.getElementById('editStatus').value;

    let denuncias = JSON.parse(localStorage.getItem('denuncias')) || [];

    denuncias = denuncias.map(denuncia => {
        if (denuncia.id == id) {
            return {
                id: id,
                titulo: titulo,
                descricao: descricao,
                denunciadoPor: denunciadoPor,
                status: status
            };
        }
        return denuncia;
    });

    localStorage.setItem('denuncias', JSON.stringify(denuncias));
    fecharModalEditar();
}

// Função para fechar o modal Editar
function fecharModalEditar() {
    document.getElementById('modalEditar').style.display = 'none';
    document.getElementById('formEditar').reset();
    document.getElementById('selectDenuncia').value = '';
}
