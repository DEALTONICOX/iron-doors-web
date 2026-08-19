const telefono = document.querySelector('#telefono');

if (telefono) {
    const prefijo = '+56 9';

    const formatearTelefono = () => {
        let numeros = telefono.value.replace(/\D/g, '');

        if (numeros.startsWith('569')) {
            numeros = numeros.slice(3);
        } else if (numeros.startsWith('56')) {
            numeros = numeros.slice(2);
        } else if (numeros.length > 8 && numeros.startsWith('9')) {
            numeros = numeros.slice(1);
        }

        numeros = numeros.slice(0, 8);

        const primerGrupo = numeros.slice(0, 4);
        const segundoGrupo = numeros.slice(4, 8);

        telefono.value = prefijo
            + (primerGrupo ? ` ${primerGrupo}` : '')
            + (segundoGrupo ? ` ${segundoGrupo}` : '');
    };

    telefono.addEventListener('focus', () => {
        if (!telefono.value) {
            telefono.value = `${prefijo} `;
        }
    });

    telefono.addEventListener('input', formatearTelefono);

    telefono.addEventListener('blur', () => {
        if (telefono.value.trim() === prefijo) {
            telefono.value = '';
        }
    });
}

const formulario = document.querySelector('.contacto-form');
const mensajeExito = document.querySelector('.mensaje-exito');
let temporizadorMensaje;

const modeloCotizacion = new URLSearchParams(window.location.search).get('modelo');
const esCotizacionMultiple = new URLSearchParams(window.location.search).get('cotizacion') === '1';
const campoAsunto = document.querySelector('input[name="asunto"]');
const campoMensaje = document.querySelector('textarea[name="mensaje"]');

if (modeloCotizacion && campoAsunto) {
    campoAsunto.value = `Cotización: ${modeloCotizacion.replaceAll('-', ' ')}`;
}

if (esCotizacionMultiple && campoAsunto && campoMensaje) {
    try {
        const productos = JSON.parse(localStorage.getItem('ironDoorsCotizaciones')) || [];
        if (productos.length) {
            campoAsunto.value = 'Solicitud de cotización';
            campoMensaje.value = `Hola, quisiera cotizar los siguientes modelos:\n\n${productos.map(item => `• ${item.modelo}`).join('\n')}\n\nQuedo atento/a a su respuesta.`;
        }
    } catch {
        // Si no hay una lista válida, el formulario permanece disponible normalmente.
    }
}

if (formulario && mensajeExito) {
    const cerrarMensaje = () => {
        mensajeExito.classList.remove('visible');
        clearTimeout(temporizadorMensaje);
    };

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        formulario.reset();
        if (esCotizacionMultiple) {
            localStorage.removeItem('ironDoorsCotizaciones');
        }
        mensajeExito.classList.add('visible');
        mensajeExito.focus();

        clearTimeout(temporizadorMensaje);
        temporizadorMensaje = setTimeout(() => {
            cerrarMensaje();
        }, 5000);
    });

    mensajeExito.addEventListener('click', (evento) => {
        if (evento.target === mensajeExito) {
            cerrarMensaje();
        }
    });

    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape' && mensajeExito.classList.contains('visible')) {
            cerrarMensaje();
        }
    });
}
