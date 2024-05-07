document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    // Obter os valores do formulário
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let nickname = document.getElementById('nickname').value;
    let celular = document.getElementById('celular').value;
    let idade = parseInt(document.getElementById('idade').value);
    let sexo = document.getElementById('sexo').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
  
    // Criar o objeto de usuário
    let novoUsuario = {
      "id": getNextId(), // Função para obter o próximo Id disponível
      "nome": nome,
      "sobrenome": sobrenome,
      "nickname": nickname,
      "celular": celular,
      "idade": idade,
      "sexo": sexo,
      "email": email,
      "senha": senha
    };
  
    // Adicionar o novo usuário ao JSON de usuários
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
    alert('Usuário cadastrado com sucesso!');
    document.getElementById('cadastroForm').reset();
  });
  
  // Função para obter o próximo Id disponível
  function getNextId() {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let nextId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
    return nextId;
  }
