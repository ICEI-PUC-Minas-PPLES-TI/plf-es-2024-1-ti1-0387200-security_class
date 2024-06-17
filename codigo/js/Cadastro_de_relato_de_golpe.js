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

// Função para obter o próximo ID
function proximoId() {
    let posts = JSON.parse(localStorage.getItem('postagens')) || [];
    let nextId = posts.length + 1;
    return nextId;
}

// Função para capturar a localização
function capturarLocalizacao(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                callback(`${latitude}, ${longitude}`);
            },
            (error) => {
                console.error('Erro ao obter localização:', error);
                callback('Localização não disponível');
            }
        );
    } else {
        console.error('Geolocalização não é suportada pelo navegador.');
        callback('Localização não disponível');
    }
}

// Adicionar evento de submissão ao formulário de cadastro de post
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cadastroPostForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let idUsuario = usuario.id;
        let titulo = document.getElementById('titulo').value;
        let tipoGolpe = document.getElementById('tipoGolpe').value;
        let descricao = document.getElementById('descricao').value;
        let link = document.getElementById('link').value;
        let publico = document.getElementById('publico').checked;

        capturarLocalizacao((localizacao) => {
            let novoPost = {
                "id": proximoId(),
                "idUsuario": idUsuario,
                "titulo": titulo,
                "tipoGolpe": tipoGolpe,
                "descricao": descricao,
                "link": link,
                "publico": publico,
                "dataPost": new Date().toISOString(),
                "localizacao": localizacao
            };

            let posts = JSON.parse(localStorage.getItem('postagens')) || [];

            posts.push(novoPost);
            localStorage.setItem('postagens', JSON.stringify(posts));

            alert('Post cadastrado com sucesso!');
            document.getElementById('cadastroPostForm').reset();
        });
    });
});