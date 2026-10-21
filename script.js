const formulario = document.querySelector('#formulario-faq');
const inputPregunta = document.querySelector('#input-pregunta');
const inputRespuesta = document.querySelector('#input-respuesta');
const listaFaq = document.querySelector('#lista-faq');

// Escuchar el envío del formulario para la C de CRUD (Create)
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const textoPregunta = inputPregunta.value.trim();
    const textoRespuesta = inputRespuesta.value.trim();

    if (textoPregunta !== '' && textoRespuesta !== '') {
        crearFila(textoPregunta, textoRespuesta);
        formulario.reset(); // Limpia los campos del formulario
    }
});

// Función para armar y mostrar la fila en la pantalla (Read)
function crearFila(pregunta, respuesta) {
    // 1. Contenedor principal de la fila
    const fila = document.createElement('article');
    fila.className = 'fila-faq';

    // 2. Elemento de la pregunta (h3)
    const titulo = document.createElement('h3');
    titulo.className = 'pregunta-titulo';
    titulo.textContent = pregunta; // textContent para el texto del usuario

    // 3. Elemento de la respuesta (p), oculta por CSS
    const texto = document.createElement('p');
    texto.className = 'respuesta-texto';
    texto.textContent = respuesta; // Evitamos innerHTML por seguridad

    // 4. Contenedor de botones y botones CRUD
    const acciones = document.createElement('div');
    acciones.className = 'acciones';

    const btnEditar = document.createElement('button');
    btnEditar.className = 'btn-editar';
    btnEditar.textContent = 'Editar';

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'btn-eliminar';
    btnEliminar.textContent = 'Eliminar';

    // Ensamblamos la estructura: metemos los botones en "acciones"
    acciones.appendChild(btnEditar);
    acciones.appendChild(btnEliminar);

    // Metemos el título, el texto y las acciones en la "fila"
    fila.appendChild(titulo);
    fila.appendChild(texto);
    fila.appendChild(acciones);

    // Insertamos la fila completa en el contenedor del HTML
    listaFaq.appendChild(fila);
}

// Delegación de eventos: un solo escuchador en el contenedor principal
listaFaq.addEventListener('click', function(evento) {
    const elemento = evento.target;

    // --- ACCIÓN PROPIA: Acordeón de preguntas ---
    if (elemento.classList.contains('pregunta-titulo')) {
        // Traversing: Moverse de lado al hermano siguiente (la respuesta)
        const respuesta = elemento.nextElementSibling; 
        
        // Traversing: Bajar a los hijos del contenedor para cerrar las otras
        const todasLasFilas = listaFaq.children; 

        for (let i = 0; i < todasLasFilas.length; i++) {
            const parrafo = todasLasFilas[i].querySelector('.respuesta-texto');
            if (parrafo !== respuesta) {
                parrafo.classList.remove('visible'); // Oculta las demás
            }
        }
        // Alterna la clase para mostrar u ocultar la respuesta actual
        respuesta.classList.toggle('visible');
    }

    // --- DELETE: Eliminar fila ---
    if (elemento.classList.contains('btn-eliminar')) {
        // Traversing: Subir hasta el contenedor de la fila exacta
        const fila = elemento.closest('.fila-faq'); 
        fila.remove(); // Borra solo esa fila
    }

    // --- UPDATE: Editar fila ---
    if (elemento.classList.contains('btn-editar')) {
        // Traversing: Subir a la fila y luego bajar al título con querySelector
        const fila = elemento.closest('.fila-faq');
        const titulo = fila.querySelector('.pregunta-titulo');
        
        const nuevaPregunta = prompt('Edita la pregunta:', titulo.textContent);
        
        // Validamos que no esté vacío y usamos textContent
        if (nuevaPregunta !== null && nuevaPregunta.trim() !== '') {
            titulo.textContent = nuevaPregunta.trim(); 
        }
    }
});