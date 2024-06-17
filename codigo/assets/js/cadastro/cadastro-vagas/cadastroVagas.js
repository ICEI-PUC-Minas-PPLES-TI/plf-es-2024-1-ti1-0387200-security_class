document.addEventListener('DOMContentLoaded', () => {
  const formsContainer = document.getElementById('forms-container');
  const addNewFormButton = document.getElementById('add-new-form');
  const viewStoredDataButton = document.getElementById('view-stored-data');

  // Função para adicionar eventos de submissão e remoção ao formulário
  function attachFormEvents(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const jsonData = {};

      formData.forEach((value, key) => {
        if (!jsonData[key]) {
          jsonData[key] = value;
        } else {
          if (!Array.isArray(jsonData[key])) {
            jsonData[key] = [jsonData[key]];
          }
          jsonData[key].push(value);
        }
      });

      // Adicionar ID único à vaga
      jsonData.id = generateUniqueId();

      // Salvar os dados no localStorage
      saveToLocalStorage(jsonData);
    });

    // Adicionar evento de clique ao botão de remover
    const removeButton = form.querySelector('.remove-form');
    removeButton.addEventListener('click', () => {
      form.remove();
    });
  }

  // Função para gerar um ID único
  function generateUniqueId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
  }

  // Função para salvar dados no localStorage
  function saveToLocalStorage(data) {
    let storedData = JSON.parse(localStorage.getItem('formSubmissions')) || [];
    storedData.push(data);
    localStorage.setItem('formSubmissions', JSON.stringify(storedData));

    // Adiciona mensagem de sucesso
    alert('Vaga criada com sucesso!');

    // Limpar campos do formulário
    const form = document.querySelector('.cadastro-vagas-form');
    form.reset();
  }

  // Função para criar um novo formulário de vaga
  function createNewForm() {
    const originalForm = document.querySelector('.cadastro-vagas-form');
    const newForm = originalForm.cloneNode(true);
    formsContainer.appendChild(newForm);
    attachFormEvents(newForm);
  }

  // Evento para adicionar novo formulário
  addNewFormButton.addEventListener('click', createNewForm);

  // Evento para visualizar os dados das vagas
  viewStoredDataButton.addEventListener('click', () => {
    window.location.href = '/codigo/pages/empregador/visualizar-vagas.html';
  });

  // Adicionar eventos ao formulário inicial
  const initialForm = document.querySelector('.cadastro-vagas-form');
  if (initialForm) {
    attachFormEvents(initialForm);
  } else {
    createNewForm(); // Criar um formulário inicial se não houver nenhum
  }
});
