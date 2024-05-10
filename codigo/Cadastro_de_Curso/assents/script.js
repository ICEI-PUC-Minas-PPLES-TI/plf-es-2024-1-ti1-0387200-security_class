const form = document.querySelector("form");
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


// Adiciona um listener para o evento de envio do formulário
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
        id: getNextId(), // Gera um ID aleatório
        title: titulo,
        platform: plataforma,
        description: descricao,
        recommendation: recomendacao,
        price: preco,
        link: link
    };
    form.reset();
    // Chama a função para adicionar o curso ao localStorage e mostrar o JSON atualizado
    adicionarCurso(novoCurso);
});

// Função para adicionar um novo curso à variável 'cursosJSON' e atualizar o localStorage
function adicionarCurso(curso) {
    let cursos = JSON.parse(localStorage.getItem('cursosJSON'));
    cursos.push(curso);
    localStorage.setItem('cursosJSON', JSON.stringify(cursos));
    
    console.log('Novo curso adicionado com sucesso!');
    console.log('JSON atualizado:', cursos); // Mostra o JSON atualizado no console
    
    // Aqui você pode exibir uma mensagem de sucesso ao usuário
}

// Função para voltar à página anterior
function Voltar(){
    window.location.href = "../Home_Admin/index.html";
}
function getNextId() {
    let cursos = JSON.parse(localStorage.getItem('cursosJSON')) || [];
    let nextId = cursos.length.toString();
    return nextId;
}