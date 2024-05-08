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
  });



  document.getElementById('formCurso').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const titulo = document.getElementById('titulo').value;
    const plataforma = document.getElementById('plataforma').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const recomendacao = document.getElementById('recomendacao').value;
    const link = document.getElementById('link').value;

    // Cria o objeto curso com os valores capturados
    const novoCurso = {
        id: Math.floor(Math.random() * 1000) + 1, // Gera um ID aleatório
        title: titulo,
        platform: plataforma,
        description: descricao,
        recommendation: recomendacao,
        price: preco,
        link: link
    };

    // Chama a função para adicionar o curso ao arquivo JSON
    adicionarCursoAoArquivo(novoCurso);
});

// Função para adicionar um novo curso ao arquivo JSON externo
function adicionarCursoAoArquivo(curso) {
    const filePath = '../Data/Cadastro_de_Curso.json';

    // Lê o arquivo JSON existente
    fetch(filePath)
        .then(response => response.json())
        .then(jsonData => {
            // Adiciona o novo curso ao array de cursos
            jsonData.courses.push(curso);

            // Escreve os dados atualizados de volta no arquivo JSON
            return fetch(filePath, {
                method: 'PATCH', // Atualiza o arquivo JSON
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData, null, 2)
            });
        })
        .then(() => {
            console.log('Novo curso adicionado com sucesso!');
            window.location.href = "../Home_Admin/index.html";
            // Aqui você pode exibir uma mensagem de sucesso ao usuário
        })
        .catch(error => {
            console.error('Erro ao adicionar o curso:', error);
            // Aqui você pode exibir uma mensagem de erro ao usuário
        });
}
function Voltar(){
  window.location.href = "../Home_Admin/index.html";

}