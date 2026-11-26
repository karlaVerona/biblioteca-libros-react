# Mi biblioteca

Una pequeña app web en React para ver y buscar libros de una biblioteca personal.
Es un **catálogo de libros, no de películas**.

## Qué hace

- Muestra una lista de 8 libros con título, autor, año, género y estado.
- Buscador por título o autor (no distingue mayúsculas).
- Filtro por género con botones.
- Al tocar un libro se ve su detalle: autor, género, año, páginas, estado y resumen.
- Si la búsqueda no coincide con nada, muestra un mensaje de que no hay resultados.

## Tecnologías

- React 18 (por CDN, con ReactDOM)
- JavaScript (JSX, traducido en el navegador con Babel)
- HTML y CSS, sin frameworks de CSS
- Sin backend y sin claves: los datos viven en `datos.js`

> **Nota:** no usa Vite. Intenté usar Vite, pero `npx vite` se quedó colgado
> descargando en esta máquina, así que la app usa React por CDN para que
> corra sola, sin instalar nada. Si en tu computadora tienes Vite, puedes
> migrarla después; la lógica de `datos.js` y de `app.jsx` es la misma.

## Cómo correrlo

Necesitas Python 3 (ya viene en Linux) para servir los archivos por HTTP.
No basta con hacer doble clic en `index.html`, porque Babel tiene que
descargar `app.jsx` y eso solo funciona por HTTP.

```bash
cd biblioteca-libros-react
python3 -m http.server 8123
```

Luego abre en el navegador:

```
http://127.0.0.1:8123/
```

Probado en esta máquina: los 4 archivos (`index.html`, `styles.css`,
`datos.js` y `app.jsx`) responden con código 200, y las 10 pruebas de
la función de filtrado pasan (ver abajo).

Para detener el servidor, pulsa `Ctrl + C` en la terminal.

## Estructura de archivos

```
biblioteca-libros-react/
├── index.html   # Página principal; carga React por CDN y los demás archivos.
├── styles.css   # Estilos de la app.
├── datos.js     # Los 8 libros de ejemplo y la función filtrarLibros().
├── app.jsx      # El componente React: buscador, filtros, lista y detalle.
└── README.md    # Este archivo.
```

Total de código propio: 152 líneas entre los 4 archivos.

## Cómo se conecta a una API (opcional)

Por defecto la app usa los datos locales de `datos.js`, para que funcione
sin backend. Esos datos tienen la misma forma que devolvería una API como
la del proyecto 1 (`mini-catalogo-api` en Spring Boot): una lista de
objetos con `titulo`, `autor`, `genero`, `anio`, `paginas` y `resumen`.

Si un día hay una API real, bastaría con cargar los libros con `fetch`
en vez de usar `LIBROS` directamente. Ejemplo (comentado, no se ejecuta):

```js
// En app.jsx, en lugar de usar LIBROS de datos.js:
// const [libros, setLibros] = useState([]);
// useEffect(() => {
//   fetch("http://localhost:8080/api/libros")
//     .then((respuesta) => respuesta.json())
//     .then((datos) => setLibros(datos));
// }, []);
```

## Pruebas

La lógica de búsqueda está en `filtrarLibros()` en `datos.js`, y se puede
probar sin abrir el navegador:

```bash
node --check datos.js
node /tmp/test-biblioteca.js   # 10 comprobaciones, todas pasan
```

Lo que comprueban esas 10 pruebas: que hay 8 libros, que sin filtro salen
los 8, que buscar `dune` o la autora `austen` da 1 resultado, que la
búsqueda no distingue mayúsculas, que el filtro de Novela da 3 y el de
Ciencia ficción 2, que texto y género combinados funcionan, y que una
búsqueda sin resultados da 0.

## Cómo explicarlo en entrevista

**1. ¿Qué hace este proyecto?**
Es un catálogo de libros en React. Carga 8 libros de un archivo local,
los muestra en una lista, y permite buscar por título o autor, filtrar
por género y ver el detalle de cada libro al tocarlo.

**2. ¿Por qué los datos están en un archivo local y no en una API?**
Para que la app corra sola, sin backend ni base de datos. Los datos tienen
la misma forma que devolvería una API REST, así que conectarla sería
cambiar de dónde vienen los libros, con un `fetch`, sin tocar la lista
ni el detalle.

**3. ¿Cómo funciona la búsqueda?**
El texto y el género viven en el estado con `useState`, y la lista
filtrada se calcula con `useMemo` para no recalcularla en cada render.
La función `filtrarLibros()` compara en minúsculas y revisa título y
autor, así que buscar “dune” o “DUNE” da lo mismo.
