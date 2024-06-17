document.getElementById('profileForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obter os valores do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const rg = document.getElementById('rg').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const estadoCivil = document.querySelector('select[name="estadocivil"]').value;
    const telefone = document.getElementById('telefone').value;
    const sexo = document.querySelector('input[name="sexo"]:checked').value;
    const rua = document.querySelector('input[name="rua"]').value;
    const numero = document.querySelector('input[name="numero"]').value;
    const bairro = document.querySelector('input[name="bairro"]').value;
    const estado = document.querySelector('select[name="estado"]').value;
    const cidade = document.querySelector('input[name="cidade"]').value;
    const cep = document.querySelector('input[name="cep"]').value;
    const matriculaDetento = document.getElementById('matricula-detento').value;
    const email = document.getElementById('email').value;

    // Criar um objeto de perfil
    const profile = {
        nome,
        cpf,
        rg,
        dataNascimento,
        estadoCivil,
        telefone,
        sexo,
        rua,
        numero,
        bairro,
        estado,
        cidade,
        cep,
        matriculaDetento,
        email
    };

    // Obter perfis existentes no Local Storage
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Adicionar o novo perfil
    profiles.push(profile);

    // Salvar de volta no Local Storage
    localStorage.setItem('profiles', JSON.stringify(profiles));

    // Limpar o formulário
    document.getElementById('profileForm').reset();

    // Atualizar a exibição dos perfis
    displayProfiles();
});

function displayProfiles() {
    const profilesContainer = document.getElementById('profiles');
    profilesContainer.innerHTML = '';

    // Obter perfis do Local Storage
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

    // Criar elementos HTML para cada perfil
    profiles.forEach((profile, index) => {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        const nome = document.createElement('p');
        nome.textContent = `Nome: ${profile.nome}`;

        const cpf = document.createElement('p');
        cpf.textContent = `CPF: ${profile.cpf}`;

        const rg = document.createElement('p');
        rg.textContent = `RG: ${profile.rg}`;

        const dataNascimento = document.createElement('p');
        dataNascimento.textContent = `Data de Nascimento: ${profile.dataNascimento}`;

        const estadoCivil = document.createElement('p');
        estadoCivil.textContent = `Estado Civil: ${profile.estadoCivil}`;

        const telefone = document.createElement('p');
        telefone.textContent = `Telefone: ${profile.telefone}`;

        const sexo = document.createElement('p');
        sexo.textContent = `Sexo: ${profile.sexo}`;

        const endereco = document.createElement('p');
        endereco.textContent = `Endereço: Rua ${profile.rua}, Nº ${profile.numero}, Bairro ${profile.bairro}, ${profile.cidade} - ${profile.estado}, CEP ${profile.cep}`;

        const matriculaDetento = document.createElement('p');
        matriculaDetento.textContent = `Atestado Carcerário: ${profile.matriculaDetento}`;

        const email = document.createElement('p');
        email.textContent = `Email: ${profile.email}`;

        const viewButton = document.createElement('button');
        viewButton.textContent = 'Ver Perfil';
        viewButton.onclick = function() {
            viewProfile(index);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.onclick = function() {
            deleteProfile(index);
        };

        profileDiv.appendChild(nome);
        profileDiv.appendChild(cpf);
        profileDiv.appendChild(rg);
        profileDiv.appendChild(dataNascimento);
        profileDiv.appendChild(estadoCivil);
        profileDiv.appendChild(telefone);
        profileDiv.appendChild(sexo);
        profileDiv.appendChild(endereco);
        profileDiv.appendChild(matriculaDetento);
        profileDiv.appendChild(email);
        profileDiv.appendChild(viewButton);
        profileDiv.appendChild(deleteButton);
        profilesContainer.appendChild(profileDiv);
    });
}

function deleteProfile(index) {
    let profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profiles.splice(index, 1);
    localStorage.setItem('profiles', JSON.stringify(profiles));
    displayProfiles();
}

function viewProfile(index) {
    localStorage.setItem('viewProfileIndex', index);
    window.location.href = '/codigo/pages/perfil/visualizar-perfil-cliente.html';
}

// Exibir perfis ao carregar a página
displayProfiles();
