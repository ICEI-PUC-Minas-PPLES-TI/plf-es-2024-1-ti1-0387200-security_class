
function puxarInformacoesDoJSON() {
  const informacoesJSON = {
    titulo: 'CompTIA Security+ (SY0-701) Curso Completo + Simulados',
    descricao: 'Aprenda Cibersegurança (Segurança da Informação) e Prepare-se para CompTIA Security+ (SY0-701)',
    aulas: '61 AULAS',
    conclusao: 'CERTIFICADO',
    plataforma: 'UDEMY',
    secoes: [
      { numeracao: '01', descricao: 'ASSISTA ANTES DE COMPRAR' },
      { numeracao: '02', descricao: 'INTRODUÇÃO' },
      { numeracao: '03', descricao: 'MÓDULO 01 - CONCEITOS GERAIS DE SEGURANÇA' },
      { numeracao: '04', descricao: 'MÓDULO 02 - AMEAÇAS, VULNERABILIDADE E MITIGAÇÕES' },
      { numeracao: '05', descricao: 'DICAS DE CARREIRA' }
    ]
  };

  return informacoesJSON;
}

function criarDiv() {

  // Puxa as informações do JSON
  const informacoes = puxarInformacoesDoJSON();

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

  informacoes.secoes.forEach(secao => {
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

