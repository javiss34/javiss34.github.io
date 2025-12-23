"use strict";

const traerDatos = async (url) => {
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results ? datos.results : datos;
  } catch (error) {
    `${error.message}`;
  }
};

const pintarPeliculas = (peliculas) => {
  let plantilla = "";
  Array.isArray(peliculas) && peliculas.length
    ? peliculas.map((pelicula, indice) => {
        plantilla += `<p class = "pelicula" id = ${indice}> ${pelicula.episode_id} - ${pelicula.title}. </p>`;
      })
    : (plantilla = "Película no encontrada");
  return plantilla;
};

const formatearFecha = (fechaString) => {
  const fecha = new Date(fechaString);
  return fecha.toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const pintarInformacion = (peliculas, id) => {
  let plantilla = "";
  Array.isArray(peliculas) && peliculas.length
    ? peliculas.map((pelicula, indice) => {
        id === indice &&
          (plantilla = `
        <div class = "informacion_pelicula" id = ${indice}>
        <h2>${pelicula.title}</h2>
        <p class = "resumen">${pelicula.opening_crawl}</p>
        <p><strong>Director:</strong> ${pelicula.director}</p>
        <p><strong>Productor:</strong> ${pelicula.producer}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${formatearFecha(
          pelicula.release_date
        )}</p>
        </div>
        `);
      })
    : (plantilla = "Película no encontrada");
  return plantilla;
};

const pintarPersonajes = (personajes, contenedor) => {
  let plantilla = "";
  Array.isArray(personajes) && personajes.length
    ? personajes.map((personaje) => {
        plantilla += `
    <p>${personaje.name}</p>
    `;
      })
    : (plantilla = "No se encontraron personajes");
  return plantilla;
};

const cargarPeliculas = async (
  url,
  contenedorPeliculas,
  contenedorInformacion
) => {
  //Este mensaje será remplazado por la lista de peliculas
  contenedorPeliculas.innerHTML = "CARGANDO...";

  try {
    //Cargamos todas las peliculas de la api
    const peliculas = await traerDatos(url);
    //Una vez cargadas todas se pinta la lista de peliculas
    contenedorPeliculas.innerHTML = pintarPeliculas(peliculas);

    contenedorPeliculas.addEventListener("click", (e) => {
      if (e.target.classList.contains("pelicula")) {
        contenedorInformacion.classList.remove("contenedor_oculto");
        contenedorInformacion.classList.add("contenedor_mostrar");
        const id = parseInt(e.target.id);
        contenedorInformacion.innerHTML = pintarInformacion(peliculas, id);
      }
    });
  } catch (error) {
    contenedorPeliculas.innerHTML = `${error.message}`;
  }
};

const cargarPersonajes = async (urlsPersonajes, contenedor) => {
  try {
    const promesas = urlsPersonajes.map((url) => {
      return traerDatos(url);
    });
    const resultados = await Promise.allSettled(promesas);
    const personajes = resultados
      .filter((r) => r.status === "fulfilled")
      .map((r) => r.value);
    contenedor.innerHTML = pintarPersonajes(personajes);
  } catch (error) {}
};

export {
  traerDatos,
  pintarPeliculas,
  pintarInformacion,
  cargarPeliculas,
  cargarPersonajes,
};
