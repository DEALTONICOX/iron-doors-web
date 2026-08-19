const gruposCatalogo = [
    {
        etiqueta: 'PUERTAS',
        titulo: 'Puertas',
        pagina: 'puertas.html',
        productos: [
            ['INTERIOR', 'Modelo Roble Clásica M-01', 'img/puertamadera.png', 'Roble-Clasica-M-01'],
            ['INTERIOR', 'Modelo Nogal M-02', 'img/puertamadera.png', 'Nogal-M-02'],
            ['INTERIOR', 'Modelo Pino Natural M-03', 'img/puertamadera.png', 'Pino-Natural-M-03'],
            ['EXTERIOR', 'Modelo Exterior Roble E-01', 'img/puertaexterior.png', 'Exterior-Roble-E-01'],
            ['EXTERIOR', 'Modelo Exterior Moderna E-02', 'img/puertaexterior.png', 'Exterior-Moderna-E-02'],
            ['EXTERIOR', 'Modelo Gran Acceso E-03', 'img/puertaexterior.png', 'Gran-Acceso-E-03'],
            ['BLINDADA', 'Modelo Seguridad B-01', 'img/puertamadera.png', 'Seguridad-B-01'],
            ['BLINDADA', 'Modelo Fortaleza B-02', 'img/puertamadera.png', 'Fortaleza-B-02'],
            ['BLINDADA', 'Modelo Élite B-03', 'img/puertamadera.png', 'Elite-B-03']
        ]
    },
    {
        etiqueta: 'PORTONES',
        titulo: 'Portones',
        pagina: 'portones.html',
        productos: [
            ['CORREDERO', 'Modelo Lineal C-01', 'img/portonmadera.png', 'Porton-Lineal-C-01'],
            ['CORREDERO', 'Modelo Roble C-02', 'img/portonmadera.png', 'Porton-Roble-C-02'],
            ['CORREDERO', 'Modelo Urbano C-03', 'img/portonmadera.png', 'Porton-Urbano-C-03'],
            ['ABATIBLE', 'Modelo Doble Hoja A-01', 'img/portonmadera.png', 'Doble-Hoja-A-01'],
            ['ABATIBLE', 'Modelo Clásico A-02', 'img/portonmadera.png', 'Clasico-A-02'],
            ['ABATIBLE', 'Modelo Gran Acceso A-03', 'img/portonmadera.png', 'Gran-Acceso-A-03'],
            ['AUTOMATIZADO', 'Modelo Smart AU-01', 'img/portonmadera.png', 'Smart-AU-01'],
            ['AUTOMATIZADO', 'Modelo Residencial AU-02', 'img/portonmadera.png', 'Residencial-AU-02'],
            ['AUTOMATIZADO', 'Modelo Pro AU-03', 'img/portonmadera.png', 'Pro-AU-03']
        ]
    },
    {
        etiqueta: 'CORTINAS METÁLICAS',
        titulo: 'Cortinas Metálicas',
        pagina: 'cortinas.html',
        productos: [
            ['COMERCIAL', 'Modelo Comercial CM-01', 'img/cortinametalica.png', 'Cortina-Comercial-CM-01'],
            ['COMERCIAL', 'Modelo Compacta CM-02', 'img/cortinametalica.png', 'Cortina-Compacta-CM-02'],
            ['COMERCIAL', 'Modelo Urbana CM-03', 'img/cortinametalica.png', 'Cortina-Urbana-CM-03'],
            ['INDUSTRIAL', 'Modelo Reforzada CI-01', 'img/cortinametalica.png', 'Reforzada-CI-01'],
            ['INDUSTRIAL', 'Modelo Gran Formato CI-02', 'img/cortinametalica.png', 'Gran-Formato-CI-02'],
            ['INDUSTRIAL', 'Modelo Seguridad CI-03', 'img/cortinametalica.png', 'Seguridad-CI-03'],
            ['AUTOMATIZADA', 'Modelo Smart CA-01', 'img/cortinametalica.png', 'Cortina-Smart-CA-01'],
            ['AUTOMATIZADA', 'Modelo Comercial CA-02', 'img/cortinametalica.png', 'Cortina-Comercial-CA-02'],
            ['AUTOMATIZADA', 'Modelo Pro CA-03', 'img/cortinametalica.png', 'Cortina-Pro-CA-03']
        ]
    }
];

const catalogoProductos = document.querySelector('#catalogo-productos');

if (catalogoProductos) {
    gruposCatalogo.forEach(grupo => {
        const seccion = document.createElement('section');
        seccion.className = 'catalogo-grupo';
        seccion.innerHTML = `
            <div class="catalogo-grupo-cabecera">
                <div><span class="catalogo-grupo-etiqueta">${grupo.etiqueta}</span><h3>${grupo.titulo}</h3></div>
                <a href="${grupo.pagina}">Ver página de ${grupo.titulo.toLowerCase()} →</a>
            </div>
            <div class="catalogo-modelos"></div>`;

        const modelos = seccion.querySelector('.catalogo-modelos');
        grupo.productos.forEach(([tipo, nombre, imagen, codigo]) => {
            const producto = document.createElement('article');
            producto.className = 'catalogo-modelo';
            producto.innerHTML = `
                <div class="catalogo-modelo-imagen"><img src="${imagen}" alt="${nombre}"></div>
                <div class="catalogo-modelo-info">
                    <span class="catalogo-modelo-tipo">${tipo}</span>
                    <h4>${nombre}</h4>
                    <span class="catalogo-modelo-precio">Precio: A consultar</span>
                    <div class="catalogo-modelo-acciones">
                        <a href="${grupo.pagina}">Ver categoría</a>
                        <a href="cotizaciones.html?modelo=${codigo}" class="catalogo-cotizar">Cotizar</a>
                    </div>
                </div>`;
            modelos.appendChild(producto);
        });

        catalogoProductos.appendChild(seccion);
    });
}
