document.addEventListener('DOMContentLoaded', function () {
    const entradaComentario = document.querySelector('.new-comment-section input');
    const botaoComentario = document.querySelector('.new-comment-section button');
    const secaoComentarios = document.querySelector('.comments-section');

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
        dadosComentarios.comentariosDenuncia.forEach(comentario => {
            const elementoComentario = document.createElement('div');
            elementoComentario.classList.add('comment-card', 'card', 'mb-3');
            const tempoDecorrido = calcularTempoDecorrido(new Date(comentario.dataHora));
            const podeEditar = dentroDeUmaHora(new Date(comentario.dataHora));
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
                                <div class="comment-likes">
                                    <span>&#10084;</span>
                                    <span>${comentario.curtidas}</span>
                                </div>
                            </div>
                        </div>
                        <p class="mb-1">${comentario.comentario}</p>
                    </div>
                </div>
            `;
            secaoComentarios.appendChild(elementoComentario);
        });

        // Adicionar event listeners para botões de curtidas
        document.querySelectorAll('.comment-likes').forEach(botaoCurtir => {
            botaoCurtir.addEventListener('click', function() {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                curtirComentario(idComentario);
            });
        });

        // Adicionar event listeners para botões de editar
        document.querySelectorAll('.edit-comment').forEach(botaoEditar => {
            botaoEditar.addEventListener('click', function() {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                editarComentario(idComentario);
            });
        });

        // Adicionar event listeners para botões de deletar
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
            idDenuncia: 1, // Ajuste conforme necessário
            autor: "Usuário Atual",
            dataHora: new Date().toISOString(),
            curtidas: 0,
            comentario: entradaComentario.value
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
        if (comentario) {
            comentario.curtidas += 1;
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
            const textoComentario = elementoComentario.querySelector('p.mb-1');
            const curtidasComentario = elementoComentario.querySelector('.comment-likes');
            const acoesComentario = elementoComentario.querySelector('.comment-actions');
            const botaoEditar = acoesComentario.querySelector('.edit-comment');

            // Ocultar o botão de editar, curtidas e mostrar ícone de deletar
            botaoEditar.style.display = 'none';
            curtidasComentario.style.display = 'none';
            if (!acoesComentario.querySelector('.delete-comment')) {
                const iconeDeletar = document.createElement('span');
                iconeDeletar.className = 'delete-comment ms-3';
                iconeDeletar.style.cursor = 'pointer';
                iconeDeletar.style.fontSize = '16px';
                iconeDeletar.innerHTML = '&#128465;';
                acoesComentario.appendChild(iconeDeletar);
                iconeDeletar.addEventListener('click', function () {
                    deletarComentario(idComentario);
                });
            }

            // Criar um campo de entrada para editar o comentário
            const campoEntrada = document.createElement('input');
            campoEntrada.type = 'text';
            campoEntrada.className = 'form-control';
            campoEntrada.value = comentario.comentario;

            // Substituir o texto do comentário pelo campo de entrada
            textoComentario.replaceWith(campoEntrada);

            // Adicionar um event listener para salvar o comentário editado
            campoEntrada.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    comentario.comentario = campoEntrada.value;
                    salvarComentarios(dadosComentarios);
                    renderizarComentarios();
                }
            });

            // Adicionar um event listener para salvar o comentário editado ao perder o foco
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
    function calcularTempoDecorrido(dataPostagem) {
        const agora = new Date();
        const decorrido = agora - dataPostagem; // tempo em milissegundos

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
    function dentroDeUmaHora(dataPostagem) {
        const agora = new Date();
        const decorrido = agora - dataPostagem; // tempo em milissegundos
        const umaHora = 1000 * 60 * 60;
        return decorrido < umaHora;
    }

    // Event listener para adicionar um comentário com o botão
    botaoComentario.addEventListener('click', adicionarComentario);

    // Event listener para adicionar um comentário com a tecla Enter
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