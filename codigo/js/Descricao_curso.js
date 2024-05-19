// Função para puxar informações do JSON armazenado localmente
function puxarInformacoesDoJSON(id) {
    let strDados = localStorage.getItem('cursosJSON');
    let objDados = {};
  
    if (strDados) {
      objDados = JSON.parse(strDados);
      if (id) {
        const curso = objDados.courses.find(curso => curso.id === id);
        return curso;
      } else {
        return objDados.courses;
      }
    } else {
      console.error('Não há dados de cursos armazenados localmente.');
      return null;
    }
  }
  
  // Função para criar o HTML do curso na página de descrição
  function criarHTMLDoCurso() {
    const idCurso = localStorage.getItem('idCursoSelecionado');
  
    if (idCurso) {
      console.log('ID do curso:', idCurso);
      const curso = puxarInformacoesDoJSON(parseInt(idCurso)); // Convertendo para número
  
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
      console.error('ID do curso não encontrado no Local Storage ou inválido.');
    }
  }
  
  // Esperar o DOM estar pronto na página de descrição
  document.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname.endsWith('Descricao_curso.html')) {
      criarHTMLDoCurso();
    }
  });






