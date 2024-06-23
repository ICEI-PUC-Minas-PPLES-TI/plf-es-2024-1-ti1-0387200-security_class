// Variável global para armazenar o ID do último curso exibido
let ultimoCursoExibido = null;

// Função assíncrona para carregar os cursos do JSON Server
async function carregarCursosDoJSONServer(url) {
  let cursos = [];

  try {
    // Faz a requisição ao JSON Server
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao carregar os cursos do JSON Server: ' + response.statusText);
    }
    const data = await response.json();
    cursos = data;  // Assumindo que os cursos estão no array principal
    console.log('Cursos carregados do JSON Server:', cursos); // Log dos dados carregados
  } catch (error) {
    console.error('Erro ao carregar cursos do JSON Server:', error.message);
  }

  return cursos;
}

async function criarDiv(id) {
  if (!id) {
    console.error('ID inválido fornecido para criarDiv:', id);
    return;
  }

  if (id === ultimoCursoExibido) {
    return;
  }

  const divExistente = document.getElementById(`curso-${id}`);
  if (divExistente) {
    return; // Se a div já existe, não faz nada
  }

  ultimoCursoExibido = id;

  const cursos = await carregarCursosDoJSONServer('http://localhost:3000/courses');
  const curso = cursos.find(curso => curso.id === id); // Ajuste para comparação de ID alfanumérico

  if (!curso) {
    console.error(`Curso com ID ${id} não encontrado.`);
    return;
  }

  const section = document.createElement('section');
  section.className = 'py-5';

  const divContainer = document.createElement('div');
  divContainer.className = 'container';
  divContainer.id = `curso-${id}`;

  const divCard = document.createElement('div');
  divCard.className = 'card';

  const divCardBody1 = document.createElement('div');
  divCardBody1.className = 'card-body mt-2';

  const h3 = document.createElement('h3');
  h3.className = 'card-title';
  h3.textContent = curso.titulo;

  const p = document.createElement('p');
  p.className = 'card-text';
  p.textContent = curso.descricao;

  const divBotao = document.createElement('div');
  divBotao.className = 'botao';

  const button = document.createElement('button');
  button.textContent = 'Ver mais';
  button.setAttribute('data-id', curso.id);
  button.addEventListener('click', function() {
    const idCurso = this.getAttribute('data-id');
    window.location.href = `../views/Descricao_curso.html?id=${idCurso}`;
  });

  divBotao.appendChild(button);

  const divRow = document.createElement('div');
  divRow.className = 'row';

  const criarImagem = (src, alt) => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'card-img-top';
    img.alt = alt;
    img.style.maxHeight = '450px';
    return img;
  };

  const divCol1 = document.createElement('div');
  divCol1.className = 'col';
  divCol1.appendChild(criarImagem('../assets/IMG/Curso.jpeg', 'Imagem 1'));

  const divCol2 = document.createElement('div');
  divCol2.className = 'col';
  divCol2.appendChild(criarImagem('../assets/IMG/Curso_1.jpeg', 'Imagem 2'));

  const divCol3 = document.createElement('div');
  divCol3.className = 'col';
  divCol3.appendChild(criarImagem('../assets/IMG/Curso_2.jpeg', 'Imagem 3'));

  const divAtributos = document.createElement('div');
  divAtributos.className = 'atributos mt-2 d-flex';

  const spanAulas = document.createElement('span');
  spanAulas.className = 'quantidade_aulas';
  spanAulas.textContent = curso.aulas;

  const spanConclusao = document.createElement('span');
  spanConclusao.className = 'tipo_conclusao';
  spanConclusao.textContent = curso.conclusao;

  const divPlataforma = document.createElement('div');
  divPlataforma.className = 'ms-auto';
  const spanPlataforma = document.createElement('span');
  spanPlataforma.className = 'plataforma';
  spanPlataforma.textContent = curso.plataforma;

  divPlataforma.appendChild(spanPlataforma);
  divAtributos.appendChild(spanAulas);
  divAtributos.appendChild(spanConclusao);
  divAtributos.appendChild(divPlataforma);

  const divCardBody2 = document.createElement('div');
  divCardBody2.className = 'card-body';

  const h5 = document.createElement('h5');
  h5.className = 'card-title';
  h5.textContent = 'PRINCIPAIS SEÇÕES';

  const divConteudoPrincipal = document.createElement('div');
  divConteudoPrincipal.className = 'row conteudo-principal pt-5';

  curso.secoes.forEach(secao => {
    const divCol = document.createElement('div');
    divCol.className = 'col-md';

    const ul = document.createElement('ul');
    const liNumeracao = document.createElement('li');
    liNumeracao.className = 'numeracao';
    liNumeracao.textContent = secao.numeracao;

    const liDescricao = document.createElement('li');
    liDescricao.className = 'descricao';
    liDescricao.textContent = secao.descricao;

    ul.appendChild(liNumeracao);
    ul.appendChild(liDescricao);
    divCol.appendChild(ul);
    divConteudoPrincipal.appendChild(divCol);
  });

  divCardBody1.appendChild(h3);
  divCardBody1.appendChild(p);
  divCardBody1.appendChild(divBotao);

  divRow.appendChild(divCol1);
  divRow.appendChild(divCol2);
  divRow.appendChild(divCol3);

  divCard.appendChild(divCardBody1);
  divCard.appendChild(divRow);
  divCard.appendChild(divAtributos);
  divCard.appendChild(divCardBody2);
  divCardBody2.appendChild(h5);
  divCardBody2.appendChild(divConteudoPrincipal);

  divContainer.appendChild(divCard);
  section.appendChild(divContainer);

  const main = document.querySelector('main');
  main.appendChild(section);
}

