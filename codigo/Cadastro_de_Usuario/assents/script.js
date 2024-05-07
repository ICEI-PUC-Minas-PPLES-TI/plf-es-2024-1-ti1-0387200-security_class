document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let id = getNextId();
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let nickname = document.getElementById('nickname').value;
    let idade = document.getElementById('idade').value;
    let celular = document.getElementById('celular').value;
    let sexo = document.getElementById('sexo').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    let novoUsuario = {
        "id": id,
        "nome": nome,
        "sobrenome": sobrenome,
        "nickname": nickname,
        "idade": idade,
        "celular": celular,
        "sexo": sexo,
        "email": email,
        "senha": senha
    };

    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    
    // Verificar se já existe um usuário com o mesmo e-mail
    let usuarioExistente = usuarios.find(user => user.email === email);
    if (usuarioExistente) {
        alert('Já existe um usuário cadastrado com este e-mail.');
        return;
    }

    usuarios.push(novoUsuario);
    localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));

    alert('Usuário cadastrado com sucesso!');
    document.getElementById('cadastroForm').reset();
});

// Função para obter o próximo ID começando de 0
function getNextId() {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    let nextId = usuarios.length;
    return nextId;
}
