document.addEventListener('DOMContentLoaded', () => {
  function displayStoredData() {
      const storedDataList = document.getElementById('storedDataList');
      storedDataList.innerHTML = '';

      let storedData = JSON.parse(localStorage.getItem('cadastroEmpregadores')) || [];

      storedData.forEach((data, index) => {
          const divRow = document.createElement('div');
          divRow.className = 'row';

          const divCol1 = document.createElement('div');
          divCol1.className = 'col-md-6';
          const divCol2 = document.createElement('div');
          divCol2.className = 'col-md-6';

          const card1 = createCard(formatFormData(data, true));
          const card2 = createCard(formatAddress(data));

          divCol1.appendChild(card1);
          divCol2.appendChild(card2);

          divRow.appendChild(divCol1);
          divRow.appendChild(divCol2);

          storedDataList.appendChild(divRow);
      });
  }

  function createCard(content) {
      const card = document.createElement('div');
      card.className = 'card my-3 p-3';
      card.style.textAlign = 'left';
      card.innerHTML = content;
      return card;
  }

  function formatFormData(data, includeAddress = false) {
      let formattedData = `
          <p><strong>Razão Social:</strong> ${data['razao-social']}</p>
          <p><strong>CNPJ:</strong> ${data['cnpj']}</p>
          <p><strong>CNAE:</strong> ${data['cnae']}</p>
      `;
      if (includeAddress) {
          formattedData += `
              <p><strong>Endereço:</strong> ${data['endereco']}</p>
              <p><strong>Bairro:</strong> ${data['bairro']}</p>
              <p><strong>Cidade/Estado:</strong> ${data['cidade']}, ${data['estado']}</p>
              <p><strong>CEP:</strong> ${data['cep']}</p>
          `;
      }
      return formattedData;
  }

  // Inicializar a lista de dados armazenados ao carregar a página
  displayStoredData();
});
