// Adiciona um listener para o evento de envio do formulário
const form = document.querySelector("form");
let numSecoes = 1;

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos do formulário
    const titulo = document.getElementById('titulo').value;
    const plataforma = document.getElementById('plataforma').value;
    const descricao = document.getElementById('descricao').value;
    const preco = document.getElementById('preco').value;
    const recomendacao = document.getElementById('recomendacao').value;
    const link = document.getElementById('link').value;
    const professor = document.getElementById('professor').value;
    const aulas = document.getElementById('aulas').value;
    const conclusao = document.getElementById('conclusao').value;

    // Captura as seções do curso
    const secoes = [];
    const numeracoes = document.querySelectorAll('.numeracao');
    const descricoes = document.querySelectorAll('.descricao');
    numeracoes.forEach((numeracao, index) => {
        secoes.push({ numeracao: numeracao.value, descricao: descricoes[index].value });
    });

    // Cria o objeto curso com os valores capturados
    const novoCurso = {
        titulo: titulo,
        plataforma: plataforma,
        descricao: descricao,
        aulas: aulas,
        conclusao: conclusao,
        recomendacao: recomendacao,
        preco: preco,
        link: link,
        professor: professor,
        secoes: secoes
    };

    // Faz uma requisição POST para o JSON Server para adicionar o novo curso
    fetch('http://localhost:3000/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoCurso),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Curso cadastrado:', data); // Mostra o curso cadastrado no console
        form.reset(); // Limpa o formulário após o cadastro
    })
    .catch(error => {
        console.error('Erro ao cadastrar curso:', error);
    });
});

// Função para adicionar dinamicamente os campos de numeração e descrição das seções
function adicionarSecao() {
    numSecoes++;
    const secoesContainer = document.querySelector('.secoes-container');
    const novaSecao = `
        <div class="form-group">
            <label for="numeracao${numSecoes}">Numeração da Seção ${numSecoes}</label>
            <input type="number" id="numeracao${numSecoes}" class="form-control numeracao" placeholder="Digite a numeração da seção" required>
        </div>
        <div class="form-group">
            <label for="descricao${numSecoes}">Descrição da Seção ${numSecoes}</label>
            <textarea id="descricao${numSecoes}" class="form-control descricao" placeholder="Digite a descrição da seção" required></textarea>
        </div>
    `;
    secoesContainer.insertAdjacentHTML('beforeend', novaSecao);
}

// Função para voltar à página anterior
function Voltar() {
    window.location.href = "../views/Home_Admin.html";
}