// Variável para controlar se a mensagem "Nenhum curso encontrado" foi exibida
let mensagemExibida = false;

// Função para pesquisar cursos com base em uma palavra-chave
function pesquisarCurso(palavraChave) {
  const divsCursos = document.querySelectorAll('.card');
  let algumCursoEncontrado = false;

  divsCursos.forEach(curso => {
    const titulo = curso.querySelector('.card-title').textContent.toLowerCase();
    const descricao = curso.querySelector('.card-text').textContent.toLowerCase();

    if (titulo.includes(palavraChave.toLowerCase()) || descricao.includes(palavraChave.toLowerCase())) {
      curso.style.display = 'block';
      algumCursoEncontrado = true;
    } else {
      curso.style.display = 'none';
    }
  });

  if (!algumCursoEncontrado && !mensagemExibida) {
    const mensagemNenhumCurso = document.createElement('p');
    mensagemNenhumCurso.textContent = 'Nenhum curso encontrado.';
    const main = document.querySelector('.confirmacao');
    main.appendChild(mensagemNenhumCurso);
    mensagemExibida = true;
  } else if (algumCursoEncontrado && mensagemExibida) {
    const mensagemNenhumCurso = document.querySelector('.confirmacao p');
    mensagemNenhumCurso.remove();
    mensagemExibida = false;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const currentPath = window.location.pathname.toLowerCase();
  console.log('Current Path:', currentPath); // Debugging line

  // Se não estiver na página de descrição, remove o idCursoSelecionado
  if (!currentPath.endsWith('descricao_curso.html')) {
    localStorage.removeItem('idCursoSelecionado');
  }

  const cursos = await carregarCursosDoJSONServer('http://localhost:3000/courses');

  cursos.forEach(curso => {
    criarDiv(curso.id); // Passar o ID correto para criarDiv
  });

  const formPesquisa = document.querySelector('form');
  const searchInput = document.querySelector('.form-control.me-2');

  if (!formPesquisa || !searchInput) {
    console.error('Campo de busca não encontrado.');
  }

  formPesquisa.addEventListener('submit', function (event) {
    event.preventDefault();
    const palavraChave = searchInput.value;
    pesquisarCurso(palavraChave);
  });
});
