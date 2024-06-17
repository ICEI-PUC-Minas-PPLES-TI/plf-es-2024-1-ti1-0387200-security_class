document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let usuarios = JSON.parse(localStorage.getItem("Cadastro_de_Usuario"));

    if (!usuarios) {
      fetch("../Data/bd.json")
        .then((response) => response.json())
        .then((data) => {
          const user = data.usuarios.find(
            (usuario) => usuario.email === email && usuario.senha === password
          );

          if (user) {
            // Cria uma sessão do usuário
            sessionStorage.setItem("user", JSON.stringify(user));
            alert("Login realizado com sucesso!");
            // Redireciona para a página de usuário
            window.location.href = "../views/Home_User.html";
          } else {
            alert("Email, ID ou senha incorretos. Tente novamente.");
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar o JSON:", error);
          alert(
            "Erro ao carregar os dados. Por favor, tente novamente mais tarde."
          );
        });
    } else {
      const userLocal = usuarios.find(
        (usuario) => usuario.email === email && usuario.senha === password
      );

      if (userLocal) {
        sessionStorage.setItem("user", JSON.stringify(userLocal));
        alert("Login realizado com sucesso!");
        window.location.href = "../views/Home_User.html";
      } else {
        alert("Email, ID ou senha incorretos. Tente novamente.");
      }
    }
  });
});
