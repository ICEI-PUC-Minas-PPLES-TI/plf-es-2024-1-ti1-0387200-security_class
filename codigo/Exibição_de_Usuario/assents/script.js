function fechar(){
    window.location.reload();
}
//Seção admin
document.addEventListener("DOMContentLoaded", function () {
    const adminSession = sessionStorage.getItem("admin");
    const admin = JSON.parse(adminSession);
  
    if (admin) {
      console.log("ID do admin:", admin.id);
      console.log("Email do admin:", admin.email);
    } else {
      window.location.href = "../Login_Admin/index.html";
    }
  });
//Função de fechar do modal
function fechar(){
    window.location.reload();
}
//Função que coleta os dados do modal, e adiciona eventos aos botões presentes na tabela
$(document).ready(function() {
    carregarDados();
    console.log('Conteúdo do localStorage:', localStorage.getItem('Cadastro_de_Usuario'));
    
    // Evento de clique no botão de editar
    $(document).on('click', '.editar', function() {
        var id = $(this).data('id');
        console.log(id)
        abrirModalEdicao(id);
    });
    
    // Evento de clique no botão de excluir
    $(document).on('click', '.excluir', function() {
        var id = $(this).data('id');
        excluirUsuario(id);
        carregarDados(); // Recarregar a tabela após excluir o usuário

    });
});

// Função para carregar os dados da tabela
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
//Função para atualizar a tabela
function atualizarTabela(usuarios) {
    var tableBody = $('#dataTable tbody');
    tableBody.empty();

    $.each(usuarios, function(index, usuario) {
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
//Função para abri o modal
function abrirModalEdicao(id) {

    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));
    let usuarioParaEditar = usuarios.find(usuario => usuario.id === String(id)); // Convertendo para string antes de comparar
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
//Função para atualizar os dados do usuario
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
//Função para adicionar o usuario que foi editado
function adicionarUsuario(usuario) {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));
    usuarios.push(usuario);
    localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));
    
    console.log('Novo usuário adicionado com sucesso!');
    console.log('JSON atualizado:', usuarios); // Mostra o JSON atualizado no console

}
//Função que exclui o usuario
function excluirUsuario(id) {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario'));

    usuarios = usuarios.filter(function(usuario) {
        return usuario.id !== String(id); // Convertendo para string antes de comparar
  });

    localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));

    console.log('Usuário excluído com sucesso!');
}

//Função que ao precnher o formulario de edição o antigo usuario é apagado e um novo com os dados
//do que foi apagado porem com as edições feitas é criado
document.getElementById('formEdicao').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const id = document.getElementById('campoID').value.trim();
    console.log(id);
    const nome = document.getElementById('campoNome').value;
    const sobrenome = document.getElementById('campoSobrenome').value;
    const nickname = document.getElementById('campoNickname').value;
    const celular = document.getElementById('campoCelular').value;
    const idade = parseInt(document.getElementById('campoIdade').value);
    const sexo = document.getElementById('campoSexo').value;
    const email = document.getElementById('campoEmail').value;
    const senha = document.getElementById('campoSenha').value;
    
    // Exclui o usuário antes de atualizar
    excluirUsuario(id);
    
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
    atualizarUsuario(usuarioAtualizado);

    window.location.reload();
});



