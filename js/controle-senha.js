const img = document.querySelector('.control-password');
const input = document.querySelector('#senha');

function controlPassword() {
  if (input.type === 'password') {
    input.type = 'text';
    img.src = '../img/oculto.png';
  } else {
    input.type = 'password';
    img.src = '../img/visivel.png';
  }
}

img.addEventListener('click', controlPassword);