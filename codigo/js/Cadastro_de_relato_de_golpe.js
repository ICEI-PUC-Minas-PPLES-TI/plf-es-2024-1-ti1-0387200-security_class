// Capturar o ID do usuário da sessionStorage ou do primeiro usuário disponível em Cadastro_de_Usuario
let usuarioSession = sessionStorage.getItem("usuario");
let usuario;

if (usuarioSession) {
    usuario = JSON.parse(usuarioSession);
} else {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    if (usuarios.length > 0) {
        usuario = usuarios[0];
    } else {
        alert('Não há usuários cadastrados para criar um post.');
        // Você pode adicionar lógica adicional aqui, como redirecionar para a página de cadastro de usuário
    }
}

// Adicionar evento de submissão ao formulário de cadastro de post
document.getElementById('cadastroPostForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let idUsuario = usuario.id;
    let titulo = document.getElementById('titulo').value;
    let tipoGolpe = document.getElementById('tipoGolpe').value;
    let descricao = document.getElementById('descricao').value;
    let link = document.getElementById('link').value;
    let publico = document.getElementById('publico').checked;

    let novoPost = {
        "id": proximoId(),
        "idUsuario": idUsuario,
        "titulo": titulo,
        "tipoGolpe": tipoGolpe,
        "descricao": descricao,
        "link": link,
        "publico": publico,
        "dataPost": new Date().toISOString()
    };

    let posts = JSON.parse(localStorage.getItem('postagens')) || [];

    posts.push(novoPost);
    localStorage.setItem('postagens', JSON.stringify(posts));

    alert('Post cadastrado com sucesso!');
    document.getElementById('cadastroPostForm').reset();
});

// Função para obter o próximo ID
function proximoId() {
    let posts = JSON.parse(localStorage.getItem('postagens')) || [];
    let nextId = posts.length + 1;
    return nextId;
}