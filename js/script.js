const form = document.querySelector('form');
const validator = {
  validatorSubmit: (event) => {
    event.preventDefault();
    let send = true;

    const inputs = document.querySelectorAll('input');

    validator.clearError();

    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];
      const check = validator.checarEntradas(input);
      if (check !== true) {
        send = false;
        validator.showError(input, check);
      }
    }
    if (send) {
      form.submit();
    }
  },
  checarEntradas: (input) => {
    let rules = input.getAttribute('data-rules');
    if (rules !== null) {
      rules = rules.split('|');
      for (let k in rules) {
        let rDetails = rules[k].split('=');
        switch (rDetails[0]) {
          case 'required':
            if (input.value === '') {
              return 'Campo não pode ser Vazio!';
            }
            break;
          case 'min':
            if (input.value.length < rDetails[1]) {
              return `Insira pelo menos ${rDetails[1]} Elementos!`;
            }
            break;
          case 'email':
            if (input.value !== '') {
              const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return 'Digite um Email Válido!';
              }
            }
            break;
        }
      }
    }
    return true;
  },
  showError: (input, error) => {
    if (input.id === 'email') {
      const spanEmail = document.querySelector('.error-email');
      spanEmail.classList.add('erro');
      spanEmail.innerText = error;
    } else if (input.id === 'senha') {
      const spanSenha = document.querySelector('.error-senha');
      spanSenha.classList.add('erro');
      spanSenha.innerText = error;
    }
  },
  clearError: () => {
    const spans = document.querySelectorAll('span');
    spans.forEach((item) => {
      item.innerText = '';
      item.classList.remove('erro');
    })
  }
};

form.addEventListener('submit', validator.validatorSubmit);