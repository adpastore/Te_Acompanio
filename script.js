document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    const messageContainer = document.getElementById('message-container');
    const countDownContainer = document.getElementById('countdown-container');

    function validarNombreApellido(input){
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(input.value);
    }

    const email = document.getElementById("email");
    email.addEventListener("input", function (event) {
        if (email.validity.typeMismatch) {
            email.setCustomValidity("¡Se esperaba una dirección de correo electrónico!");
        } else {
            email.setCustomValidity("");
        }
    });

    function formatoTelefono(input) {
        let formattedInput = input.value.replace(/[^\d]/g, '');
        if (formattedInput.length >= 2) {
            formattedInput = formattedInput.slice(0, 2) + '-' + formattedInput.slice(2);
        }
        if (formattedInput.length >= 7) {
            formattedInput = formattedInput.slice(0, 7) + '-' + formattedInput.slice(7);
        }
        input.value = formattedInput;
    }

    const inputTelefono = document.getElementById('telefono');
    inputTelefono.addEventListener('input', function() {
        formatoTelefono(inputTelefono);
    });

    function validarTelefono(input) {
        const regex = /^\+?[0-9]{2}-[0-9]{4}-[0-9]{4}$/;
        return regex.test(input.value);
    }

    form.addEventListener("submit", function (event) {
        const nombreInput = document.getElementById('nombre');
        const apellidoInput = document.getElementById('apellido');
        const telefonoInput = document.getElementById('telefono');

        formatoTelefono(telefonoInput); // Formatea el teléfono antes de la validación

        if (!validarNombreApellido(nombreInput)) {
            alert('Por favor, ingrese datos válidos en el nombre.');
            event.preventDefault();
            return;
        }
        if (!validarNombreApellido(apellidoInput)) {
            alert('Por favor, ingrese datos válidos en el apellido.');
            event.preventDefault();
            return;
        }
        if (!validarTelefono(telefonoInput)) {
            alert('Por favor, ingrese datos válidos como teléfono.');
            event.preventDefault();
            return;
        }

        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        form.reset();
        setTimeout(function () {
            alert('Mensaje entregado con éxito. Nos pondremos en contacto contigo pronto.');
        }, 4000);
    });
});