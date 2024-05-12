
function puxarInformacoesDoJSON() {
    /************** 
    if (!localStorage.getItem('cursosJSON')) {
        fetch('../Data/Cadastro_de_Curso.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('cursosJSON', JSON.stringify(data.courses));
            })
            .catch(error => console.error('Erro ao carregar cursos:', error));
    }

    let strDados = localStorage.getItem('cursosJSON');
    let objDados = {};

    console.log(strDados);
    if (strDados) {
        objDados = JSON.parse(strDados);
        return objDados;
    } else {
        */
    const informacoesJSON = {
        titulo: 'CompTIA Security+ (SY0-701) Curso Completo + Simulados',
        descricao: 'Aprenda Cibersegurança (Segurança da Informação) e Prepare-se para CompTIA Security+ (SY0-701) Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker',
        aulas: '61 AULAS',
        conclusao: 'CERTIFICADO',
        plataforma: 'UDEMY',
        Professor: 'André Pereira',
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
//}

// Função para criar o HTML
function criarHTML() {
    const dados = puxarInformacoesDoJSON();
    const main = document.getElementById("curso-container");

    // Acesso às propriedades corrigido para usar dados ao invés de curso
    main.innerHTML = `
        <div class="container mt-5">
            <h1 class="text-center">${dados.titulo}</h1>
  
            <!-- Você pode adicionar aqui o restante do HTML conforme necessário -->
  
            <div class="text-center">
                <!-- Você pode adicionar aqui o restante do HTML conforme necessário -->
            </div>
  
            <h2 class="mt-3">Descrição</h2>
            <div class="descricao mt-1" style="height: 650px;">
                <p>${dados.descricao}</p>
            </div>
  
            <div class="detalhes-curso mt-4">
                <h2>Detalhes do Curso</h2>
                <p><strong>PROFESSOR:</strong> ${dados.Professor}</p>
                <p><strong>PLATAFORMA:</strong> ${dados.plataforma}</p>
                <p><strong>RECOMENDAÇÃO:</strong> ${dados.recomendacao}</p>
                <p><strong>PREÇO:</strong> ${dados.preco}</p>
            </div>
  
            <div class="text-end mt-4">
                <a href="#" class="btn btn-success">IR PARA A PÁGINA</a>
            </div>
        </div>
    `;
}

// Esperar o DOM estar pronto
document.addEventListener("DOMContentLoaded", function () {
    // Chamar a função para criar o HTML
    criarHTML();
});