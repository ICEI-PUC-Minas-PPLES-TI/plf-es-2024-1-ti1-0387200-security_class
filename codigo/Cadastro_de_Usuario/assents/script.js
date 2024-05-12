preencherSelect(); //Atualizar o Select ao carregar a página

//Função de Cadastrar Novo Usuário
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

// Função Excluir Usuários

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

// FUNÇÃO EDITAR

function mostrarEdit() {
    let section = document.getElementById('editarUser');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}


// Carrega usuário para editar as informações
function carregarUsuario() {
    let select = document.getElementById('selecionarUsuario');
    let idSelecionado = select.value;
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    let usuarioSelecionado = usuarios.find(usuario => usuario.id.toString() === idSelecionado.toString());
    if (usuarioSelecionado) {
        document.getElementById('editNome').value = usuarioSelecionado.nome;
        document.getElementById('editSobrenome').value = usuarioSelecionado.sobrenome;
        document.getElementById('editNickname').value = usuarioSelecionado.nicknome;
        document.getElementById('editIdade').value = usuarioSelecionado.idade;
        document.getElementById('editCelular').value = usuarioSelecionado.celular;
        document.getElementById('editSexo').value = usuarioSelecionado.sexo;
        document.getElementById('editEmail').value = usuarioSelecionado.email;
        document.getElementById('editSenha').value = usuarioSelecionado.senha;
    }
}

// Salva as alterações do usuário de volta no localStorage
function salvarEdicao() {
    let select = document.getElementById('selectUsuario');
    let idSelecionado = select.value;
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    let index = usuarios.findIndex(usuario => usuario.id.toString() === idSelecionado.toString());
    if (index !== -1) {
        usuarios[index].nome = document.getElementById('editNome').value;
        usuarios[index].sobrenome = document.getElementById('editSobrenome').value;
        usuarios[index].nickname = document.getElementById('editNickname').value;
        usuarios[index].idade = parseInt(document.getElementById('editIdade').value);
        usuarios[index].celular = parseInt(document.getElementById('editCelular').value);
        usuarios[index].sexo = parseInt(document.getElementById('editSexo').value);
        usuarios[index].email = parseInt(document.getElementById('editEmail').value);
        usuarios[index].senha = parseInt(document.getElementById('editSenha').value);
        localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));
        alert('Usuário editado com sucesso!');
        preencherSelect();
    } else {
        alert('Usuário não encontrado.');
    }
}