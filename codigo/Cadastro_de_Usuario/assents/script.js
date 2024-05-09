preencherSelect(); //Atualizar o Select ao carregar a página

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

    // Declaração de novo usuario
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
    let usuarioExistente = usuarios.find(user => user.email == email);
    if (usuarioExistente) {
        alert('Já existe um usuário cadastrado com este e-mail.');
        return;
    }

    usuarios.push(novoUsuario);
    localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));

    alert('Usuário cadastrado com sucesso!');
    document.getElementById('cadastroForm').reset();
    preencherSelect ();
});

// Função para obter o próximo ID
function getNextId() {
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    let nextId = usuarios.length.toString();
    return nextId;
}

// função que realiza a Exclusão de Usuários
function excluirUsuario() {
    let id = document.getElementById('selecionarUsuario').value;
    if (!id) {
        alert('Por favor, selecione um usuário.');
        return;
    }
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    let index = usuarios.findIndex(usuario => usuario.id.toString() == id.toString());
    if (index != -1) {
        usuarios.splice(index, 1);
        localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));
        alert('Usuário excluído com sucesso!');
        preencherSelect();
    } else {
        alert('Usuário não encontrado.');
    }
}

// Função para preenchimento do select de exclusão
function preencherSelect() {
    let selectUsuario = document.getElementById('selecionarUsuario');
    selectUsuario.innerHTML = '<option value="">Selecione um usuário</option>';
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    usuarios.forEach(usuario => {
        let option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = `${usuario.id} - ${usuario.nome}`;
        selectUsuario.appendChild(option);
    });
}

//Função para mostrar a section de deletar
function mostrarDelete() {
    let section = document.getElementById('deleteUser');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}
