document.addEventListener('DOMContentLoaded', () => {
    // Seletores de perfil
    const profileSelectorCliente = document.getElementById('profileSelectorCliente');
    const profileDetailsCliente = document.getElementById('profileDetailsCliente');
    const profileFormCliente = document.getElementById('profileFormCliente');

    const profileSelectorEmpregador = document.getElementById('profileSelectorEmpregador');
    const profileDetailsEmpregador = document.getElementById('profileDetailsEmpregador');
    const profileFormEmpregador = document.getElementById('profileFormEmpregador');

    const profileSelectorOficial = document.getElementById('profileSelectorOficial');
    const profileDetailsOficial = document.getElementById('profileDetailsOficial');
    const profileFormOficial = document.getElementById('profileFormOficial');

    // Funções de carregamento de perfis
    function loadProfiles(tipo) {
        const storedData = JSON.parse(localStorage.getItem(tipo)) || [];
        let profileSelector;
        if (tipo === 'cadastroClientes') profileSelector = profileSelectorCliente;
        else if (tipo === 'cadastroEmpregadores') profileSelector = profileSelectorEmpregador;
        else if (tipo === 'cadastroOficiais') profileSelector = profileSelectorOficial;
        profileSelector.innerHTML = '';

        storedData.forEach((data, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = data['nome'] || `Perfil ${index + 1}`;
            profileSelector.appendChild(option);
        });

        if (storedData.length > 0) {
            profileSelector.value = 0;
            if (tipo === 'cadastroClientes') displayProfileDetailsCliente(0);
            else if (tipo === 'cadastroEmpregadores') displayProfileDetailsEmpregador(0);
            else if (tipo === 'cadastroOficiais') displayProfileDetailsOficial(0);
        } else {
            if (tipo === 'cadastroClientes') profileDetailsCliente.innerHTML = '<p>Nenhum perfil encontrado.</p>';
            else if (tipo === 'cadastroEmpregadores') profileDetailsEmpregador.innerHTML = '<p>Nenhum perfil encontrado.</p>';
            else if (tipo === 'cadastroOficiais') profileDetailsOficial.innerHTML = '<p>Nenhum perfil encontrado.</p>';
        }
    }

    // Funções de exibição de detalhes de perfil
    function displayProfileDetailsCliente(index) {
        const storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];
        const profile = storedData[index];

        if (profile) {
            profileDetailsCliente.innerHTML = formatProfileDataCliente(profile);
            profileFormCliente.innerHTML = generateEditFormCliente(profile, index);
        }
    }

    function displayProfileDetailsEmpregador(index) {
        const storedData = JSON.parse(localStorage.getItem('cadastroEmpregadores')) || [];
        const profile = storedData[index];

        if (profile) {
            profileDetailsEmpregador.innerHTML = formatProfileDataEmpregador(profile);
            profileFormEmpregador.innerHTML = generateEditFormEmpregador(profile, index);
        }
    }

    function displayProfileDetailsOficial(index) {
        const storedData = JSON.parse(localStorage.getItem('cadastroOficiais')) || [];
        const profile = storedData[index];

        if (profile) {
            profileDetailsOficial.innerHTML = formatProfileDataOficial(profile);
            profileFormOficial.innerHTML = generateEditFormOficial(profile, index);
        }
    }

    // Funções de formatação de dados de perfil
    function formatProfileDataCliente(data) {
        return `
            <p><strong>Nome:</strong> ${data['nome']}</p>
            <p><strong>Data de Nascimento:</strong> ${data['data-nascimento']}</p>
            <p><strong>Sexo:</strong> ${data['sexo']}</p>
            <p><strong>CPF:</strong> ${data['cpf']}</p>
            <p><strong>Atestado Carcerário:</strong> ${data['matricula-detento']}</p>
            <p><strong>Estado:</strong> ${data['cidade']}/${data['estado']}</p>
            <p><strong>Email:</strong> ${data['email']}</p>
        `;
    }

    function formatProfileDataEmpregador(data) {
        return `
            <p><strong>Razão Social:</strong> ${data['razao-social']}</p>
            <p><strong>CNPJ:</strong> ${data['cnpj']}</p>
            <p><strong>CNAE:</strong> ${data['cnae']}</p>
            <p><strong>Endereço:</strong> ${data['rua']}, ${data['numero']}, ${data['bairro']}, ${data['cidade']}, ${data['estado']} - ${data['cep']}</p>
            <p><strong>Email:</strong> ${data['email']}</p>
        `;
    }

    function formatProfileDataOficial(data) {
        return `
            <p><strong>Nome:</strong> ${data['nome']}</p>
            <p><strong>Carteira Funcional:</strong> ${data['carteira-funcional']}</p>
            <p><strong>Data de Nascimento:</strong> ${data['data-nascimento']}</p>
            <p><strong>Telefone:</strong> ${data['telefone']}</p>
            <p><strong>Sexo:</strong> ${data['sexo']}</p>
            <p><strong>Endereço:</strong> ${data['rua']}, ${data['numero']}, ${data['bairro']}, ${data['cidade']}, ${data['estado']} - ${data['cep']}</p>
            <p><strong>Email:</strong> ${data['email']}</p>
        `;
    }

    // Funções de geração de formulários de edição
    function generateEditFormCliente(data, index) {
        document.getElementById('saveButtonCliente').addEventListener('click', () => saveProfile('cadastroClientes', index));
        document.getElementById('deleteButtonCliente').addEventListener('click', () => deleteProfile('cadastroClientes', index));

        return `
            <label>Nome: <input type="text" id="editNomeCliente" value="${data['nome']}"></label><br>
            <label>Data de Nascimento: <input type="date" id="editDataNascimentoCliente" value="${data['data-nascimento']}"></label><br>
            <label>Sexo: <input type="text" id="editSexoCliente" value="${data['sexo']}"></label><br>
            <label>CPF: <input type="text" id="editCPFCliente" value="${data['cpf']}"></label><br>
            <label>Atestado Carcerário: <input type="text" id="editMatriculaDetentoCliente" value="${data['matricula-detento']}"></label><br>
            <label>Estado: <input type="text" id="editCidadeCliente" value="${data['cidade']}"><input type="text" id="editEstadoCliente" value="${data['estado']}"></label><br>
            <label>Email: <input type="text" id="editEmailCliente" value="${data['email']}"></label><br>
            <button id="saveButtonCliente">Salvar</button>
            <button id="deleteButtonCliente">Deletar</button>
        `;

        
    }

    function generateEditFormEmpregador(data, index) {
        document.getElementById('saveButtonEmpregador').addEventListener('click', () => saveProfile('cadastroEmpregadores', index));
        document.getElementById('deleteButtonEmpregador').addEventListener('click', () => deleteProfile('cadastroEmpregadores', index));

        return `
            <label>Razão Social: <input type="text" id="editRazaoSocialEmpregador" value="${data['razao-social']}"></label><br>
            <label>CNPJ: <input type="text" id="editCNPJEmpregador" value="${data['cnpj']}"></label><br>
            <label>CNAE: <input type="text" id="editCNAEEmpregador" value="${data['cnae']}"></label><br>
            <label>Endereço: <input type="text" id="editRuaEmpregador" value="${data['rua']}"><input type="text" id="editNumeroEmpregador" value="${data['numero']}"><input type="text" id="editBairroEmpregador" value="${data['bairro']}"><input type="text" id="editCidadeEmpregador" value="${data['cidade']}"><input type="text" id="editEstadoEmpregador" value="${data['estado']}"><input type="text" id="editCEPEmpregador" value="${data['cep']}"></label><br>
            <label>Email: <input type="text" id="editEmailEmpregador" value="${data['email']}"></label><br>
            <button id="saveButtonEmpregador">Salvar</button>
            <button id="deleteButtonEmpregador">Deletar</button>
        `;
    }

    function generateEditFormOficial(data, index) {
        document.getElementById('saveButtonOficial').addEventListener('click', () => saveProfile('cadastroOficiais', index));
        document.getElementById('deleteButtonOficial').addEventListener('click', () => deleteProfile('cadastroOficiais', index));
        
        return `
            <label>Nome: <input type="text" id="editNomeOficial" value="${data['nome']}"></label><br>
            <label>Carteira Funcional: <input type="text" id="editCarteiraFuncionalOficial" value="${data['carteira-funcional']}"></label><br>
            <label>Data de Nascimento: <input type="date" id="editDataNascimentoOficial" value="${data['data-nascimento']}"></label><br>
            <label>Telefone: <input type="text" id="editTelefoneOficial" value="${data['telefone']}"></label><br>
            <label>Sexo: <input type="text" id="editSexoOficial" value="${data['sexo']}"></label><br>
            <label>Endereço: <input type="text" id="editRuaOficial" value="${data['rua']}"><input type="text" id="editNumeroOficial" value="${data['numero']}"><input type="text" id="editBairroOficial" value="${data['bairro']}"><input type="text" id="editCidadeOficial" value="${data['cidade']}"><input type="text" id="editEstadoOficial" value="${data['estado']}"><input type="text" id="editCEPOficial" value="${data['cep']}"></label><br>
            <label>Email: <input type="text" id="editEmailOficial" value="${data['email']}"></label><br>
            <button id="saveButtonOficial">Salvar</button>
            <button id="deleteButtonOficial">Deletar</button>
        `;
    }

    // Funções de salvamento e exclusão de perfis
    function saveProfile(tipo, index) {
        const storedData = JSON.parse(localStorage.getItem(tipo)) || [];
        let profile;
        if (tipo === 'cadastroClientes') {
            profile = {
                'nome': document.getElementById('editNomeCliente').value,
                'data-nascimento': document.getElementById('editDataNascimentoCliente').value,
                'sexo': document.getElementById('editSexoCliente').value,
                'cpf': document.getElementById('editCPFCliente').value,
                'matricula-detento': document.getElementById('editMatriculaDetentoCliente').value,
                'cidade': document.getElementById('editCidadeCliente').value,
                'estado': document.getElementById('editEstadoCliente').value,
                'email': document.getElementById('editEmailCliente').value
            };
        } else if (tipo === 'cadastroEmpregadores') {
            profile = {
                'razao-social': document.getElementById('editRazaoSocialEmpregador').value,
                'cnpj': document.getElementById('editCNPJEmpregador').value,
                'cnae': document.getElementById('editCNAEEmpregador').value,
                'rua': document.getElementById('editRuaEmpregador').value,
                'numero': document.getElementById('editNumeroEmpregador').value,
                'bairro': document.getElementById('editBairroEmpregador').value,
                'cidade': document.getElementById('editCidadeEmpregador').value,
                'estado': document.getElementById('editEstadoEmpregador').value,
                'cep': document.getElementById('editCEPEmpregador').value,
                'email': document.getElementById('editEmailEmpregador').value
            };
        } else if (tipo === 'cadastroOficiais') {
            profile = {
                'nome': document.getElementById('editNomeOficial').value,
                'carteira-funcional': document.getElementById('editCarteiraFuncionalOficial').value,
                'data-nascimento': document.getElementById('editDataNascimentoOficial').value,
                'telefone': document.getElementById('editTelefoneOficial').value,
                'sexo': document.getElementById('editSexoOficial').value,
                'rua': document.getElementById('editRuaOficial').value,
                'numero': document.getElementById('editNumeroOficial').value,
                'bairro': document.getElementById('editBairroOficial').value,
                'cidade': document.getElementById('editCidadeOficial').value,
                'estado': document.getElementById('editEstadoOficial').value,
                'cep': document.getElementById('editCEPOficial').value,
                'email': document.getElementById('editEmailOficial').value
            };
        }
        storedData[index] = profile;
        localStorage.setItem(tipo, JSON.stringify(storedData));
        loadProfiles(tipo);
    }

    function deleteProfile(tipo, index) {
        const storedData = JSON.parse(localStorage.getItem(tipo)) || [];
        storedData.splice(index, 1);
        localStorage.setItem(tipo, JSON.stringify(storedData));
        loadProfiles(tipo);
    }

    // Carregar perfis ao iniciar
    loadProfiles('cadastroClientes');
    loadProfiles('cadastroEmpregadores');
    loadProfiles('cadastroOficiais');

    // Adicionar listeners de seleção de perfil
    profileSelectorCliente.addEventListener('change', () => displayProfileDetailsCliente(profileSelectorCliente.value));
    profileSelectorEmpregador.addEventListener('change', () => displayProfileDetailsEmpregador(profileSelectorEmpregador.value));
    profileSelectorOficial.addEventListener('change', () => displayProfileDetailsOficial(profileSelectorOficial.value));
});
