document.addEventListener("DOMContentLoaded", async function () {
    let allPosts = [];

    try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
            throw new Error("Erro ao carregar posts");
        }
        allPosts = await response.json();
        displayPosts(allPosts);

        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", function () {
                const query = this.value.toLowerCase();
                const filteredPosts = allPosts.filter(post =>
                    post.titulo.toLowerCase().includes(query) ||
                    post.descricao.toLowerCase().includes(query)
                );
                displayPosts(filteredPosts);
            });
        } else {
            console.error("Elemento searchInput não encontrado.");
        }
    } catch (error) {
        console.error("Erro ao carregar posts:", error);
    }

    function displayPosts(posts) {
        const forumCards = document.getElementById("forumCards");
        if (!forumCards) {
            console.error("Elemento forumCards não encontrado.");
            return;
        }
        forumCards.innerHTML = "";
        posts.forEach(post => {
            if (post.publico) {
                const card = `
                    <div class="col-md-4 mb-4">
                        <div class="card" data-bs-toggle="modal" data-bs-target="#postModal" data-post-id="${post.id}">
                            <div class="card-body">
                                <h5 class="card-title">${post.titulo}</h5>
                                <p class="card-text">${post.descricao.substring(0, 100)}...</p>
                                <p class="card-text"><small class="text-muted">Por: ${post.nickname}</small></p>
                            </div>
                        </div>
                    </div>
                `;
                forumCards.innerHTML += card;
            }
        });

        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function () {
                const postId = this.getAttribute('data-post-id');
                const post = posts.find(p => p.id === postId);
                if (post) {
                    displayPostDetails(post);
                }
            });
        });
    }

    function displayPostDetails(post) {
        document.getElementById('postTitle').innerText = post.titulo;
        document.getElementById('postDescription').innerText = post.descricao;
        document.getElementById('postLink').href = post.link;
        document.getElementById('postLink').innerText = post.link;

        // Verifica se 'comentarios' existe e é um array
        if (Array.isArray(post.comentarios)) {
            renderizarComentarios(post.comentarios);
        } else {
            console.warn('O post não possui comentários válidos:', post.comentarios);
            renderizarComentarios([]);
        }

        // Atualiza o ID do post atual para uso na adição de comentários
        idPostAtual = post.id;

        new bootstrap.Modal(document.getElementById('postModal')).show();
    }

    function renderizarComentarios(comentarios) {
        const commentList = document.getElementById('commentList');
        if (!commentList) {
            console.error("Elemento #commentList não encontrado.");
            return;
        }
        commentList.innerHTML = '<h6>Comentários</h6>';

        // Verifica se 'comentarios' é um array
        if (!Array.isArray(comentarios)) {
            console.error("Dados de comentários inválidos:", comentarios);
            return;
        }

        comentarios.forEach(comentario => {
            const elementoComentario = document.createElement('div');
            elementoComentario.classList.add('comment-card', 'card', 'mb-3');

            // Transformando a data para um formato de data JS
            const dataHora = new Date(comentario.dataHora);

            const tempoDecorrido = obterTempoDecorrido(dataHora);
            const jaCurtiu = comentario.curtidas && comentario.curtidas.includes(usuarioAtual);

            elementoComentario.innerHTML = `
                <div class="card-body d-flex">
                    <img src="../assets/IMG/Perfil.jpg" alt="Foto de Usuário" class="rounded-circle me-3" width="50" height="50">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="fw-bold">${comentario.nickname}</span>
                                <div class="text-muted small">${tempoDecorrido}</div>
                            </div>
                            <div class="comment-actions d-flex flex-column align-items-end" data-id="${comentario.id}">
                                <div class="comment-likes" style="cursor: pointer;">
                                    <span>&#10084;</span>
                                    <span>${comentario.curtidas}</span>
                                </div>
                                <div class="comment-actions mt-1">
                                    <button type="button" class="btn btn-outline-primary btn-sm edit-comment">Editar</button>
                                    <button type="button" class="btn btn-outline-danger btn-sm delete-comment">Excluir</button>
                                </div>
                            </div>
                        </div>
                        <p class="mb-1">${comentario.comentario}</p>
                    </div>
                </div>
            `;

            commentList.appendChild(elementoComentario);

            if (jaCurtiu) {
                const botaoCurtir = elementoComentario.querySelector('.comment-likes');
                botaoCurtir.style.cursor = 'not-allowed';
                botaoCurtir.style.color = 'grey';
            }

            // Event listener para curtir comentário
            elementoComentario.querySelector('.comment-likes').addEventListener('click', function () {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                curtirComentario(idComentario);
            });

            // Event listener para editar comentário
            elementoComentario.querySelector('.edit-comment').addEventListener('click', function () {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                editarComentario(idComentario);
            });

            // Event listener para deletar comentário
            elementoComentario.querySelector('.delete-comment').addEventListener('click', function () {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                deletarComentario(idComentario, comentario.idDenuncia); // Utiliza o idDenuncia do comentário atual para deletar
            });

        });

        // Event listener para o botão de comentário
        const botaoComentario = document.getElementById('botaoComentario');
        if (botaoComentario) {
            botaoComentario.addEventListener('click', adicionarComentario);
        } else {
            console.error("Elemento botaoComentario não encontrado.");
        }

        // Event listener para o campo de entrada de comentário
        const entradaComentario = document.getElementById('entradaComentario');
        if (entradaComentario) {
            entradaComentario.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    adicionarComentario();
                }
            });
        } else {
            console.error("Elemento entradaComentario não encontrado.");
        }
    }

    function curtirComentario(idComentario) {
        fetch(`http://localhost:3000/comentarios/${idComentario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter comentário para curtir');
                }
                return response.json();
            })
            .then(comentario => {
                if (!comentario.usuariosQueCurtiram.includes(usuarioAtual)) {
                    comentario.curtidas += 1;
                    comentario.usuariosQueCurtiram.push(usuarioAtual);
                    editarComentario(comentario);
                } else {
                    console.log('Você já curtiu este comentário.');
                }
            })
            .catch(error => {
                console.error('Erro ao curtir comentário:', error);
            });
    }

    function editarComentario(comentario) {
        fetch(`http://localhost:3000/comentarios/${comentario.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comentario),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao editar comentário');
                }
                return response.json();
            })
            .then(updatedComentario => {
                console.log('Comentário editado com sucesso:', updatedComentario);
                // Aqui você pode atualizar a interface se necessário
            })
            .catch(error => {
                console.error('Erro ao editar comentário:', error);
            });
    }

    function deletarComentario(idComentario, idDenuncia) {
        fetch(`http://localhost:3000/comentarios/${idComentario}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao deletar comentário');
                }
                console.log('Comentário deletado com sucesso.');
                // Remova o comentário da interface, se necessário
            })
            .catch(error => {
                console.error('Erro ao deletar comentário:', error);
            });
    }

    function obterTempoDecorrido(data) {
        const agora = new Date();
        const decorrido = agora - data;
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

    // Função para adicionar um novo comentário
    function adicionarComentario() {
        const entradaComentario = document.getElementById('entradaComentario');
        if (!entradaComentario || entradaComentario.value.trim() === "") return;

        const novoComentario = {
            idDenuncia: idPostAtual,
            nickname: usuarioAtual,
            dataHora: new Date().toISOString(),
            curtidas: 0,
            comentario: entradaComentario.value,
            usuariosQueCurtiram: []
        };

        salvarComentario(novoComentario);
        entradaComentario.value = '';
    }

    // Função para salvar o novo comentário no servidor
    async function salvarComentario(comentario) {
        try {
            const response = await fetch('http://localhost:3000/comentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comentario),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar comentário');
            }

            const novoComentario = await response.json();
            console.log('Comentário salvo com sucesso:', novoComentario);

            // Atualiza a interface para refletir o novo comentário
            const postIndex = allPosts.findIndex(post => post.id === idPostAtual);
            if (postIndex !== -1) {
                allPosts[postIndex].comentarios.push(novoComentario);
                renderizarComentarios(allPosts[postIndex].comentarios);
            } else {
                console.error('Post não encontrado para adicionar o comentário.');
            }
        } catch (error) {
            console.error('Erro ao salvar comentário:', error);
        }
    }

    // Função para verificar se o usuário está logado
    function verificarLogin() {
        const user = sessionStorage.getItem("user");
        if (!user) {
            window.location.href = "../views/login.html";
        }
        return user; // Retorna o usuário atual para uso em outras partes do código
    }

    // Obtém o usuário atual logado
    const usuarioAtual = verificarLogin();

    // ID do post atual, inicialmente vazio até que um post seja selecionado
    let idPostAtual = '';

    // Event listener para o botão de comentário
    const botaoComentario = document.getElementById('botaoComentario');
    if (botaoComentario) {
        botaoComentario.addEventListener('click', adicionarComentario);
    } else {
        console.error("Elemento botaoComentario não encontrado.");
    }

    // Event listener para o campo de entrada de comentário
    const entradaComentario = document.getElementById('entradaComentario');
    if (entradaComentario) {
        entradaComentario.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                adicionarComentario();
            }
        });
    } else {
        console.error("Elemento entradaComentario não encontrado.");
    }
});



