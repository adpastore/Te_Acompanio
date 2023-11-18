// Validar completar campos
const swal = require('sweetalert');
const form = document.getElementById('contact-form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const comentario = document.getElementById('comentario').value;

    if (!nombre || !apellido || !email || !comentario) {
        swal("Por favor, completa todos los campos.","","error");
        return;
    }
    console.log("Formulario enviado con éxito.");
    swal("Formulario enviado con éxito.", "Gracias", "success");
});


function formatoTelefono(input) {
    // Elimina cualquier caracter que no sea un número
    input.value = input.value.replace(/\D/g, '');

    // Formatea el número con guiones
    if (input.value.length >= 2 && input.value.length <= 6) {
        input.value = input.value.substring(0, 2) + '-' + input.value.substring(2);
    } else if (input.value.length > 6) {
        input.value = input.value.substring(0, 2) + '-' + input.value.substring(2, 6) + '-' + input.value.substring(6);
    }
}