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
});
// Função para carregar os dados do JSON e atualizar a tabela HTML
function carregarDados() {
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON'));

    if (!cursosJSON) {
        $.getJSON('../data/Cadastro_de_Curso.json', function(data) {
            cursosJSON = data.courses;
            atualizarTabela(cursosJSON);
        });
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
            '<td>' + item.title + '</td>' +
            '<td>' + item.platform + '</td>' +
            '<td>' + item.description + '</td>' +
            '<td>' + item.price + '</td>' +
            '<td>' + item.recommendation + '</td>' +
            '<td>' + item.link + '</td>' +
            '<td>' +
            '<button class="btn btn-primary btn-sm editar mt-1" data-id="' + item.id + '">Editar</button>' +
            '<button class="btn btn-danger btn-sm excluir mt-1" data-id="' + item.id + '">Excluir</button>' +
            '</td>' +
            '</tr>';

        tableBody.append(newRow);
    });
}

$(document).ready(function() {
    carregarDados();
    console.log('Conteúdo do localStorage:', localStorage.getItem('cursosJSON'));
    $(document).on('click', '.editar', function() {
        var id = $(this).data('id');
        abrirModalEdicao(id);
    });
    $(document).on('click', '.excluir', function() {
        var id = $(this).data('id');
        excluirCurso(id);
    });

});

function abrirModalEdicao(id) {
    console.log('ID do curso para editar:', id); // Adicione este console.log para verificar o ID
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON'));
    let cursoParaEditar = cursosJSON.find(curso => curso.id === id);

    $('#campoID').val(cursoParaEditar.id);
    console.log("ola",cursoParaEditar.id);
    $('#campoTitulo').val(cursoParaEditar.title);
    $('#campoPlataforma').val(cursoParaEditar.platform);
    $('#campoDescricao').val(cursoParaEditar.description);
    $('#campoPreco').val(cursoParaEditar.price);
    $('#campoRecomendacao').val(cursoParaEditar.recommendation);
    $('#campoLink').val(cursoParaEditar.link);

    var modal = new bootstrap.Modal(document.getElementById('modalEdicao'));
    modal.show();
}

document.getElementById('formEdicao').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    const id = parseInt(document.getElementById('campoID').value); 
    console.log(id);
    const titulo = document.getElementById('campoTitulo').value;
    const plataforma = document.getElementById('campoPlataforma').value;
    const descricao = document.getElementById('campoDescricao').value;
    const preco = document.getElementById('campoPreco').value;
    const recomendacao = document.getElementById('campoRecomendacao').value;
    const link = document.getElementById('campoLink').value;
    excluirCurso(id);
    const novoCurso = {
        id: id,
        title: titulo,
        platform: plataforma,
        description: descricao,
        recommendation: recomendacao,
        price: preco,
        link: link
    };
    adicionarCurso(novoCurso);
    window.location.reload();
});

function adicionarCurso(curso) {
    let cursos = JSON.parse(localStorage.getItem('cursosJSON'));
    cursos.push(curso);
    localStorage.setItem('cursosJSON', JSON.stringify(cursos));
    
    console.log('Novo curso adicionado com sucesso!');
    console.log('JSON atualizado:', cursos); // Mostra o JSON atualizado no console

    // Aqui você pode exibir uma mensagem de sucesso ao usuário
}
//
function excluirCurso(id) {
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON'));

    cursosJSON = cursosJSON.filter(function(curso) {
        return curso.id !== id;
    });

    localStorage.setItem('cursosJSON', JSON.stringify(cursosJSON));

    atualizarTabela(cursosJSON);

    console.log('Curso excluído com sucesso!');
}
//
