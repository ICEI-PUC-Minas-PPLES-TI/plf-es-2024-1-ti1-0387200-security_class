document.addEventListener('DOMContentLoaded', () => {
    function loadProfileSelector() {
        const profileSelector = document.getElementById('profileSelectorCliente');
        let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];

        storedData.forEach((data, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = data['nome'] || `Perfil ${index + 1}`;
            profileSelector.appendChild(option);
        });

        profileSelector.addEventListener('change', displaySelectedProfile);
    }

    function displaySelectedProfile() {
        const profileSelector = document.getElementById('profileSelectorCliente');
        const selectedIndex = profileSelector.value;
        let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        const selectedProfile = storedData[selectedIndex];

        const profileDiv = document.getElementById('profileDetailsCliente');
        profileDiv.innerHTML = formatFormData(selectedProfile);

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-secondary mt-3';
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editProfile(selectedIndex));
        profileDiv.appendChild(editButton);
    }

    function formatFormData(data) {
        return `
            <p><strong>Nome:</strong> ${data['nome']}</p>
            <p><strong>Data de Nascimento:</strong> ${data['data-nascimento']}</p>
            <p><strong>Sexo:</strong> ${data['sexo']}</p>
            <p><strong>CPF:</strong> ${data['cpf']}</p>
            <p><strong>Atestado Carcerário:</strong> ${data['matricula-detento']}</p>
            <p><strong>Rua:</strong> ${data['rua']}</p>
            <p><strong>Número:</strong> ${data['numero']}</p>
            <p><strong>Bairro:</strong> ${data['bairro']}</p>
            <p><strong>Cidade:</strong> ${data['cidade']}</p>
            <p><strong>Estado:</strong> ${data['estado']}</p>
            <p><strong>CEP:</strong> ${data['cep']}</p>
            <p><strong>Email:</strong> ${data['email']}</p>
        `;
    }

    function editProfile(index) {
        let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        const selectedProfile = storedData[index];

        const profileDiv = document.getElementById('profileDetailsCliente');
        profileDiv.innerHTML = `
            <div class="mb-3">
              <label class="form-label">Nome:</label>
              <input type="text" class="form-control" id="editNome" value="${selectedProfile['nome']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Data de Nascimento:</label>
              <input type="date" class="form-control" id="editDataNascimento" value="${selectedProfile['data-nascimento']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Sexo:</label>
              <input type="text" class="form-control" id="editSexo" value="${selectedProfile['sexo']}">
            </div>
            <div class="mb-3">
              <label class="form-label">CPF:</label>
              <input type="text" class="form-control" id="editCPF" value="${selectedProfile['cpf']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Atestado Carcerário:</label>
              <input type="text" class="form-control" id="editMatriculaDetento" value="${selectedProfile['matricula-detento']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Rua:</label>
              <input type="text" class="form-control" id="editRua" value="${selectedProfile['rua']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Número:</label>
              <input type="text" class="form-control" id="editNumero" value="${selectedProfile['numero']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Bairro:</label>
              <input type="text" class="form-control" id="editBairro" value="${selectedProfile['bairro']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Cidade:</label>
              <input type="text" class="form-control" id="editCidade" value="${selectedProfile['cidade']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Estado:</label>
              <input type="text" class="form-control" id="editEstado" value="${selectedProfile['estado']}">
            </div>
            <div class="mb-3">
              <label class="form-label">CEP:</label>
              <input type="text" class="form-control" id="editCep" value="${selectedProfile['cep']}">
            </div>
            <div class="mb-3">
              <label class="form-label">Email:</label>
              <input type="email" class="form-control" id="editEmail" value="${selectedProfile['email']}">
            </div>
            <button id="saveButton" class="btn btn-primary">Salvar</button>
            <button id="deleteButton" class="btn btn-danger">Deletar</button>
        `;

        document.getElementById('deleteButton').addEventListener('click', () => deleteProfile(index));

        document.getElementById('saveButton').addEventListener('click', () => {
            selectedProfile['nome'] = document.getElementById('editNome').value;
            selectedProfile['data-nascimento'] = document.getElementById('editDataNascimento').value;
            selectedProfile['sexo'] = document.getElementById('editSexo').value;
            selectedProfile['cpf'] = document.getElementById('editCPF').value;
            selectedProfile['matricula-detento'] = document.getElementById('editMatriculaDetento').value;
            selectedProfile['rua'] = document.getElementById('editRua').value;
            selectedProfile['numero'] = document.getElementById('editNumero').value;
            selectedProfile['bairro'] = document.getElementById('editBairro').value;
            selectedProfile['cidade'] = document.getElementById('editCidade').value;
            selectedProfile['estado'] = document.getElementById('editEstado').value;
            selectedProfile['cep'] = document.getElementById('editCep').value;
            selectedProfile['email'] = document.getElementById('editEmail').value;

            storedData[index] = selectedProfile;
            localStorage.setItem('cadastroClientes', JSON.stringify(storedData));

            displaySelectedProfile();
        });
    }

    loadProfileSelector();
    displaySelectedProfile(); // Carrega o primeiro perfil por padrão
});
