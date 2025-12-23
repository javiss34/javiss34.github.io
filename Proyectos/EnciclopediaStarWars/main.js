"use strict";

import {
  traerDatos,
  pintarPeliculas,
  pintarInformacion,
  cargarPeliculas,
  cargarPersonajes
} from "./biblioteca.js";

window.onload = () => {
  const url = "https://swapi.py4e.com/api/films/";
  let contenedorPeliculas = document.getElementById("listado_peliculas");
  let contenedorInformacion = document.getElementById("contenedor_informacion");

  cargarPeliculas(url,contenedorPeliculas,contenedorInformacion);

};
