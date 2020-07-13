const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
     ui.mostrarEstablecimientos();
})

// Habilitar buscador de establecimientos

const buscador = document.querySelector('#buscar input');
buscador.addEventListener('input', () => {
     if(buscador.value.length > 5) {
          //Busca en la API
          ui.obtenerSugerencias(buscador.value);
     } else {
          ui.mostrarEstablecimientos();
     }
})