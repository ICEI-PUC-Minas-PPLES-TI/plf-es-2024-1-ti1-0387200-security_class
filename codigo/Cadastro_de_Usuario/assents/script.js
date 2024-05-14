preencherSelect(); //Atualizar o Select do excluir ao carregar a página
preencherSelect2(); //Atualizar o Select do editar ao carregar a página

//Função de Cadastrar Novo Usuário
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let id = proximoId();
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
    preencherSelect2();
});

// Função para obter o próximo ID
function proximoId() {
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

// Função para preenchimento do select do exclusão
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

// FUNÇÃO DE OCULTAMENTO
// Função para preenchimento do select do editar
function preencherSelect2() {
    let selectUsuario2 = document.getElementById('selecionarUsuario2');
    selectUsuario2.innerHTML = '<option value="">Selecione um usuário</option>';
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    usuarios.forEach(usuario => {
        let option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = `${usuario.id} - ${usuario.nome}`;
        selectUsuario2.appendChild(option);
    });
}

//Função para mostrar a section de deletar
function mostrarDelete() {
    let section = document.getElementById('deletarUsuario');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// FUNÇÃO EDITAR

function mostrarEditar() {
    let section = document.getElementById('editarUser');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}

// Carregar as infos do usuário nos campos de edição
function carregarUsuario() {
    let select = document.getElementById('selecionarUsuario2');
    let idSelecionado = select.value;
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    let usuarioSelecionado = usuarios.find(usuario => usuario.id.toString() === idSelecionado.toString());
    if (usuarioSelecionado) {
        document.getElementById('editarNome').value = usuarioSelecionado.nome;
        document.getElementById('editarSobrenome').value = usuarioSelecionado.sobrenome;
        document.getElementById('editarNickname').value = usuarioSelecionado.nickname;
        document.getElementById('editarIdade').value = usuarioSelecionado.idade;
        document.getElementById('editarCelular').value = usuarioSelecionado.celular;
        document.getElementById('editarSexo').value = usuarioSelecionado.sexo;
        document.getElementById('editarEmail').value = usuarioSelecionado.email;
        document.getElementById('editarSenha').value = usuarioSelecionado.senha;
    } else {
        console.error('Usuário não encontrado');
    }
}

//Editar e salvar as edições no Localstorage
function editarUsuario() {
    let select = document.getElementById('selecionarUsuario2');
    let idSelecionado = select.value;
    let usuarios = JSON.parse(localStorage.getItem('Cadastro_de_Usuario')) || [];
    let index = usuarios.findIndex(usuario => usuario.id.toString() === idSelecionado.toString());
    if (index !== -1) {
        usuarios[index].nome = document.getElementById('editarNome').value;
        usuarios[index].sobrenome = document.getElementById('editarSobrenome').value;
        usuarios[index].nickname = document.getElementById('editarNickname').value;
        usuarios[index].idade = parseInt(document.getElementById('editarIdade').value);
        usuarios[index].celular = document.getElementById('editarCelular').value;
        usuarios[index].sexo = document.getElementById('editarSexo').value;
        usuarios[index].email = document.getElementById('editarEmail').value;
        usuarios[index].senha = document.getElementById('editarSenha').value;
        localStorage.setItem('Cadastro_de_Usuario', JSON.stringify(usuarios));
        alert('Usuário editado com sucesso!');
        preencherSelect2();
    } else {
        alert('Usuário não encontrado.');
    }
}
