const CLAVE_COTIZACION = 'ironDoorsCotizaciones';

const imagenPorModelo = (modelo) => {
    const nombre = modelo.toLowerCase();
    if (nombre.includes('cortina') || nombre.includes(' ci ')) return 'img/cortinametalica.png';
    if (nombre.includes('porton') || nombre.includes('doble hoja') || nombre.includes('smart au') || nombre.includes('residencial au') || nombre.includes('pro au')) return 'img/portonmadera.png';
    if (nombre.includes('exterior')) return 'img/puertaexterior.png';
    return 'img/puertamadera.png';
};

const leerCotizacion = () => {
    try {
        return JSON.parse(localStorage.getItem(CLAVE_COTIZACION)) || [];
    } catch {
        return [];
    }
};

let cotizacion = leerCotizacion();
const modeloUrl = new URLSearchParams(window.location.search).get('modelo');

if (modeloUrl) {
    const modelo = modeloUrl.replaceAll('-', ' ').replace(/[<>&"']/g, '').slice(0, 100);
    if (!cotizacion.some(item => item.modelo === modelo)) {
        cotizacion.push({ modelo, imagen: imagenPorModelo(modelo) });
        localStorage.setItem(CLAVE_COTIZACION, JSON.stringify(cotizacion));
    }
    history.replaceState({}, '', 'cotizaciones.html');
}

const lista = document.querySelector('#cotizacion-lista');
const estadoVacio = document.querySelector('#cotizacion-vacia');
const cantidadProductos = document.querySelector('#cantidad-productos');
const resumenCantidad = document.querySelector('#resumen-cantidad');
const contadorMenu = document.querySelector('#contador-menu');
const botonEnviar = document.querySelector('#enviar-cotizacion');
const botonVaciar = document.querySelector('#vaciar-cotizacion');

const guardar = () => localStorage.setItem(CLAVE_COTIZACION, JSON.stringify(cotizacion));

const renderizar = () => {
    const cantidad = cotizacion.length;
    lista.innerHTML = '';
    cantidadProductos.textContent = `${cantidad} ${cantidad === 1 ? 'producto' : 'productos'}`;
    resumenCantidad.textContent = cantidad;
    contadorMenu.textContent = cantidad;
    botonEnviar.disabled = cantidad === 0;
    botonVaciar.disabled = cantidad === 0;
    estadoVacio.classList.toggle('visible', cantidad === 0);

    cotizacion.forEach((item, indice) => {
        const articulo = document.createElement('article');
        articulo.className = 'cotizacion-item';
        articulo.innerHTML = `
            <div class="cotizacion-item-imagen"><img src="${item.imagen}" alt="${item.modelo}"></div>
            <div class="cotizacion-item-info"><span>PRECIO A CONSULTAR</span><h3>${item.modelo}</h3><p>El valor final dependerá de las medidas y características del proyecto.</p></div>
            <button type="button" class="eliminar-item" data-indice="${indice}" aria-label="Eliminar ${item.modelo}"><i class="fa-solid fa-trash"></i></button>`;
        lista.appendChild(articulo);
    });
};

lista.addEventListener('click', evento => {
    const boton = evento.target.closest('.eliminar-item');
    if (!boton) return;
    cotizacion.splice(Number(boton.dataset.indice), 1);
    guardar();
    renderizar();
});

botonVaciar.addEventListener('click', () => {
    cotizacion = [];
    guardar();
    renderizar();
});

botonEnviar.addEventListener('click', () => {
    if (cotizacion.length) window.location.href = 'contacto.html?cotizacion=1';
});

renderizar();
