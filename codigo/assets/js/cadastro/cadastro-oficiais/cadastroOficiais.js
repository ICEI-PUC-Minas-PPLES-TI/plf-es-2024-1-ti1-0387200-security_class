document.addEventListener('DOMContentLoaded', () => {
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
  
       // Verificar duplicatas antes de salvar
      if (isDuplicateCarteiraFuncional(jsonData)) {
        alert('Erro: Essa carteira funcional já foi utilizada em outro cadastro!');
      } 
      else if (isDuplicateEmail(jsonData)) {
        alert('Erro: Esse e-mail já foi utilizado em outro cadastro!');
      }
       else {
        // Salvar os dados no localStorage
        saveToLocalStorage(jsonData);
      }
    });
  }

  // Função para verificar duplicidade de carteiras funcionais
  function isDuplicateEmail(newData) {
    let storedData = JSON.parse(localStorage.getItem('cadastroOficiais')) || [];
    return storedData.some(data => data.email === newData.email);
  }

  
  // Função para verificar duplicidade de email
  function isDuplicateCarteiraFuncional(newData) {
    let storedData = JSON.parse(localStorage.getItem('cadastroOficiais')) || [];
    return storedData.some(data => data['carteira-funcional'] === newData['carteira-funcional']);
  }
  
    // Função para salvar dados no localStorage
    function saveToLocalStorage(data) {
      let storedData = JSON.parse(localStorage.getItem('cadastroOficiais')) || [];
      storedData.push(data);
      localStorage.setItem('cadastroOficiais', JSON.stringify(storedData));
  
      // Adiciona mensagem de sucesso
      alert('Cadastro realizado com sucesso!');

      window.location.href = '/codigo/pages/oficial/visualizar.html';
  
      // Limpar campos do formulário
      const form = document.querySelector('.form');
      form.reset();
    }
  
  
    // Adicionar eventos ao formulário inicial
    const initialForm = document.querySelector('.form');
    if (initialForm) {
      attachFormEvents(initialForm);
    }
  });
  