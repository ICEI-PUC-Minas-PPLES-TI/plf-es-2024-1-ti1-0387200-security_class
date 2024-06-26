document.addEventListener("DOMContentLoaded", function () {
    // Recupera a sessão do usuário
    const adminSession = sessionStorage.getItem("admin");
    const admin = JSON.parse(adminSession);
  
    if (admin) {
      // Exemplo de uso da sessão
      console.log("ID do admin:", admin.id);
      console.log("Email do admin:", admin.email);
    } else {
      // Redireciona se não houver sessão válida
      window.location.href = "../views/Login_Admin.html";
    }
  });

function Cadastrar_cursos(){
  window.location.href = "../views/Cadastro_de_Curso.html";
}
function Gerenciar_Usuarios(){
  window.location.href = "../views/Exibição_de_Usuario.html";
}
function Gerenciar_cursos(){
  window.location.href = "../views/Gerenciar_Cursos.html";
}
function BlackList(){
  window.location.href = "../views/BlacklistAdmin.html";
}
// Verifica se já existe uma variável 'cursosJSON' no localStorage
// Se não existir, busca o JSON do arquivo '../Data/Cadastro_Cursos.json'
if (!localStorage.getItem('cursosJSON')) {
  fetch('../Data/Cadastro_de_Curso.json')
      .then(response => response.json())
      .then(data => {
          localStorage.setItem('cursosJSON', JSON.stringify(data.courses));
      })
      .catch(error => console.error('Erro ao carregar cursos:', error));
}
