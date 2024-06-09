document.addEventListener('DOMContentLoaded', function () {
    const entradaComentario = document.querySelector('.new-comment-section input');
    const botaoComentario = document.querySelector('.new-comment-section button');
    const secaoComentarios = document.querySelector('.comments-section');
    const usuarioAtual = "Usuário Atual"; // Substitua isso com a lógica para obter o usuário logado
    let idPostAtual = null;

    // Função para obter comentários do localStorage
    function obterComentarios() {
        const comentarios = localStorage.getItem('comentarios');
        return comentarios ? JSON.parse(comentarios) : { comentariosDenuncia: [] };
    }

    // Função para salvar comentários no localStorage
    function salvarComentarios(comentarios) {
        localStorage.setItem('comentarios', JSON.stringify(comentarios));
    }

    // Função para renderizar comentários
    function renderizarComentarios() {
        const dadosComentarios = obterComentarios();
        secaoComentarios.innerHTML = '<h6>Comentários</h6>';
        const comentariosPost = dadosComentarios.comentariosDenuncia.filter(comentario => comentario.idDenuncia === idPostAtual);
        comentariosPost.forEach(comentario => {
            const elementoComentario = document.createElement('div');
            elementoComentario.classList.add('comment-card', 'card', 'mb-3');
            const tempoDecorrido = obterTempoDecorrido(new Date(comentario.dataHora));
            const podeEditar = estaDentroDeUmaHora(new Date(comentario.dataHora));
            const jaCurtiu = comentario.usuariosQueCurtiram && comentario.usuariosQueCurtiram.includes(usuarioAtual);
            elementoComentario.innerHTML = `
                <div class="card-body d-flex">
                    <img src="../assets/img/Perfil.jpg" alt="Foto de Usuário" class="rounded-circle me-3" width="50" height="50">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="fw-bold">${comentario.autor}</span>
                                <div class="text-muted small">${tempoDecorrido}</div>
                            </div>
                            <div class="comment-actions d-flex flex-column align-items-end" data-id="${comentario.id}">
                                ${podeEditar ? '<span class="edit-comment mb-1" style="cursor:pointer; font-size: 16px;">&#9998;</span>' : ''}
                                <div class="comment-likes" style="cursor: pointer;">
                                    <span>&#10084;</span>
                                    <span>${comentario.curtidas}</span>
                                </div>
                                <span class="delete-comment ms-3" style="display: none; cursor: pointer; font-size: 16px;">&#128465;</span>
                            </div>
                        </div>
                        <p class="mb-1">${comentario.comentario}</p>
                    </div>
                </div>
            `;
            secaoComentarios.appendChild(elementoComentario);

            // Esconder o ícone de editar se não puder editar
            if (!podeEditar) {
                const botaoEditar = elementoComentario.querySelector('.edit-comment');
                if (botaoEditar) botaoEditar.style.display = 'none';
            }

            // Desativar botão de curtir se já curtiu
            if (jaCurtiu) {
                const botaoCurtir = elementoComentario.querySelector('.comment-likes');
                botaoCurtir.style.cursor = 'not-allowed';
                botaoCurtir.style.color = 'grey';
            }
        });

        // Adicionar eventos aos botões de curtir
        document.querySelectorAll('.comment-likes').forEach(botaoCurtir => {
            botaoCurtir.addEventListener('click', function() {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                curtirComentario(idComentario);
            });
        });

        // Adicionar eventos aos botões de editar
        document.querySelectorAll('.edit-comment').forEach(botaoEditar => {
            botaoEditar.addEventListener('click', function() {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                editarComentario(idComentario);
            });
        });

        // Adicionar eventos aos botões de deletar
        document.querySelectorAll('.delete-comment').forEach(botaoDeletar => {
            botaoDeletar.addEventListener('click', function() {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                deletarComentario(idComentario);
            });
        });
    }

    // Função para adicionar um novo comentário
    function adicionarComentario() {
        if (entradaComentario.value.trim() === "") return; // Evitar comentários vazios

        const dadosComentarios = obterComentarios();
        const novoComentario = {
            id: dadosComentarios.comentariosDenuncia.length + 1,
            idDenuncia: idPostAtual, // ID do post atual
            autor: usuarioAtual,
            dataHora: new Date().toISOString(),
            curtidas: 0,
            comentario: entradaComentario.value,
            usuariosQueCurtiram: [] // Inicializar lista de usuários que curtiram
        };
        dadosComentarios.comentariosDenuncia.push(novoComentario);
        salvarComentarios(dadosComentarios);
        renderizarComentarios();
        entradaComentario.value = '';
    }

    // Função para curtir um comentário
    function curtirComentario(idComentario) {
        const dadosComentarios = obterComentarios();
        const comentario = dadosComentarios.comentariosDenuncia.find(c => c.id === idComentario);
        if (comentario && !comentario.usuariosQueCurtiram.includes(usuarioAtual)) {
            comentario.curtidas += 1;
            comentario.usuariosQueCurtiram.push(usuarioAtual); // Adicionar usuário à lista de curtidas
            salvarComentarios(dadosComentarios);
            renderizarComentarios();
        }
    }

    // Função para editar um comentário
    function editarComentario(idComentario) {
        const dadosComentarios = obterComentarios();
        const comentario = dadosComentarios.comentariosDenuncia.find(c => c.id === idComentario);
        if (comentario) {
            const elementoComentario = document.querySelector(`[data-id="${idComentario}"]`).closest('.comment-card');
            const elementoTextoComentario = elementoComentario.querySelector('p.mb-1');
            const elementoCurtidasComentario = elementoComentario.querySelector('.comment-likes');
            const elementoAcoesComentario = elementoComentario.querySelector('.comment-actions');
            const botaoEditar = elementoAcoesComentario.querySelector('.edit-comment');
            const botaoDeletar = elementoAcoesComentario.querySelector('.delete-comment');

            // Esconder o botão de editar, curtidas e mostrar ícone de deletar
            botaoEditar.style.display = 'none';
            elementoCurtidasComentario.style.display = 'none';
            botaoDeletar.style.display = 'block';

            // Criar um campo de entrada para editar o comentário
            const campoEntrada = document.createElement('input');
            campoEntrada.type = 'text';
            campoEntrada.className = 'form-control';
            campoEntrada.value = comentario.comentario;

            // Substituir o texto do comentário pelo campo de entrada
            elementoTextoComentario.replaceWith(campoEntrada);

            // Adicionar evento para salvar o comentário editado
            campoEntrada.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    comentario.comentario = campoEntrada.value;
                    salvarComentarios(dadosComentarios);
                    renderizarComentarios();
                }
            });

            // Adicionar evento para salvar o comentário editado ao perder o foco
            campoEntrada.addEventListener('blur', function () {
                comentario.comentario = campoEntrada.value;
                salvarComentarios(dadosComentarios);
                renderizarComentarios();
            });
        }
    }

    // Função para deletar um comentário
    function deletarComentario(idComentario) {
        const dadosComentarios = obterComentarios();
        dadosComentarios.comentariosDenuncia = dadosComentarios.comentariosDenuncia.filter(c => c.id !== idComentario);
        salvarComentarios(dadosComentarios);
        renderizarComentarios();
    }

    // Função para calcular o tempo decorrido
    function obterTempoDecorrido(dataPost) {
        const agora = new Date();
        const decorrido = agora - dataPost; // tempo em milissegundos

        const segundos = Math.floor(decorrido / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const semanas = Math.floor(dias / 7);
        const meses = Math.floor(semanas / 4.35);
        const anos = Math.floor(meses / 12);

        if (anos > 0) return anos + ' ano(s) atrás';
        if (meses > 0) return meses + ' mês(es) atrás';
        if (semanas > 0) return semanas + ' semana(s) atrás';
        if (dias > 0) return dias + ' dia(s) atrás';
        if (horas > 0) return horas + ' hora(s) atrás';
        if (minutos > 0) return minutos + ' minuto(s) atrás';
        return segundos + ' segundo(s) atrás';
    }

    // Função para verificar se um comentário foi postado na última hora
    function estaDentroDeUmaHora(dataPost) {
        const agora = new Date();
        const decorrido = agora - dataPost; // tempo em milissegundos
        const umaHora = 1000 * 60 * 60;
        return decorrido < umaHora;
    }

    // Função para exibir detalhes do post no modal
    function exibirPostNoModal(post) {
        document.getElementById('postTitle').textContent = post.titulo;
        document.getElementById('postDescription').textContent = post.descricao;
        const linkPost = document.getElementById('postLink');
        linkPost.href = post.link;
        linkPost.textContent = post.link;
        idPostAtual = post.id;
        renderizarComentarios();
        new bootstrap.Modal(document.getElementById('postModal')).show();
    }

    // Dados de exemplo de posts (Temporário, só para a entrega da Sprint 3)
    const posts = [
        {
            id: 1,
            idUsuario: 1,
            titulo: "CRIARAM UM FAKE POR IA E PEDIRAM PIX EM MEU NOME!",
            descricao: "Eram o meu rosto, meu cabelo e a minha voz. O único detalhe é que a voz estava um pouco em descompasso com o vídeo, mas sabemos que isso pode acontecer devido à conexão com a internet. É assustador ver a evolução desse tipo de golpe",
            tipoGolpe: "Estelionato eletrônico",
            link: "https://teste.com.br",
            publico: true,
            dataPost: "2024-05-07T10:00:00Z"
        }
    ];

    // Renderizar lista de posts 
    const containerListaPosts = document.getElementById('postList'); // Certifique-se de que este elemento exista no seu HTML
    posts.forEach(post => {
        const elementoPost = document.createElement('div');
        elementoPost.className = 'post';
        elementoPost.textContent = post.titulo;
        elementoPost.style.cursor = 'pointer';
        elementoPost.addEventListener('click', () => exibirPostNoModal(post));
        containerListaPosts.appendChild(elementoPost);
    });

    // Listener de evento para adicionar um comentário com o botão
    botaoComentario.addEventListener('click', adicionarComentario);

    // Listener de evento para adicionar um comentário com a tecla Enter
    entradaComentario.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            adicionarComentario();
        }
    });

    // Renderização inicial
    renderizarComentarios();

    // Atualizar tempo decorrido a cada minuto
    setInterval(renderizarComentarios, 60000);
});