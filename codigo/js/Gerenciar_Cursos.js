// Variáveis globais

const adminSession = sessionStorage.getItem("admin");
const admin = JSON.parse(adminSession);

// Funções

async function carregarDados() {
    try {
        const response = await fetch('http://localhost:3000/courses');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados dos cursos');
        }
        const cursosJSON = await response.json();
        atualizarTabela(cursosJSON);
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
}

function atualizarTabela(cursosJSON) {
    var tableBody = $('#dataTable tbody');
    tableBody.empty();

    cursosJSON.forEach(curso => {
        var newRow = '<tr>' +
            '<td>' + curso.id + '</td>' +
            '<td>' + curso.titulo + '</td>' +
            '<td>' + curso.plataforma + '</td>' +
            '<td>' + curso.descricao + '</td>' +
            '<td>' + curso.preco + '</td>' +
            '<td>' + curso.recomendacao + '</td>' +
            '<td>' + curso.link + '</td>' +
            '<td>' + (curso.secoes ? curso.secoes.length : 0) + '</td>' +
            '<td>' + curso.aulas + '</td>' +
            '<td>' + curso.conclusao + '</td>' +
            '<td>' + curso.professor + '</td>' +
            '<td>' +
            '<button class="btn btn-primary btn-sm editar mt-1" data-id="' + curso.id + '">Editar</button>' +
            '<button class="btn btn-danger btn-sm excluir mt-1" data-id="' + curso.id + '">Excluir</button>' +
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

async function abrirModalEdicao(id) {
    try {
        const response = await fetch(`http://localhost:3000/courses/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar curso para edição');
        }
        const cursoParaEditar = await response.json();

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

        var modal = new bootstrap.Modal(document.getElementById('modalEdicao'));
        modal.show();
    } catch (error) {
        console.error('Erro ao abrir modal de edição:', error);
    }
}

async function excluirCurso(id) {
    try {
        const response = await fetch(`http://localhost:3000/courses/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir curso');
        }
        console.log('Curso excluído com sucesso!');
        carregarDados(); // Recarrega os dados após a exclusão
    } catch (error) {
        console.error('Erro ao excluir curso:', error);
    }
}

// Eventos

document.addEventListener("DOMContentLoaded", function () {
    // Carrega os dados do JSON Server e atualiza a tabela HTML
    carregarDados();
});

// Event listener para o envio do formulário de edição
document.getElementById('formEdicao').addEventListener('submit', async function(event) {
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

    // Atualiza as informações do curso no JSON Server
    try {
        const response = await fetch(`http://localhost:3000/courses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                titulo,
                plataforma,
                descricao,
                preco,
                recomendacao,
                link,
                aulas,
                conclusao,
                professor,
            }),
        });
        if (!response.ok) {
            throw new Error('Erro ao editar curso');
        }
        console.log('Curso editado com sucesso!');
        carregarDados(); // Recarrega os dados após a edição
        var modal = bootstrap.Modal.getInstance(document.getElementById('modalEdicao'));
        modal.hide();
    } catch (error) {
        console.error('Erro ao editar curso:', error);
    }
});
