// Capturar o ID do usuário da sessionStorage ou do primeiro usuário disponível em Cadastro_de_Usuario
let usuarioSession = sessionStorage.getItem("user");
let usuario;

if (usuarioSession) {
    console.log("Usuário logado encontrado na sessão:", usuarioSession);
    usuario = JSON.parse(usuarioSession);
} else {
    console.log("Nenhum usuário logado encontrado na sessão.");
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    if (usuarios.length > 0) {
        console.log("Usuários encontrados no localStorage:", usuarios);
        usuario = usuarios[0];
    } else {
        alert('Não há usuários cadastrados para criar um post.');
        // Adicione lógica adicional aqui, como redirecionar para a página de cadastro de usuário
        window.location.href = "../views/login.html";
    }
}

console.log("Usuário final:", usuario);

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

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('cadastroPostForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let idUsuario = usuario.id;
        let nickname = usuario.nickname;
        let titulo = document.getElementById('titulo').value;
        let tipoGolpe = document.getElementById('tipoGolpe').value;
        console.log(tipoGolpe);
        let descricao = document.getElementById('descricao').value;
        let link = document.getElementById('link').value;
        let publico = document.getElementById('publico').checked;

        capturarLocalizacao((localizacao) => {
            let novoPost = {
                "idUsuario": idUsuario,
                "nickname": nickname,
                "titulo": titulo,
                "tipoGolpe": tipoGolpe,
                "descricao": descricao,
                "link": link,
                "publico": publico,
                "dataPost": new Date().toISOString(),
                "localizacao": localizacao
            };

            fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoPost),
            })
            .then(response => response.json())
            .then(data => {
                alert('Post cadastrado com sucesso!');
                document.getElementById('cadastroPostForm').reset();

                // Adicionar o post à black list no JSON Server
                let novaBlackList = {
                    "id": data.id,  // Assumindo que a resposta contém o ID do novo post
                    "data": new Date().toISOString(),
                    "link": link,
                    "descricao": descricao,
                    "titulo": titulo
                };

                fetch('http://localhost:3000/blacklist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novaBlackList),
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Item adicionado à black list:", data);
                })
                .catch(error => {
                    console.error('Erro ao adicionar item à black list:', error);
                });
            })
            .catch(error => {
                console.error('Erro ao cadastrar post:', error);
            });
        });
    });
});

function verificarLogin() {
    const user = sessionStorage.getItem("user");
    if (!user) {
        window.location.href = "../views/login.html";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    verificarLogin(); 
});
