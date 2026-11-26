// App principal: buscador, filtro por género, lista y detalle de un libro.
// Usa React con hooks (useState y useMemo). Los datos vienen de datos.js.
const { useState, useMemo } = React;

function BibliotecaApp() {
  // Estado: lo que escribe la usuaria, el género elegido y el libro abierto.
  const [texto, setTexto] = useState("");
  const [genero, setGenero] = useState("Todos");
  const [seleccionado, setSeleccionado] = useState(null);

  // Géneros de la lista, sin repetir, para los botones del filtro.
  const generos = useMemo(() => {
    const lista = ["Todos"];
    LIBROS.forEach((l) => { if (!lista.includes(l.genero)) lista.push(l.genero); });
    return lista;
  }, []);

  // Recalcula la lista solo cuando cambian el texto o el género.
  const visibles = useMemo(
    () => filtrarLibros(LIBROS, texto, genero),
    [texto, genero]
  );

  return (
    <div className="app">
      <header>
        <h1>Mi biblioteca</h1>
        <p>{visibles.length} de {LIBROS.length} libros</p>
      </header>

      <div className="controles">
        <input
          type="search"
          placeholder="Buscar por título o autor…"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <div className="generos">
          {generos.map((g) => (
            <button key={g} className={g === genero ? "activo" : ""}
              onClick={() => setGenero(g)}>{g}</button>
          ))}
        </div>
      </div>

      <main>
        <ul className="lista">
          {visibles.map((libro) => (
            <li key={libro.id}>
              <button className="tarjeta" onClick={() => setSeleccionado(libro)}>
                <strong>{libro.titulo}</strong>
                <span>{libro.autor} · {libro.anio}</span>
                <span className="genero">{libro.genero} · {libro.estado}</span>
              </button>
            </li>
          ))}
          {visibles.length === 0 && (
            <li className="vacio">No hay libros que coincidan con esa búsqueda.</li>
          )}
        </ul>

        <section className="detalle">
          {seleccionado ? (
            <article>
              <button className="cerrar" onClick={() => setSeleccionado(null)}>✕ Cerrar</button>
              <h2>{seleccionado.titulo}</h2>
              <p><strong>Autor:</strong> {seleccionado.autor}</p>
              <p><strong>Género:</strong> {seleccionado.genero}</p>
              <p><strong>Año:</strong> {seleccionado.anio} · <strong>Páginas:</strong> {seleccionado.paginas}</p>
              <p><strong>Estado:</strong> {seleccionado.estado}</p>
              <p>{seleccionado.resumen}</p>
            </article>
          ) : (
            <p className="ayuda">Toca un libro de la lista para ver su detalle.</p>
          )}
        </section>
      </main>
    </div>
  );
}

// Monta la app en el <div id="root"> de index.html.
ReactDOM.createRoot(document.getElementById("root")).render(<BibliotecaApp />);
