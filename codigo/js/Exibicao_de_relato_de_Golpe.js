document.addEventListener("DOMContentLoaded", async function () {
    let allPosts = [];
    let comentarios = [];
    const searchInput = document.getElementById("searchInput");
    const forumCards = document.getElementById("forumCards");
    const commentList = document.getElementById('commentList');
    const botaoComentario = document.getElementById('botaoComentario');
    const entradaComentario = document.getElementById('entradaComentario');
    const postTitle = document.getElementById('postTitle');
    const postDescription = document.getElementById('postDescription');
    const postLink = document.getElementById('postLink');

    const usuarioAtual = verificarLogin();
    let idPostAtual = '';

    try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
            throw new Error("Erro ao carregar posts");
        }
        allPosts = await response.json();
        displayPosts(allPosts);
    } catch (error) {
        console.error("Erro ao carregar posts:", error);
    }

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

    function displayPosts(posts) {
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
                const post = posts.find(p => p.id == postId);
                if (post) {
                    displayPostDetails(post);
                }
            });
        });
    }

    function displayPostDetails(post) {
        if (!postTitle || !postDescription || !postLink) {
            console.error("Elemento(s) do post não encontrado(s).");
            return;
        }
        postTitle.innerText = post.titulo;
        postDescription.innerText = post.descricao;
        postLink.href = post.link;
        postLink.innerText = post.link;

        fetchComentarios(post.id);
        idPostAtual = post.id;

        new bootstrap.Modal(document.getElementById('postModal')).show();
    }

    async function fetchComentarios(postId) {
        try {
            const response = await fetch(`http://localhost:3000/comentariosDenuncia?idDenuncia=${postId}`);
            if (!response.ok) {
                throw new Error("Erro ao carregar comentários");
            }
            comentarios = await response.json();
            renderizarComentarios(comentarios);
        } catch (error) {
            console.error("Erro ao carregar comentários:", error);
        }
    }

    function renderizarComentarios(comentarios) {
        if (!commentList) {
            console.error("Elemento #commentList não encontrado.");
            return;
        }
        commentList.innerHTML = '<h6>Comentários</h6>';

        if (!Array.isArray(comentarios)) {
            console.error("Dados de comentários inválidos:", comentarios);
            return;
        }

        comentarios.forEach(comentario => {
            const elementoComentario = document.createElement('div');
            elementoComentario.classList.add('comment-card', 'card', 'mb-3');

            const dataHora = new Date(comentario.dataHora).toLocaleString(); // Formatar a data para exibição

            elementoComentario.innerHTML = `
                <div class="card-body d-flex">
                    <img src="../assets/IMG/Perfil.jpg" alt="Foto de Usuário" class="rounded-circle me-3" width="50" height="50">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="fw-bold">${comentario.nickname}</span>
                                <div class="text-muted small">${dataHora}</div>
                            </div>
                            <div class="comment-actions d-flex flex-column align-items-end" data-id="${comentario.id}">
                                <div class="comment-likes" style="cursor: pointer;">
                                    <span>&#10084;</span>
                                    <span>${comentario.curtidas} likes</span>
                                </div>
                                <div class="comment-actions mt-1">
                                    <button type="button" class="btn btn-outline-primary btn-sm edit-comment">&#9998;</button>
                                    <button type="button" class="btn btn-outline-danger btn-sm delete-comment">&#10060;</button>
                                </div>
                            </div>
                        </div>
                        <p class="mb-1">${comentario.comentario}</p>
                    </div>
                </div>
            `;

            commentList.appendChild(elementoComentario);

            elementoComentario.querySelector('.comment-likes').addEventListener('click', function () {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                curtirComentario(idComentario);
            });

            elementoComentario.querySelector('.edit-comment').addEventListener('click', function () {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                iniciarEdicaoComentario(idComentario);
            });

            elementoComentario.querySelector('.delete-comment').addEventListener('click', function () {
                const idComentario = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                deletarComentario(idComentario);
            });
        });

        if (entradaComentario) {
            entradaComentario.value = '';
        } else {
            console.error("Elemento entradaComentario não encontrado.");
        }
    }

    async function curtirComentario(idComentario) {
        try {
            const response = await fetch(`http://localhost:3000/comentariosDenuncia/${idComentario}`);
            if (!response.ok) {
                throw new Error('Erro ao obter comentário para curtir');
            }
            const comentario = await response.json();
            comentario.curtidas += 1;
            await editarComentario(comentario);
        } catch (error) {
            console.error('Erro ao curtir comentário:', error);
        }
    }

    async function editarComentario(comentario) {
        try {
            const response = await fetch(`http://localhost:3000/comentariosDenuncia/${comentario.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comentario),
            });
            if (!response.ok) {
                throw new Error('Erro ao editar comentário');
            }
            const updatedComentario = await response.json();
            console.log('Comentário editado com sucesso:', updatedComentario);
            fetchComentarios(idPostAtual);
        } catch (error) {
            console.error('Erro ao editar comentário:', error);
        }
    }

    async function deletarComentario(idComentario) {
        try {
            const response = await fetch(`http://localhost:3000/comentariosDenuncia/${idComentario}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Erro ao deletar comentário');
            }
            console.log('Comentário deletado com sucesso');
            fetchComentarios(idPostAtual);
        } catch (error) {
            console.error('Erro ao deletar comentário:', error);
        }
    }

    function iniciarEdicaoComentario(idComentario) {
        const comentario = comentarios.find(c => c.id === idComentario);
        if (comentario) {
            entradaComentario.value = comentario.comentario;
            botaoComentario.textContent = 'Salvar';
            botaoComentario.onclick = async function () {
                comentario.comentario = entradaComentario.value;
                await editarComentario(comentario);
                entradaComentario.value = '';
                botaoComentario.textContent = 'Comentar';
                botaoComentario.onclick = adicionarComentario;
            };
        } else {
            console.error('Comentário não encontrado para edição');
        }
    }

    if (botaoComentario) {
        botaoComentario.addEventListener('click', async function adicionarComentario(event) {
            event.preventDefault();

            if (!entradaComentario.value) {
                console.error('O comentário não pode estar vazio');
                return;
            }

            const novoComentario = {
                id: Date.now().toString(),
                idDenuncia: idPostAtual,
                nickname: usuarioAtual,
                comentario: entradaComentario.value,
                curtidas: 0,
                dataHora: new Date().toISOString()
            };

            try {
                const response = await fetch('http://localhost:3000/comentariosDenuncia', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoComentario)
                });
                if (!response.ok) {
                    throw new Error('Erro ao enviar comentário');
                }
                const comentarioCriado = await response.json();
                renderizarComentarios([comentarioCriado, ...comentarios]);
                entradaComentario.value = '';
            } catch (error) {
                console.error('Erro ao enviar comentário:', error);
            }
        });
    } else {
        console.error("Elemento botaoComentario não encontrado.");
    }

    function verificarLogin() {
        const usuario = localStorage.getItem('usuarioAtual');
        if (usuario) {
            return usuario;
        } else {
            console.error("Usuário não está logado.");
            return null;
        }
    }
});