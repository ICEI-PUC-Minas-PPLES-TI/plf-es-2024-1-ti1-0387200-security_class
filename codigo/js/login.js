document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Faz uma requisição para o JSON Server
      const response = await fetch(
        `http://localhost:3000/usuarios?email=${email}&senha=${password}`
      );
      console.log("Response:", response); // Log the response for debugging

      if (!response.ok) {
        throw new Error("Erro ao autenticar usuário");
      }

      const usuarios = await response.json();
      console.log("Usuarios:", usuarios); // Log the user data for debugging

      if (usuarios.length > 0) {
        const user = usuarios[0]; // Usuário encontrado
        console.log("Usuário encontrado:", user); // Log the found user
        // Cria uma sessão do usuário
        sessionStorage.setItem("user", JSON.stringify(user));
        alert("Login realizado com sucesso!");
        // Redireciona para a página de usuário
        window.location.href = "../views/Exibicao_de_relato_de_Golpe.html";
      } else {
        alert("Email ou senha incorretos. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      alert(
        "Erro ao carregar os dados. Por favor, tente novamente mais tarde."
      );
    }
  });
});
function Cadastro(){
  window.location.href = "../views/Cadastro_de_Usuario.html";
}
