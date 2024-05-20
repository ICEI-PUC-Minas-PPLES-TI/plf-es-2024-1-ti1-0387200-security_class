// Variável global para armazenar o ID do último curso exibido
let ultimoCursoExibido = null;

// Função assíncrona para carregar o JSON e extrair informações
async function carregarEExtrairJSON(nomeArquivoJSON) {
  try {
    let informacoesJSON = localStorage.getItem('cursosJSON');

    if (!informacoesJSON) {
      const response = await fetch(nomeArquivoJSON);
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON: ' + response.statusText);
      }
      informacoesJSON = await response.json();
      localStorage.setItem('cursosJSON', JSON.stringify(informacoesJSON));
    } else {
      informacoesJSON = JSON.parse(informacoesJSON);
    }

    if (informacoesJSON && informacoesJSON.courses && informacoesJSON.courses.length > 0) {
      return informacoesJSON;
    } else {
      throw new Error('O JSON não contém dados válidos ou não possui cursos.');
    }
  } catch (error) {
    console.error('Erro ao carregar e extrair informações do JSON:', error.message);
    throw error;
  }
}
// Função para criar a div do curso
async function criarDiv(id) {
  try {
    if (!id) {
      throw new Error('ID inválido fornecido para criarDiv:', id);
    }

    if (id === ultimoCursoExibido) {
      return;
    }

    ultimoCursoExibido = id;

    let divExistente = document.getElementById(`curso-${id}`);
    if (divExistente) {
      return;
    }

    const informacoes = await carregarEExtrairJSON('../Data/Cadastro_de_Curso.json');
    const curso = informacoes.courses.find(curso => curso.id === id);

    if (!curso) {
      throw new Error(`Curso com ID ${id} não encontrado.`);
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
} catch (error) {
  console.error(error.message);
}
}

// Função para encontrar o curso com o maior ID
function encontrarCursoComMaiorID(cursos) {
  return cursos.reduce((maior, curso) => (curso.id > maior.id ? curso : maior), cursos[0]);
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
  if (!currentPath.endsWith('Descricao_curso.html')) {
    localStorage.removeItem('idCursoSelecionado');
  }

  try {
    const informacoes = await carregarEExtrairJSON('../Data/Cadastro_de_Curso.json');

    if (informacoes.courses && informacoes.courses.length > 0) {
      informacoes.courses.forEach(curso => {
        criarDiv(curso.id);
      });
    } else {
      console.error('Nenhum curso disponível para exibição.');
    }
  } catch (error) {
    console.error('Erro ao carregar informações:', error.message);
  }

  function setarIdLocalStorage(id) {
    if (!id) {
      console.error('ID inválido.');
      return;
    }
    localStorage.setItem('idCursoSelecionado', id);
  }

  document.addEventListener('click', function(event) {
    const botaoVerMais = event.target.closest('button');
    if (botaoVerMais) {
      const dataId = botaoVerMais.getAttribute('data-id');
      const idCurso = dataId ? dataId : '';

      if (idCurso) {
        setarIdLocalStorage(idCurso);
        window.location.href = 'Descricao_curso.html';
      }
    }
  });

  const formPesquisa = document.querySelector('.d-flex');
  const searchInput = formPesquisa.querySelector('input[type="search"]');
  if (!searchInput.id) {
    searchInput.id = 'search-course';
  }
  if (!searchInput.classList.contains('form-control')) {
    searchInput.classList.add('form-control');
  }
  searchInput.placeholder = 'Pesquise aqui...';

  formPesquisa.addEventListener('submit', function (event) {
    event.preventDefault();
    const palavraChave = searchInput.value;
    if (palavraChave) {
      pesquisarCurso(palavraChave);
    }
  });

  // Redefine idCursoSelecionado ao sair da página de descrição
  window.addEventListener('beforeunload', function () {
    if (window.location.pathname.endsWith('Descricao_curso.html')) {
      localStorage.removeItem('idCursoSelecionado');
    }
  });
});