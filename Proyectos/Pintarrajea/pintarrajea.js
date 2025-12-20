"use strict";

import { generarTabla } from "./biblioteca.js";

window.onload = () => {
  //Creación de la tabla
  let contenedorPintar = document.getElementById("contenedor_pintar");
  generarTabla(80, contenedorPintar);

  //Seleccionar color
  let seleccion = "#000000";
  let colorElegido = document.getElementById("color");
  colorElegido.addEventListener("input", () => {
    seleccion = colorElegido.value;
  });

  document.getElementById("borrador").addEventListener("click", () => {
    seleccion = "#FFFFFF";
  });

  document.getElementById("borrar").addEventListener("click", () => {
    document.querySelectorAll("div table tr td").forEach((celda) => {
      celda.style.backgroundColor = "#FFFFFF";
    });
    click = false;
  });

  //Controlo cuando se hace click con el ratón
  let click = false;

  let tabla = document.querySelector("div table");

  tabla.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "TD") {
      click = true;
      e.target.style.backgroundColor = seleccion;
    }
  });

  tabla.addEventListener("mouseover", (e) => {
    if (click && e.target.tagName === "TD") {
      e.target.style.backgroundColor = seleccion;
    }
  });

  tabla.addEventListener("mouseup", (e) => {
    click = false;
  });
};
