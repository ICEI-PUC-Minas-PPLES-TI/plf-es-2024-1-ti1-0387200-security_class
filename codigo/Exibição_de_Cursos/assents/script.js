// Variável global para armazenar o ID do último curso exibido
let ultimoCursoExibido = null;

function puxarInformacoesDoJSON(nomeArquivoJSON) {
  // Verifica se o JSON já está armazenado localmente
  if (!localStorage.getItem(nomeArquivoJSON)) {
    fetch(nomeArquivoJSON)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o JSON: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Armazena o JSON localmente
        localStorage.setItem(nomeArquivoJSON, JSON.stringify(data));
      })
      .catch(error => console.error('Erro ao carregar o JSON:', error.message));
  }

  // Obtenha os dados do JSON
  let strDados = localStorage.getItem(nomeArquivoJSON);
  let objDados = {};
  let informacoesJSON = {}; // Variável local para armazenar as informações

  if (strDados) {
    try {
      objDados = JSON.parse(strDados);
      if (objDados && objDados.courses && objDados.courses.length > 0) {
        // Se o JSON contém dados válidos, use o primeiro curso
        informacoesJSON = objDados.courses[0];
      } else {
        throw new Error('O JSON não contém dados válidos ou não possui cursos.');
      }
    } catch (error) {
      console.error('Erro ao analisar o JSON:', error.message);
    }
  } else {
    console.error('O JSON não está disponível localmente.');
  }

  return informacoesJSON;
}

function criarDiv(id) {

  if (id !== ultimoCursoExibido) {
    // Atualiza o ID do último curso exibido
    ultimoCursoExibido = id;
    // Puxa as informações do JSON
    const informacoes = puxarInformacoesDoJSON('../Data/Cadastro_de_Curso.json');

    // Cria os elementos HTML
    const section = document.createElement('section');
    section.id = 'secao3';
    section.className = 'py-5';

    const divContainer = document.createElement('div');
    divContainer.className = 'container';

    const divCard = document.createElement('div');
    divCard.className = 'card';

    const divCardBody1 = document.createElement('div');
    divCardBody1.className = 'card-body mt-2';

    const h3 = document.createElement('h3');
    h3.className = 'card-title';
    h3.textContent = informacoes.titulo;

    const p = document.createElement('p');
    p.className = 'card-text';
    p.textContent = informacoes.descricao;

    const divBotao = document.createElement('div');
    divBotao.className = 'botao';

    const button = document.createElement('button');
    const a = document.createElement('a');
    a.href = 'descricao.html';
    a.textContent = 'Ver mais';
    button.appendChild(a);
    divBotao.appendChild(button);

    const divRow = document.createElement('div');
    divRow.className = 'row';

    const divCol1 = document.createElement('div');
    divCol1.className = 'col';
    const img1 = document.createElement('img');
    img1.src = 'assents/img/Curso.jpeg';
    img1.className = 'card-img-top';
    img1.alt = 'Imagem 1';
    img1.style.maxHeight = '450px';
    divCol1.appendChild(img1);

    const divCol2 = document.createElement('div');
    divCol2.className = 'col';
    const img2 = document.createElement('img');
    img2.src = 'assents/img/Curso_1.jpeg';
    img2.className = 'card-img-top';
    img2.alt = 'Imagem 2';
    img2.style.maxHeight = '450px';
    divCol2.appendChild(img2);

    const divCol3 = document.createElement('div');
    divCol3.className = 'col';
    const img3 = document.createElement('img');
    img3.src = 'assents/img/Curso_2.jpeg';
    img3.className = 'card-img-top';
    img3.alt = 'Imagem 3';
    img3.style.maxHeight = '450px';
    divCol3.appendChild(img3);

    const divAtributos = document.createElement('div');
    divAtributos.className = 'atributos mt-2 d-flex';
    const spanAulas = document.createElement('span');
    spanAulas.className = 'quantidade_aulas';
    spanAulas.textContent = informacoes.aulas;
    const spanConclusao = document.createElement('span');
    spanConclusao.className = 'tipo_conclusao';
    spanConclusao.textContent = informacoes.conclusao;
    const divPlataforma = document.createElement('div');
    divPlataforma.className = 'ms-auto';
    const spanPlataforma = document.createElement('span');
    spanPlataforma.className = 'plataforma';
    spanPlataforma.textContent = informacoes.plataforma;
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

    if (informacoes && informacoes.secoes && Array.isArray(informacoes.secoes)) {
      informacoes.secoes.forEach(secoes => {
        const divCol = document.createElement('div');
        divCol.className = 'col-md';
        const ul = document.createElement('ul');
        const liNumeracao = document.createElement('li');
        liNumeracao.className = 'numeracao';
        liNumeracao.textContent = secoes.numeracao;
        const liDescricao = document.createElement('li');
        liDescricao.className = 'descricao';
        liDescricao.textContent = secoes.descricao;
        ul.appendChild(liNumeracao);
        ul.appendChild(liDescricao);
        divCol.appendChild(ul);
        divConteudoPrincipal.appendChild(divCol);
      });
    } else {
      console.error('As informações sobre as seções não foram encontradas ou estão em um formato inválido.');
    }

    // Adiciona os elementos criados à estrutura
    divCardBody1.appendChild(h3);
    divCardBody1.appendChild(p);
    divCard.appendChild(divCardBody1);
    divCardBody1.appendChild(divBotao);

    divCard.appendChild(divRow);
    divRow.appendChild(divCol1);
    divRow.appendChild(divCol2); // Adiciona a segunda coluna
    divRow.appendChild(divCol3); // Adiciona a terceira coluna

    divCard.appendChild(divAtributos);

    divCard.appendChild(divCardBody2);
    divCardBody2.appendChild(h5);
    divCardBody2.appendChild(divConteudoPrincipal);

    // Adiciona a estrutura à página HTML
    divContainer.appendChild(divCard);
    section.appendChild(divContainer);
    const main = document.querySelector('main');
    main.appendChild(section);
  }
}

