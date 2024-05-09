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
      window.location.href = "../Login_Admin/index.html";
  }

  $(document).ready(function() {
      // Função para carregar os dados do JSON e criar a tabela
      function carregarDados() {
          // Recupera os dados do localStorage
          let cursosExistente = localStorage.getItem('cursos');
          let cursosJSON = cursosExistente ? JSON.parse(cursosExistente) : [];

          var tableBody = $('#dataTable tbody');
          tableBody.empty(); // Limpa o conteúdo atual da tabela

          $.each(cursosJSON, function(index, item) {
              // Cria uma nova linha na tabela para cada item do JSON
              var newRow = '<tr>' +
                  '<td>' + item.id + '</td>' +
                  '<td>' + item.title + '</td>' +
                  '<td>' + item.platform + '</td>' +
                  '<td>' + item.description + '</td>' +
                  '<td>' + item.price + '</td>' +
                  '<td>' + item.recommendation + '</td>' +
                  '<td>' + item.link + '</td>' +
                  '<td>' +
                  '<button class="btn btn-primary btn-sm editar" data-id="' + item.id + '">Editar</button>' +
                  '<button class="btn btn-danger btn-sm excluir" data-id="' + item.id + '">Excluir</button>' +
                  '</td>' +
                  '</tr>';

              // Adiciona a nova linha à tabela
              tableBody.append(newRow);
          });

          // Adiciona evento de clique no botão Editar
          $('.editar').click(function() {
              var id = $(this).data('id');
              // Implemente a lógica para editar o item com o ID especificado
              alert('Editar item com ID: ' + id);
          });

          // Adiciona evento de clique no botão Excluir
          $('.excluir').click(function() {
              var id = $(this).data('id');
              // Chama a função para excluir o curso
              excluirCurso(id);
          });
      }

      // Função para excluir um curso
      function excluirCurso(id) {
          // Recupera os dados do localStorage
          let cursosExistente = localStorage.getItem('cursos');
          let cursosJSON = cursosExistente ? JSON.parse(cursosExistente) : [];

          // Filtra o array para remover o curso com o ID especificado
          cursosJSON = cursosJSON.filter(function(curso) {
              return curso.id !== id;
          });

          // Salva o JSON atualizado de volta no localStorage
          localStorage.setItem('cursos', JSON.stringify(cursosJSON));

          // Recarrega os dados da tabela para refletir a exclusão
          carregarDados();

          console.log('Curso excluído com sucesso!');
      }

      // Chama a função para carregar os dados ao carregar a página
      carregarDados();
  });
});
