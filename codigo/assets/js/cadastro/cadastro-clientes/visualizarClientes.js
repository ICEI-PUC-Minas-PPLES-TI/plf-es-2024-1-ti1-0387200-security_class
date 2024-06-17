document.addEventListener('DOMContentLoaded', () => {
  function displayStoredData() {
      const storedDataList = document.getElementById('storedDataList');
      storedDataList.innerHTML = '';

      let storedData = JSON.parse(localStorage.getItem('cadastroClientes')) || [];

      storedData.forEach((data, index) => {
          const div1 = document.createElement('div');
          div1.className = 'row';
          const div2 = document.createElement('div');
          div2.className = 'col-md-12';
          const card = document.createElement('div');
          card.className = 'card my-3 p-3';
          const formattedData = formatFormData(data);
          card.innerHTML = formattedData;

          div2.appendChild(card);
          div1.appendChild(div2);
          storedDataList.appendChild(div1);
      });
  }

  function formatFormData(data) {
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

  displayStoredData();
});
