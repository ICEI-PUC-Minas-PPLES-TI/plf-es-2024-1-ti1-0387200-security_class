function Insights(){
    window.location.href = "../views/painel_analitico.html"
}
function Post(){
    window.location.href = "../views/Cadastro_de_relato_de_golpe.html"
}
document.addEventListener("DOMContentLoaded", async function () {
    let allPosts = [];
    try {
        const response = await fetch("http://localhost:3000/posts");
        if (!response.ok) {
            throw new Error("Erro ao carregar posts");
        }
        allPosts = await response.json();
        displayPosts(allPosts);

        // Event listener for search input
        const searchInput = document.getElementById("searchInput");
        searchInput.addEventListener("input", function () {
            const query = this.value.toLowerCase();
            const filteredPosts = allPosts.filter(post => 
                post.titulo.toLowerCase().includes(query) || 
                post.descricao.toLowerCase().includes(query)
            );
            displayPosts(filteredPosts);
        });
    } catch (error) {
        console.error("Erro ao carregar posts:", error);
    }

    function displayPosts(posts) {
        const forumCards = document.getElementById("forumCards");
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

        // Add event listener for cards to open modal with full post details
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', function () {
                const postId = this.getAttribute('data-post-id');
                const post = posts.find(p => p.id == postId);
                if (post) {
                    document.getElementById('modalTitulo').innerText = post.titulo;
                    document.getElementById('modalDescricao').innerText = post.descricao;
                    document.getElementById('modalTipoGolpe').innerText = post.tipoGolpe;
                    document.getElementById('modalLink').href = post.link;
                    document.getElementById('modalLink').innerText = post.link;
                    document.getElementById('modalDataPost').innerText = new Date(post.dataPost).toLocaleDateString();
                    document.getElementById('modalLocalizacao').innerText = post.localizacao;
                }
            });
        });
    }
});
function verificarLogin() {
    const user = sessionStorage.getItem("user");
    if (!user) {
      window.location.href = "../views/login.html";
    }
  }
  
document.addEventListener("DOMContentLoaded", function () {
    verificarLogin(); 
  
});