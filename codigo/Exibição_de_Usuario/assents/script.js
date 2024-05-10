function carregarDados() {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));
    console.log(usuarios)
    if (!usuarios) {
        $.getJSON('../data/Cadastro_de_Usuario.json', function(data) {
            usuarios = data.usuarios;
            atualizarTabela(usuarios);
        });
    } else {
        atualizarTabela(usuarios);
    }
}

function atualizarTabela(usuarios) {
    var tableBody = $('#dataTable tbody');
    tableBody.empty();

    $.each(usuarios, function(index, usuario) {
        var newRow = '<tr>' +
            '<td>' + usuario.id + '</td>' +
            '<td>' + usuario.nome + '</td>' +
            '<td>' + usuario.sobrenome + '</td>' +
            '<td>' + usuario.nickname + '</td>' +
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

function abrirModalEdicao(id) {
    console.log('ID do usuário para editar:', id); // Adicione este console.log para verificar o ID
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));
    let usuarioParaEditar = usuarios.find(usuario => usuario.id === id);

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
}

function atualizarUsuario(usuarioAtualizado) {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));

    // Encontrar o índice do usuário no array
    const index = usuarios.findIndex(usuario => usuario.id === usuarioAtualizado.id);

    // Verificar se o usuário foi encontrado
    if (index !== -1) {
        // Atualizar os dados do usuário
        usuarios[index] = usuarioAtualizado;
        localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));
        console.log('Usuário atualizado com sucesso!');
    } else {
        // Adicionar o usuário se não for encontrado
        usuarios.push(usuarioAtualizado);
        localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));
        console.log('Novo usuário adicionado com sucesso!');
    }
}

function adicionarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));
    usuarios.push(usuario);
    localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));
    
    console.log('Novo usuário adicionado com sucesso!');
    console.log('JSON atualizado:', usuarios); // Mostra o JSON atualizado no console

    // Aqui você pode exibir uma mensagem de sucesso ao usuário
}

function excluirUsuario(id) {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));

    usuarios = usuarios.filter(function(usuario) {
        return usuario.id !== id;
    });

    localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));

    // Atualizar a tabela ou fazer outras ações necessárias após excluir o usuário
    console.log('Usuário excluído com sucesso!');
}

document.getElementById('formEdicao').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    const id = parseInt(document.getElementById('campoID').value); 
    console.log(id);
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

    // Atualizar o usuário no localStorage
    atualizarUsuario(usuarioAtualizado); // O erro estava nesta linha

    // Recarregar a página ou redirecionar para outra após a edição
    window.location.reload();
});

$(document).ready(function() {
    carregarDados();
    console.log('Conteúdo do localStorage:', localStorage.getItem('Cadastro_de_Usuario'));
    $(document).on('click', '.editar', function() {
        var id = $(this).data('id');
        abrirModalEdicao(id);
    });
    $(document).on('click', '.excluir', function() {
        var id = $(this).data('id');
        excluirUsuario(id);
    });

});
