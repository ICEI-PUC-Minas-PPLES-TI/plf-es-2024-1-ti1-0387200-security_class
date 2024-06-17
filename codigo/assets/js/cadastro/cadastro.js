document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");

    
    populateFormWithSavedData();

    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
      saveFormDataToLocalStorage();
      clearForm();
    });
  });

  function saveFormDataToLocalStorage() {
    const formData = {};
    const elements = document.querySelectorAll(".form_input, .dropdown, .form_new_input");

    elements.forEach(element => {
      if (element.type === "radio") {
        if (element.checked) {
          formData[element.name] = element.value;
        }
      } else {
        formData[element.name] = element.value;
      }
    });

    localStorage.setItem("formData", JSON.stringify(formData));
    alert("Form data saved to local storage.");
  }

  function populateFormWithSavedData() {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      const formData = JSON.parse(savedData);
      const elements = document.querySelectorAll(".form_input, .dropdown, .form_new_input");

      elements.forEach(element => {
        if (element.type === "radio") {
          if (element.value === formData[element.name]) {
            element.checked = true;
          }
        } else {
          element.value = formData[element.name] || "";
        }
      });
    }
  }

  function clearForm() {
    const elements = document.querySelectorAll(".form_input, .dropdown, .form_new_input");

    elements.forEach(element => {
      if (element.type === "radio" || element.type === "checkbox") {
        element.checked = false;
      } else {
        element.value = "";
      }
    });
  }
