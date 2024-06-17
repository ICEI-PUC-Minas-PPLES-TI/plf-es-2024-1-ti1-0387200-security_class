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
  
        // Salvar os dados no localStorage
        saveToLocalStorage(jsonData);
      });
    }
  
    // Função para salvar dados no localStorage
    function saveToLocalStorage(data) {
      let storedData = JSON.parse(localStorage.getItem('cadastroEmpregadores')) || [];
      storedData.push(data);
      localStorage.setItem('cadastroEmpregadores', JSON.stringify(storedData));
  
      // Adiciona mensagem de sucesso
      alert('Cadastro realizado com sucesso!');

      window.location.href = '/codigo/index.html';
  
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
  