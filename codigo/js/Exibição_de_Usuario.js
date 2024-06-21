function fechar() {
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
    // Verificar se há um admin na sessão
    const adminSession = sessionStorage.getItem("admin");
    const admin = JSON.parse(adminSession);

    if (admin) {
        console.log("ID do admin:", admin.id);
        console.log("Email do admin:", admin.email);
    } else {
        window.location.href = "../Login_Admin/index.html";
    }
});

// Função para carregar os dados dos usuários do JSON Server
async function carregarDados() {
    try {
        const response = await fetch('http://localhost:3000/usuarios');
        if (!response.ok) {
            throw new Error('Erro ao carregar os dados dos usuários');
        }
        const usuarios = await response.json();
        console.log('Conteúdo do JSON Server:', usuarios);
        atualizarTabela(usuarios);
    } catch (error) {
        console.error('Erro ao carregar dados:', error.message);
    }
}

// Função para atualizar a tabela com os dados dos usuários
function atualizarTabela(usuarios) {
    var tableBody = $('#dataTable tbody');
    tableBody.empty();

    usuarios.forEach(usuario => {
        var newRow = '<tr>' +
            '<td>' + usuario.id + '</td>' +
            '<td>' + usuario.nome + '</td>' +
            '<td>' + usuario.sobrenome + '</td>' +
            '<td>' + usuario.nickname + '</td>' +
            '<td>' + usuario.celular + '</td>' +
            '<td>' + usuario.idade + '</td>' +
            '<td>' + usuario.sexo + '</td>' +
            '<td>' + usuario.email + '</td>' +
            '<td>' + usuario.senha + '</td>' +
            '<td>' +
            '<button class="btn btn-primary btn-sm editar mt-1" data-id="' + usuario.id + '">Editar</button>' +
            '<button class="btn btn-danger btn-sm excluir mt-1" data-id="' + usuario.id + '">Excluir</button>' +
            '</td>' +
            '</tr>';

        tableBody.append(newRow);
    });
}

// Função para abrir o modal de edição com os dados do usuário selecionado
async function abrirModalEdicao(id) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`);
        if (!response.ok) {
            throw new Error('Erro ao carregar usuário para edição');
        }
        const usuarioParaEditar = await response.json();

        $('#campoID').val(usuarioParaEditar.id);
        $('#campoNome').val(usuarioParaEditar.nome);
        $('#campoSobrenome').val(usuarioParaEditar.sobrenome);
        $('#campoNickname').val(usuarioParaEditar.nickname);
        $('#campoCelular').val(usuarioParaEditar.celular);
        $('#campoIdade').val(usuarioParaEditar.idade);
        $('#campoSexo').val(usuarioParaEditar.sexo);
        $('#campoEmail').val(usuarioParaEditar.email);
        $('#campoSenha').val(usuarioParaEditar.senha);

        var modal = new bootstrap.Modal(document.getElementById('modalEdicao'));
        modal.show();
    } catch (error) {
        console.error('Erro ao abrir modal de edição:', error.message);
    }
}

// Função para atualizar os dados do usuário no JSON Server
async function atualizarUsuario(usuarioAtualizado) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${usuarioAtualizado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioAtualizado),
        });
        if (!response.ok) {
            throw new Error('Erro ao atualizar usuário');
        }
        console.log('Usuário atualizado com sucesso!');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
    }
}

// Função para excluir um usuário do JSON Server
async function excluirUsuario(id) {
    try {
        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao excluir usuário');
        }
        console.log('Usuário excluído com sucesso!');
        window.location.reload();
    } catch (error) {
        console.error('Erro ao excluir usuário:', error.message);
    }
}

document.getElementById('formEdicao').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const id = document.getElementById('campoID').value.trim();
    const nome = document.getElementById('campoNome').value;
    const sobrenome = document.getElementById('campoSobrenome').value;
    const nickname = document.getElementById('campoNickname').value;
    const celular = document.getElementById('campoCelular').value;
    const idade = parseInt(document.getElementById('campoIdade').value);
    const sexo = document.getElementById('campoSexo').value;
    const email = document.getElementById('campoEmail').value;
    const senha = document.getElementById('campoSenha').value;
    
    const usuarioAtualizado = {
        id: id,
        nome: nome,
        sobrenome: sobrenome,
        nickname: nickname,
        celular: celular,
        idade: idade,
        sexo: sexo,
        email: email,
        senha: senha
    };

    // Atualizar o usuário no JSON Server
    atualizarUsuario(usuarioAtualizado);
});

// Chamar a função para carregar os dados quando o DOM estiver pronto
$(document).ready(function() {
    carregarDados();
    
    // Evento de clique no botão de editar
    $(document).on('click', '.editar', function() {
        var id = $(this).data('id');
        abrirModalEdicao(id);
    });
    
    // Evento de clique no botão de excluir
    $(document).on('click', '.excluir', function() {
        var id = $(this).data('id');
        excluirUsuario(id);
    });
});
