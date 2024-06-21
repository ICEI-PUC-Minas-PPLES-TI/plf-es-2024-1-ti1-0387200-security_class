document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (event) {
      event.preventDefault(); // Evita o envio padrão do formulário

      // Captura os valores dos campos do formulário
      const email = document.getElementById("email").value;
      const id = parseInt(document.getElementById("ID").value);
      const password = document.getElementById("password").value;

      try {
          // Envia uma requisição GET para o endpoint de autenticação
          const response = await fetch(`http://localhost:3000/admins?email=${email}&id=${id}&senha=${password}`);

          if (!response.ok) {
              throw new Error("Erro ao autenticar usuário");
          }

          const admin = await response.json();

          if (admin) {
              // Cria uma sessão do usuário
              sessionStorage.setItem("admin", JSON.stringify(admin));
              alert("Login realizado com sucesso!");
              // Redireciona para a página de administração
              window.location.href = "../views/Home_Admin.html";
          } else {
              alert("Email, ID ou senha incorretos. Tente novamente.");
          }
      } catch (error) {
          console.error("Erro ao autenticar usuário:", error);
          alert("Erro ao autenticar usuário. Por favor, tente novamente mais tarde.");
      }
  });
});
