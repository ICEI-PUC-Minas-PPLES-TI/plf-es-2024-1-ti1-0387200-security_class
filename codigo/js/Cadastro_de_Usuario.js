// Função para preencher o Select do excluir ao carregar a página
function preencherSelect() {
  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then((data) => {
      let selectUsuario = document.getElementById("selecionarUsuario");
      selectUsuario.innerHTML =
        '<option value="">Selecione um usuário</option>';
      data.forEach((usuario) => {
        let option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = `${usuario.id} - ${usuario.nome}`;
        selectUsuario.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro ao carregar usuários:", error));
}

// Função para preencher o Select do editar ao carregar a página
function preencherSelect2() {
  fetch("http://localhost:3000/usuarios")
    .then((response) => response.json())
    .then((data) => {
      let selectUsuario2 = document.getElementById("selecionarUsuario2");
      selectUsuario2.innerHTML =
        '<option value="">Selecione um usuário</option>';
      data.forEach((usuario) => {
        let option = document.createElement("option");
        option.value = usuario.id;
        option.textContent = `${usuario.id} - ${usuario.nome}`;
        selectUsuario2.appendChild(option);
      });
    })
    .catch((error) => console.error("Erro ao carregar usuários:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  preencherSelect(); // Atualizar o Select do excluir ao carregar a página
  preencherSelect2(); // Atualizar o Select do editar ao carregar a página

  document
    .getElementById("cadastroForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let nome = document.getElementById("nome").value;
      let sobrenome = document.getElementById("sobrenome").value;
      let nickname = document.getElementById("nickname").value;
      let idade = document.getElementById("idade").value;
      let celular = document.getElementById("celular").value;
      let sexo = document.getElementById("sexo").value;
      let email = document.getElementById("email").value;
      let senha = document.getElementById("senha").value;

      let novoUsuario = {
        nome: nome,
        sobrenome: sobrenome,
        nickname: nickname,
        idade: idade,
        celular: celular,
        sexo: sexo,
        email: email,
        senha: senha,
      };

      fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoUsuario),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Usuário cadastrado com sucesso!");
          document.getElementById("cadastroForm").reset();
          preencherSelect();
          preencherSelect2();
          window.location.href = "../views/login.html"
        })
        .catch((error) => {
          console.error("Erro ao cadastrar usuário:", error);
        });
    });

  document
    .getElementById("btnExcluir")
    .addEventListener("click", excluirUsuario);

  document.getElementById("btnEditar").addEventListener("click", mostrarEditar);
  document
    .getElementById("selecionarUsuario2")
    .addEventListener("change", carregarUsuario);
  document
    .getElementById("editarForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      editarUsuario();
    });
});

function excluirUsuario() {
  let id = document.getElementById("selecionarUsuario").value;
  if (!id) {
    alert("Por favor, selecione um usuário.");
    return;
  }

  fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Usuário excluído com sucesso!");
      preencherSelect();
      preencherSelect2();
    })
    .catch((error) => {
      console.error("Erro ao excluir usuário:", error);
    });
}

function mostrarEditar() {
  let section = document.getElementById("editarUser");
  if (section.style.display === "none") {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
}

function carregarUsuario() {
  let select = document.getElementById("selecionarUsuario2");
  let idSelecionado = select.value;

  fetch(`http://localhost:3000/usuarios/${idSelecionado}`)
    .then((response) => response.json())
    .then((usuario) => {
      document.getElementById("editarNome").value = usuario.nome;
      document.getElementById("editarSobrenome").value = usuario.sobrenome;
      document.getElementById("editarNickname").value = usuario.nickname;
      document.getElementById("editarIdade").value = usuario.idade;
      document.getElementById("editarCelular").value = usuario.celular;
      document.getElementById("editarSexo").value = usuario.sexo;
      document.getElementById("editarEmail").value = usuario.email;
      document.getElementById("editarSenha").value = usuario.senha;
    })
    .catch((error) => console.error("Erro ao carregar usuário:", error));
}

function editarUsuario() {
  let id = document.getElementById("selecionarUsuario2").value;
  if (!id) {
    alert("Por favor, selecione um usuário para editar.");
    return;
  }

  let nome = document.getElementById("editarNome").value;
  let sobrenome = document.getElementById("editarSobrenome").value;
  let nickname = document.getElementById("editarNickname").value;
  let idade = document.getElementById("editarIdade").value;
  let celular = document.getElementById("editarCelular").value;
  let sexo = document.getElementById("editarSexo").value;
  let email = document.getElementById("editarEmail").value;
  let senha = document.getElementById("editarSenha").value;

  let usuarioAtualizado = {
    nome: nome,
    sobrenome: sobrenome,
    nickname: nickname,
    idade: idade,
    celular: celular,
    sexo: sexo,
    email: email,
    senha: senha,
  };

  fetch(`http://localhost:3000/usuarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioAtualizado),
  })    
  .then(response => response.json())
  .then(data => {
      alert('Usuário editado com sucesso!');
      preencherSelect2();
  })
  .catch(error => {
      console.error('Erro ao editar usuário:', error);
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