// Variável para controlar se a mensagem "Nenhum curso encontrado" foi exibida
let mensagemExibida = false;

// Função para pesquisar cursos com base em uma palavra-chave
function pesquisarCurso(palavraChave) {
  // Obtenha todos os elementos de div que representam cursos
  const divsCursos = document.querySelectorAll('.card');

  let algumCursoEncontrado = false; // Variável para controlar se algum curso foi encontrado

  // Itere sobre cada div do curso
  divsCursos.forEach(curso => {
    // Obtenha o título e a descrição do curso
    const titulo = curso.querySelector('.card-title').textContent.toLowerCase();
    const descricao = curso.querySelector('.card-text').textContent.toLowerCase();

    // Verifique se a palavra-chave está presente no título ou na descrição do curso
    if (titulo.includes(palavraChave.toLowerCase()) || descricao.includes(palavraChave.toLowerCase())) {
      // Exiba a div do curso se a palavra-chave for encontrada
      curso.style.display = 'block';
      algumCursoEncontrado = true; // Atualize a variável para indicar que pelo menos um curso foi encontrado
    } else {
      // Oculte a div do curso se a palavra-chave não for encontrada
      curso.style.display = 'none';
    }
  });

  /**************************** BARRA DE PESQUISA ***************************************/
  // Se nenhum curso for encontrado e a mensagem ainda não foi exibida, exiba a mensagem
  if (!algumCursoEncontrado && !mensagemExibida) {
    const mensagemNenhumCurso = document.createElement('p');
    mensagemNenhumCurso.textContent = 'Nenhum curso encontrado.';
    const main = document.querySelector('.confirmacao');
    main.appendChild(mensagemNenhumCurso);
    mensagemExibida = true; // Atualize a variável para indicar que a mensagem foi exibida
  } else if (algumCursoEncontrado && mensagemExibida) {
    // Se algum curso for encontrado e a mensagem já foi exibida, remova a mensagem
    const mensagemNenhumCurso = document.querySelector('.confirmacao p');
    mensagemNenhumCurso.remove();
    mensagemExibida = false; // Atualize a variável para indicar que a mensagem foi removida
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Adicione um ouvinte de evento para o formulário de pesquisa
  const formPesquisa = document.querySelector('.d-flex');
  formPesquisa.addEventListener('submit', function (event) {
    event.preventDefault(); // Evite o envio do formulário padrão

    // Obtenha o valor digitado pelo usuário no campo de pesquisa
    const palavraChave = formPesquisa.querySelector('input[type="search"]').value;

    // Chame a função para pesquisar cursos com base na palavra-chave fornecida
    pesquisarCurso(palavraChave);
  });

  // Chame a função criarDiv com o nome do arquivo JSON correspondente ao curso desejado
  criarDiv('../Data/Cadastro_de_Curso.json');
});
