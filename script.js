
// document.addEventListener("DOMContentLoaded", function () {
//     // Funciones de validación y código relacionado aquí...
//     const form = document.getElementById('contact-form');
//     const messageContainer = document.getElementById('message-container');
//     const countDownContainer = document.getElementById('countdown-container');

//     // Función para validar nombres y apellidos
//     function validarNombreApellido(input){
//         const regex = /^[a-zA-Z\s]+$/;
//         return regex.test(input.value);
//     }

//     // Función para validar correo electrónico
//     const email = document.getElementById("email");

//     email.addEventListener("input", function (event) {
//         if (email.validity.typeMismatch) {
//             email.setCustomValidity(
//                 "¡Se esperaba una dirección de correo electrónico!",
//             );
//         } else {
//             email.setCustomValidity("");
//         }
//     });

//     // Función para formatear el teléfono mientras se escribe
//     function formatoTelefono(input) {
//         console.log('formatoTelefono llamado');
//         // Elimina todos los no dígitos y los guiones actuales
//         let formattedInput = input.value.replace(/[^\d]/g, '');

//         // Inserta guiones después de 2 y 6 caracteres
//         if (formattedInput.length >= 2) {
//             formattedInput = formattedInput.slice(0, 2) + '-' + formattedInput.slice(2);
//         }
//         if (formattedInput.length >= 7) {
//             formattedInput = formattedInput.slice(0, 7) + '-' + formattedInput.slice(7);
//         }

//         // Actualiza el valor del input
//         input.value = formattedInput;
//     }
//     // Agrega un event listener al input para llamar a la función formatoTelefono
//     // cada vez que se presiona una tecla
//     const inputTelefono = document.getElementById('telefono');
//     inputTelefono.addEventListener('input', function() {
//         formatoTelefono(inputTelefono);
//     });

//     // Función para validar teléfono
//     function validarTelefono(input) {
//         const regex = /^\+?[0-9]{8,}(-[0-9]+)*$/; // Requerir al menos 8 dígitos
//         return regex.test(input.value);
//     }

//     // Asigna la función de validación al evento submit del formulario
//     form.addEventListener("submit", function (event) {
//         const nombreInput = document.getElementById('nombre');
//         const apellidoInput = document.getElementById('apellido');
//         const telefonoInput = document.getElementById('telefono');

//         if (!validarNombreApellido(nombreInput)) {
//             alert('Por favor, ingrese datos válidos en el nombre.');
//             event.preventDefault(); // Evita que el formulario se envíe si la validación falla
//             return;
//         }
//         if (!validarNombreApellido(apellidoInput)) {
//             alert('Por favor, ingrese datos válidos en el apellido.');
//             event.preventDefault(); // Evita que el formulario se envíe si la validación falla
//             return;
//         }
//         // Formatea el teléfono antes de la validación
//         formatoTelefono(telefonoInput);
//         if (!validarTelefono(telefonoInput)) {
//             alert('Por favor, ingrese datos válidos como teléfono.');
//             event.preventDefault(); // Evita que el formulario se envíe si la validación falla
//             return;
//         }
//         // Si el formulario es válido...
//         alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');

//         // Limpia el formulario
//         form.reset();

//         // Establece un temporizador para mostrar el mensaje de éxito durante 4 segundos
//         setTimeout(function () {
//             alert('Mensaje entregado con éxito. Nos pondremos en contacto contigo pronto.');
//         }, 4000);
//     });
// });

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