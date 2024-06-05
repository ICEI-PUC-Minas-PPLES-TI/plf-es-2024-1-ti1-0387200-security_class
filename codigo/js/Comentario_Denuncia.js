document.addEventListener('DOMContentLoaded', function () {
    const commentInput = document.querySelector('.new-comment-section input');
    const commentButton = document.querySelector('.new-comment-section button');
    const commentsSection = document.querySelector('.comments-section');

    // Function to get comments from localStorage
    function getComments() {
        const comments = localStorage.getItem('comments');
        return comments ? JSON.parse(comments) : { comentariosDenuncia: [] };
    }

    // Function to save comments to localStorage
    function saveComments(comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    // Function to render comments
    function renderComments() {
        const commentsData = getComments();
        commentsSection.innerHTML = '<h6>Comentários</h6>';
        commentsData.comentariosDenuncia.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment-card', 'card', 'mb-3');
            const timeElapsed = getTimeElapsed(new Date(comment.dataHora));
            const canEdit = isWithinOneHour(new Date(comment.dataHora));
            commentElement.innerHTML = `
                <div class="card-body d-flex">
                    <img src="../assets/img/Perfil.jpg" alt="Foto de Usuário" class="rounded-circle me-3" width="50" height="50">
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="fw-bold">${comment.autor}</span>
                                <div class="text-muted small">${timeElapsed}</div>
                            </div>
                            <div class="comment-actions d-flex flex-column align-items-end" data-id="${comment.id}">
                                ${canEdit ? '<span class="edit-comment mb-1" style="cursor:pointer; font-size: 16px;">&#9998;</span>' : ''}
                                <div class="comment-likes">
                                    <span>&#10084;</span>
                                    <span>${comment.curtidas}</span>
                                </div>
                            </div>
                        </div>
                        <p class="mb-1">${comment.comentario}</p>
                    </div>
                </div>
            `;
            commentsSection.appendChild(commentElement);
        });

        // Add event listeners for like buttons
        document.querySelectorAll('.comment-likes').forEach(likeButton => {
            likeButton.addEventListener('click', function() {
                const commentId = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                likeComment(commentId);
            });
        });

        // Add event listeners for edit buttons
        document.querySelectorAll('.edit-comment').forEach(editButton => {
            editButton.addEventListener('click', function() {
                const commentId = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                editComment(commentId);
            });
        });

        // Add event listeners for delete buttons
        document.querySelectorAll('.delete-comment').forEach(deleteButton => {
            deleteButton.addEventListener('click', function() {
                const commentId = parseInt(this.closest('.comment-actions').getAttribute('data-id'));
                deleteComment(commentId);
            });
        });
    }

    // Function to add a new comment
    function addComment() {
        if (commentInput.value.trim() === "") return; // Avoid empty comments

        const commentsData = getComments();
        const newComment = {
            id: commentsData.comentariosDenuncia.length + 1,
            idDenuncia: 1, // Ajuste conforme necessário
            autor: "Usuário Atual", 
            dataHora: new Date().toISOString(),
            curtidas: 0,
            comentario: commentInput.value
        };
        commentsData.comentariosDenuncia.push(newComment);
        saveComments(commentsData);
        renderComments();
        commentInput.value = '';
    }

    // Function to like a comment
    function likeComment(commentId) {
        const commentsData = getComments();
        const comment = commentsData.comentariosDenuncia.find(c => c.id === commentId);
        if (comment) {
            comment.curtidas += 1;
            saveComments(commentsData);
            renderComments();
        }
    }

    // Function to edit a comment
    function editComment(commentId) {
        const commentsData = getComments();
        const comment = commentsData.comentariosDenuncia.find(c => c.id === commentId);
        if (comment) {
            const commentElement = document.querySelector(`[data-id="${commentId}"]`).closest('.comment-card');
            const commentTextElement = commentElement.querySelector('p.mb-1');
            const commentLikesElement = commentElement.querySelector('.comment-likes');
            const commentActionsElement = commentElement.querySelector('.comment-actions');
            const editButton = commentActionsElement.querySelector('.edit-comment');

            // Hide the edit button, likes, and show delete icon
            editButton.style.display = 'none';
            commentLikesElement.style.display = 'none';
            if (!commentActionsElement.querySelector('.delete-comment')) {
                const deleteIcon = document.createElement('span');
                deleteIcon.className = 'delete-comment ms-3';
                deleteIcon.style.cursor = 'pointer';
                deleteIcon.style.fontSize = '16px';
                deleteIcon.innerHTML = '&#128465;';
                commentActionsElement.appendChild(deleteIcon);
                deleteIcon.addEventListener('click', function () {
                    deleteComment(commentId);
                });
            }

            // Create an input field to edit the comment
            const inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.className = 'form-control';
            inputField.value = comment.comentario;

            // Replace the comment text with the input field
            commentTextElement.replaceWith(inputField);

            // Add an event listener to save the edited comment
            inputField.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    comment.comentario = inputField.value;
                    saveComments(commentsData);
                    renderComments();
                }
            });

            // Add an event listener to save the edited comment on blur
            inputField.addEventListener('blur', function () {
                comment.comentario = inputField.value;
                saveComments(commentsData);
                renderComments();
            });
        }
    }

    // Function to delete a comment
    function deleteComment(commentId) {
        const commentsData = getComments();
        commentsData.comentariosDenuncia = commentsData.comentariosDenuncia.filter(c => c.id !== commentId);
        saveComments(commentsData);
        renderComments();
    }

    // Function to calculate time elapsed
    function getTimeElapsed(postDate) {
        const now = new Date();
        const elapsed = now - postDate; // time in milliseconds

        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4.35);
        const years = Math.floor(months / 12);

        if (years > 0) return years + ' ano(s) atrás';
        if (months > 0) return months + ' mês(es) atrás';
        if (weeks > 0) return weeks + ' semana(s) atrás';
        if (days > 0) return days + ' dia(s) atrás';
        if (hours > 0) return hours + ' hora(s) atrás';
        if (minutes > 0) return minutes + ' minuto(s) atrás';
        return seconds + ' segundo(s) atrás';
    }

    // Function to check if a comment was posted within the last hour
    function isWithinOneHour(postDate) {
        const now = new Date();
        const elapsed = now - postDate; // time in milliseconds
        const oneHour = 1000 * 60 * 60;
        return elapsed < oneHour;
    }

    // Event listener for adding a comment with button
    commentButton.addEventListener('click', addComment);

    // Event listener for adding a comment with Enter key
    commentInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addComment();
        }
    });

    // Initial render
    renderComments();

    // Update time elapsed every minute
    setInterval(renderComments, 60000);
});