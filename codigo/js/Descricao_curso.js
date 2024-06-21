// Função para buscar informações do curso pelo ID no JSON Server
async function buscarInformacoesDoCurso(id) {
  try {
      const response = await fetch(`http://localhost:3000/courses/${id}`);
      if (!response.ok) {
          throw new Error('Erro ao buscar curso no JSON Server.');
      }
      const curso = await response.json();
      return curso;
  } catch (error) {
      console.error(error);
      return null;
  }
}

// Função para criar o HTML do curso na página de descrição
async function criarHTMLDoCurso() {
  const urlParams = new URLSearchParams(window.location.search);
  const idCurso = urlParams.get('id');

  if (idCurso) {
      console.log('ID do curso:', idCurso);
      const curso = await buscarInformacoesDoCurso(idCurso);

      if (curso) {
          const main = document.getElementById("curso-container");
          main.innerHTML = `
          <div class="container mt-5">
            <h1 class="text-center">${curso.titulo}</h1>
      
            <!-- Você pode adicionar aqui o restante do HTML conforme necessário -->
      
            <div class="text-center">
              <!-- Você pode adicionar aqui o restante do HTML conforme necessário -->
            </div>
      
            <h2 class="mt-3">Descrição</h2>
            <div class="descricao mt-1" style="height: 650px;">
              <p>${curso.descricao}</p>
            </div>
      
            <div class="detalhes-curso mt-4">
              <h2>Detalhes do Curso</h2>
              <p><strong>PROFESSOR:</strong> ${curso.professor}</p>
              <p><strong>PLATAFORMA:</strong> ${curso.plataforma}</p>
              <p><strong>RECOMENDAÇÃO:</strong> ${curso.recomendacao}</p>
              <p><strong>PREÇO:</strong> ${curso.preco}</p>
            </div>
      
            <div class="text-end mt-4">
              <a href="${curso.link}" class="btn btn-success">IR PARA A PÁGINA</a>
            </div>
          </div>
          `;
      } else {
          console.error('Curso não encontrado ou ID inválido.');
      }
  } else {
      console.error('ID do curso não encontrado na URL ou inválido.');
  }
}

// Esperar o DOM estar pronto na página de descrição
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.endsWith('Descricao_curso.html')) {
      criarHTMLDoCurso();
  }
});
function verificarLogin() {
  const user = sessionStorage.getItem("user");
  if (!user) {
    window.location.href = "../views/login.html";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  verificarLogin(); 

});