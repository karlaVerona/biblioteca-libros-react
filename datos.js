// Datos de ejemplo: una biblioteca personal, sin depender de ninguna API.
// Cada libro tiene título, autor, género, año, páginas, resumen y estado.
const LIBROS = [
  { id: 1, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Novela", anio: 1967, paginas: 417, estado: "Disponible", resumen: "La historia de la familia Buendía en Macondo, a lo largo de siete generaciones." },
  { id: 2, titulo: "El principito", autor: "Antoine de Saint-Exupéry", genero: "Fantasía", anio: 1943, paginas: 96, estado: "Disponible", resumen: "Un piloto perdido en el desierto conoce a un pequeño príncipe de otro planeta." },
  { id: 3, titulo: "Dune", autor: "Frank Herbert", genero: "Ciencia ficción", anio: 1965, paginas: 896, estado: "Prestado", resumen: "Paul Atreides viaja al planeta desierto Arrakis, la única fuente de la especia." },
  { id: 4, titulo: "Orgullo y prejuicio", autor: "Jane Austen", genero: "Novela", anio: 1813, paginas: 432, estado: "Disponible", resumen: "Elizabeth Bennet y el señor Darcy se conocen entre malentendidos y orgullo." },
  { id: 5, titulo: "El nombre del viento", autor: "Patrick Rothfuss", genero: "Fantasía", anio: 2007, paginas: 880, estado: "Disponible", resumen: "Kvothe cuenta cómo se convirtió en mago, músico y leyenda." },
  { id: 6, titulo: "Breve historia del tiempo", autor: "Stephen Hawking", genero: "Ensayo", anio: 1988, paginas: 256, estado: "Prestado", resumen: "Una introducción clara al origen del universo, los agujeros negros y el tiempo." },
  { id: 7, titulo: "Fahrenheit 451", autor: "Ray Bradbury", genero: "Ciencia ficción", anio: 1953, paginas: 256, estado: "Disponible", resumen: "En un futuro donde los libros están prohibidos, un bombero empieza a leerlos." },
  { id: 8, titulo: "Los detectives salvajes", autor: "Roberto Bolaño", genero: "Novela", anio: 1998, paginas: 609, estado: "Disponible", resumen: "Dos poetas jóvenes buscan a una poeta misteriosa por México y Europa." },
];

// Filtra por texto (título o autor) y por género. Sin texto ni género, devuelve todo.
// Es una función pura, así se puede probar sin abrir el navegador.
function filtrarLibros(libros, texto, genero) {
  const busqueda = (texto || "").trim().toLowerCase();
  return libros.filter((libro) => {
    const coincideTexto = busqueda === "" ||
      libro.titulo.toLowerCase().includes(busqueda) ||
      libro.autor.toLowerCase().includes(busqueda);
    const coincideGenero = genero === "Todos" || libro.genero === genero;
    return coincideTexto && coincideGenero;
  });
}

// Hace los datos y la función visibles en el navegador y en Node (para pruebas).
if (typeof window !== "undefined") { window.LIBROS = LIBROS; window.filtrarLibros = filtrarLibros; }
if (typeof module !== "undefined") { module.exports = { LIBROS, filtrarLibros }; }
