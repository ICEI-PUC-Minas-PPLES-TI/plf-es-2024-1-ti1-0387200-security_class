document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault(); // Evita o envio padrão do formulário
  
      // Captura os valores dos campos do formulário
      const email = document.getElementById("email").value;
      const id = parseInt(document.getElementById("ID").value);
      const password = document.getElementById("password").value;
  
      // Carrega o JSON de Login_Admin.json
      fetch("../Data/Login_Admin.json")
        .then((response) => response.json())
        .then((data) => {
          // Verifica se o usuário e senha existem no JSON
          const admin = data.admins.find(
            (admin) => admin.email === email && admin.id === id && admin.senha === password
          );
  
          if (admin) {
            // Cria uma sessão do usuário
            sessionStorage.setItem("admin", JSON.stringify(admin));
            alert("Login realizado com sucesso!");
            // Redireciona para a página de administração
            window.location.href = "../Home_Admin/index.html";
          } else {
            alert("Email, ID ou senha incorretos. Tente novamente.");
          }
        })
        .catch((error) => {
          console.error("Erro ao carregar o JSON:", error);
          alert("Erro ao carregar os dados. Por favor, tente novamente mais tarde.");
        });
    });
  });
  