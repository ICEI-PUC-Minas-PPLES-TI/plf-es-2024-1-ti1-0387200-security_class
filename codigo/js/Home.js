console.log("Servidor JSON rodando com json-server.");
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('linkCheckerForm');
    const linkInput = document.getElementById('linkInput');
    const linkCheckerResult = document.getElementById('linkCheckerResult');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const link = linkInput.value;

        // Verifique o link contra a lista de posts (a ser substituído pelo JSON Server)
        fetch('http://localhost:3000/posts')
            .then(response => response.json())
            .then(posts => {
                const found = posts.some(post => post.link === link);

                if (found) {
                    linkCheckerResult.innerHTML = '<div class="alert alert-danger">O link não é confiavel, a relato de fraudes nele.</div>';
                } else {
                    linkCheckerResult.innerHTML = '<div class="alert alert-success ">O link não possui relato de golpes.</div>';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                linkCheckerResult.innerHTML = '<div class="alert alert-danger">Ocorreu um erro ao verificar o link.</div>';
            });
    });
});
