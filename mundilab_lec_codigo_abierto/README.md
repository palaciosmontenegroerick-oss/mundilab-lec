# MUNDILAB LEC — código fuente

## Archivos
- `index.html`: estructura de la web.
- `styles.css`: colores, distribución y diseño visual.
- `app.js`: catálogo, buscador, lector, panel de administración y almacenamiento local.

## Abrir en tu computadora
1. Descarga y descomprime `mundilab_lec_codigo_abierto.zip`.
2. Abre `index.html` con Chrome, Edge o Firefox.
3. Pulsa **Administración** e ingresa la contraseña de demostración: `61827575`.

## Editar el código
Puedes abrir los tres archivos con Visual Studio Code o cualquier editor de texto.
- Para cambiar colores y tamaños: `styles.css`.
- Para cambiar los textos iniciales y la contraseña de demostración: `app.js`.
- Para cambiar secciones y estructura: `index.html`.

## Importante sobre la contraseña y las publicaciones
Esta entrega es una versión estática/local. La contraseña se comprueba en JavaScript y cualquiera que inspeccione el código puede verla. Los libros y ajustes se guardan en el almacenamiento del navegador actual, no se sincronizan entre dispositivos. No es apropiado publicar así un panel administrativo real. Para una web pública con acceso privado se necesita autenticación del lado del servidor y una base de datos.

## Publicar en internet
No puedo publicar en tu nombre sin acceso autorizado a una cuenta de alojamiento o dominio. Puedes desplegar estos archivos en un servicio de hosting estático (por ejemplo, GitHub Pages o Netlify):
1. Crea una cuenta y un sitio nuevo.
2. Sube `index.html`, `styles.css` y `app.js` manteniendo los nombres.
3. Activa la publicación y copia la URL pública.
4. Para que Google pueda encontrarla, verifica el dominio/sitio en Google Search Console y solicita la indexación de la URL. La indexación puede tardar y no garantiza aparecer en primer lugar.

Para administrar libros desde varios equipos, añade posteriormente un backend seguro (por ejemplo, Supabase o Firebase) con roles de administrador.
