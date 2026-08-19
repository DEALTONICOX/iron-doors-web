const cargadorPagina = document.querySelector('.cargador-pagina');

if (cargadorPagina) {
    const ocultarCargador = () => {
        window.setTimeout(() => {
            cargadorPagina.classList.add('oculto');
        }, 350);
    };

    if (document.readyState === 'complete') {
        ocultarCargador();
    } else {
        window.addEventListener('load', ocultarCargador, { once: true });
    }

    window.addEventListener('pageshow', (evento) => {
        if (evento.persisted) {
            cargadorPagina.classList.add('oculto');
        }
    });

    document.addEventListener('click', (evento) => {
        const enlace = evento.target.closest('a[href]');

        if (!enlace || evento.defaultPrevented || evento.button !== 0
            || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey
            || enlace.target === '_blank' || enlace.hasAttribute('download')) {
            return;
        }

        const destino = new URL(enlace.href, window.location.href);
        const mismaPagina = destino.pathname === window.location.pathname;

        if (destino.origin !== window.location.origin
            || (mismaPagina && destino.hash)
            || !destino.pathname.toLowerCase().endsWith('.html')) {
            return;
        }

        evento.preventDefault();
        cargadorPagina.classList.remove('oculto');

        window.setTimeout(() => {
            window.location.href = destino.href;
        }, 300);
    });
}
