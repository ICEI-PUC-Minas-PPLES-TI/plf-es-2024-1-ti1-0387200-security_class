document.addEventListener('DOMContentLoaded', function() {
    const profileIndex = localStorage.getItem('viewProfileIndex');
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    const profile = profiles[profileIndex];

    if (profile) {
        const profileContainer = document.getElementById('profile');

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

        profileContainer.appendChild(nome);
        profileContainer.appendChild(cpf);
        profileContainer.appendChild(rg);
        profileContainer.appendChild(dataNascimento);
        profileContainer.appendChild(estadoCivil);
        profileContainer.appendChild(telefone);
        profileContainer.appendChild(sexo);
        profileContainer.appendChild(endereco);
        profileContainer.appendChild(matriculaDetento);
        profileContainer.appendChild(email);
    } else {
        alert('Perfil não encontrado');
        window.location.href = 'cadastro.html';
    }
});
