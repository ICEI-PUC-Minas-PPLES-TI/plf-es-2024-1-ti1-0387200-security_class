// Variáveis globais

const adminSession = sessionStorage.getItem("admin");
const admin = JSON.parse(adminSession);

// Funções

function carregarDados() {
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON'));

    if (!cursosJSON) {
        fetch('../Data/Cadastro_de_Curso.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('cursosJSON', JSON.stringify(data.courses));
                cursosJSON = data.courses;
                atualizarTabela(cursosJSON);
            })
            .catch(error => console.error('Erro ao carregar cursos:', error));
    } else {
        atualizarTabela(cursosJSON);
    }
}

function atualizarTabela(cursosJSON) {
    var tableBody = $('#dataTable tbody');
    tableBody.empty();

    $.each(cursosJSON, function(index, item) {
        var newRow = '<tr>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.titulo + '</td>' +
            '<td>' + item.plataforma + '</td>' +
            '<td>' + item.descricao + '</td>' +
            '<td>' + item.preco + '</td>' +
            '<td>' + item.recomendacao + '</td>' +
            '<td>' + item.link + '</td>' +
            '<td>' + (item.secoes ? item.secoes.length : 0) + '</td>' + // Número de Seções
            '<td>' + item.aulas + '</td>' +
            '<td>' + item.conclusao + '</td>' +
            '<td>' + item.professor + '</td>' +
            '<td>' +
            '<button class="btn btn-primary btn-sm editar mt-1" data-id="' + item.id + '">Editar</button>' +
            '<button class="btn btn-danger btn-sm excluir mt-1" data-id="' + item.id + '">Excluir</button>' +
            '</td>' +
            '</tr>';

        tableBody.append(newRow);
    });

    // Adiciona listeners para os botões de editar e excluir
    $(document).on('click', '.editar', function() {
        var id = $(this).data('id');
        abrirModalEdicao(id);
    });

    $(document).on('click', '.excluir', function() {
        var id = $(this).data('id');
        excluirCurso(id);
    });
}

function abrirModalEdicao(id) {
    console.log('ID do curso para editar:', id); // Adicione este console.log para verificar o ID
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON'));
    let cursoParaEditar = cursosJSON.find(curso => curso.id === id);

    $('#campoID').val(cursoParaEditar.id);
    $('#campoTitulo').val(cursoParaEditar.titulo);
    $('#campoPlataforma').val(cursoParaEditar.plataforma);
    $('#campoDescricao').val(cursoParaEditar.descricao);
    $('#campoPreco').val(cursoParaEditar.preco);
    $('#campoRecomendacao').val(cursoParaEditar.recomendacao);
    $('#campoLink').val(cursoParaEditar.link);
    $('#campoSecoes').val(cursoParaEditar.secoes.length);
    $('#campoAulas').val(cursoParaEditar.aulas);
    $('#campoConclusao').val(cursoParaEditar.conclusao);
    $('#campoProfessor').val(cursoParaEditar.professor);

    // Remove as seções antigas antes de adicionar as novas seções dinamicamente
    $('.secao-edicao').remove();

    // Adaptação para carregar as seções do curso no modal de edição
    if (cursoParaEditar.secoes) {
        cursoParaEditar.secoes.forEach((secao, index) => {
            const numeracaoId = `numeracaoEdicao${index + 1}`;
            const descricaoId = `descricaoEdicao${index + 1}`;
            const secaoHtml = `
                <div class="form-group secao-edicao">
                    <label for="${numeracaoId}" class="col-form-label">Numeração Seção ${index + 1}:</label>
                    <input type="text" class="form-control" id="${numeracaoId}" value="${secao.numeracao}">
                    <label for="${descricaoId}" class="col-form-label">Descrição Seção ${index + 1}:</label>
                    <textarea class="form-control" id="${descricaoId}">${secao.descricao}</textarea>
                </div>
            `;
            $('#formEdicao').append(secaoHtml);
        });
    }

    var modal = new bootstrap.Modal(document.getElementById('modalEdicao'));
    modal.show();
}

function excluirCurso(id) {
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON'));

    cursosJSON = cursosJSON.filter(function(curso) {
        return curso.id !== id;
    });

    localStorage.setItem('cursosJSON', JSON.stringify(cursosJSON));

    console.log('Curso excluído com sucesso!');
    console.log('JSON atualizado:', cursosJSON); // Mostra o JSON atualizado no console

    // Recarrega a tabela após a exclusão
    atualizarTabela(cursosJSON);
    recarregarPagina();
}

function recarregarPagina() {
    window.location.reload();
}

// Eventos

document.addEventListener("DOMContentLoaded", function () {
    // Recupera a sessão do usuário
    const adminSession = sessionStorage.getItem("admin");
    const admin = JSON.parse(adminSession);

    if (admin) {
        // Exemplo de uso da sessão
        console.log("ID do admin:", admin.id);
        console.log("Email do admin:", admin.email);
    } else {
        // Redireciona se não houver sessão válida
        window.location.href = "../Login_Admin/index.html";
    }

    // Carrega os dados do JSON e atualiza a tabela HTML
    carregarDados();
});

// Event listener para o envio do formulário de edição
document.getElementById('formEdicao').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    const id = parseInt(document.getElementById('campoID').value); 
    const titulo = document.getElementById('campoTitulo').value;
    const plataforma = document.getElementById('campoPlataforma').value;
    const descricao = document.getElementById('campoDescricao').value;
    const preco = document.getElementById('campoPreco').value;
    const recomendacao = document.getElementById('campoRecomendacao').value;
    const link = document.getElementById('campoLink').value;
    const aulas = document.getElementById('campoAulas').value;
    const conclusao = document.getElementById('campoConclusao').value;
    const professor = document.getElementById('campoProfessor').value;

    // Atualiza as informações do curso no localStorage
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON'));
    let cursoIndex = cursosJSON.findIndex(curso => curso.id === id);
    cursosJSON[cursoIndex].titulo = titulo;
    cursosJSON[cursoIndex].plataforma = plataforma;
    cursosJSON[cursoIndex].descricao = descricao;
    cursosJSON[cursoIndex].preco = preco;
    cursosJSON[cursoIndex].recomendacao = recomendacao;
    cursosJSON[cursoIndex].link = link;
    cursosJSON[cursoIndex].aulas = aulas;
    cursosJSON[cursoIndex].conclusao = conclusao;
    cursosJSON[cursoIndex].professor = professor;

    // Atualiza as seções do curso
    const secoesEditadas = [];
    const numeracoes = document.querySelectorAll('.form-control[id^="numeracaoEdicao"]');
    const descricoes = document.querySelectorAll('.form-control[id^="descricaoEdicao"]');
    numeracoes.forEach((numeracao, index) => {
        secoesEditadas.push({ numeracao: numeracao.value, descricao: descricoes[index].value });
    });
    cursosJSON[cursoIndex].secoes = secoesEditadas;

    localStorage.setItem('cursosJSON', JSON.stringify(cursosJSON));

    console.log('Curso editado com sucesso!');
    console.log('JSON atualizado:', cursosJSON); // Mostra o JSON atualizado no console

    // Recarrega a tabela após a edição
    atualizarTabela(cursosJSON);
    var modal = bootstrap.Modal.getInstance(document.getElementById('modalEdicao'));
    modal.hide();
    recarregarPagina();
});
