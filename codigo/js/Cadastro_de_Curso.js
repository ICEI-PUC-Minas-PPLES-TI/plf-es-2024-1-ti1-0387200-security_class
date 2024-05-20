// Verifica se a chave 'cursosJSON' está vazia ou não existe no localStorage
if (!localStorage.getItem('cursosJSON')) {
    // Se estiver vazia ou não existir, carrega os dados do JSON e salva no localStorage
    fetch('../Data/Cadastro_de_Curso.json')
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('cursosJSON', JSON.stringify(data));
        })
        .catch(error => console.error('Erro ao carregar cursos:', error));
}

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
        id: obterID(), // Você pode gerar um ID aleatório aqui se necessário
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

    // Recupera os cursos do localStorage
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON')) || { courses: [] };

    // Verifica se 'courses' é realmente um array
    if (!Array.isArray(cursosJSON.courses)) {
        cursosJSON.courses = [];
    }

    // Adiciona o novo curso ao array de cursos
    cursosJSON.courses.push(novoCurso);

    // Atualiza o localStorage com os cursos atualizados
    localStorage.setItem('cursosJSON', JSON.stringify(cursosJSON));

    console.log('Curso cadastrado:', novoCurso); // Mostra o curso cadastrado no console

    form.reset(); // Limpa o formulário após o cadastro
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

function obterID() {
    // Recupera os cursos do localStorage
    let cursosJSON = JSON.parse(localStorage.getItem('cursosJSON')) || { courses: [] };

    // Verifica se 'courses' é realmente um array
    if (!Array.isArray(cursosJSON.courses)) {
        cursosJSON.courses = [];
    }

    // Se não houver cursos cadastrados, retorna 1 como o próximo ID
    if (cursosJSON.courses.length === 0) {
        return 1;
    }

    // Encontra o maior ID entre os cursos
    let ultimoID = Math.max(...cursosJSON.courses.map(curso => curso.id));

    // Incrementa o ID em 1 para gerar um novo ID
    return ultimoID + 1;
}