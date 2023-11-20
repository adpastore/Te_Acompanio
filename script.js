document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');

    function validarNombreApellido(input) {
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
    inputTelefono.addEventListener('input', function () {
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

        formatoTelefono(telefonoInput);

        if (!validarNombreApellido(nombreInput)) {
            alert('Por favor, ingrese un nombre correcto sin acentos o caracteres especiales.');
            event.preventDefault();
            return;
        }
        if (!validarNombreApellido(apellidoInput)) {
            alert('Por favor, ingrese un apellido correcto sin acentos o caracteres especiales.');
            event.preventDefault();
            return;
        }
        if (!validarTelefono(telefonoInput)) {
            alert('Por favor, ingrese un teléfono correctamente.');
            event.preventDefault();
            return;
        }
        alert('¡Gracias!\nEl formulario ha sido enviado con éxito.');
        form.reset(); // Reinicia el formulario y borra los datos

        setTimeout(function () {
            window.location.href = "https://adpastore.github.io/Te_Acompanio/contacto.html";
        }, 3000);

        event.preventDefault(); // Evita el envío automático del formulario
    });
});
