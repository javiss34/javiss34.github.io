"use strict";
import { desordenarIndices, mostrarMensaje } from "./biblioteca.js";

window.onload = () => {
  const contenedorImagenes = document.getElementById("piezas");
  const panelJuego = document.getElementById("panel_juego");
  const zonaArrastrable = document.getElementById("zona_arrastrable");
  const botonReinicio = document.getElementById("boton_reinicio");

  const imagenes = contenedorImagenes.children;
  const divsPanelJuego = panelJuego.children;

  // Desordenar imágenes al iniciar
  desordenarIndices(imagenes, contenedorImagenes);

  // Delegación de eventos

  // Al comenzar a arrastrar un elemento con clase "arrastrable", se guarda su id en dataTransfer
  zonaArrastrable.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("arrastrable")) {
      e.dataTransfer.setData("id", e.target.id);
    }
  });

  //Para evitar el comportamiento por defecto del navegador hacemos esto al arrastrar.
  zonaArrastrable.addEventListener("dragover", (e) => {
    if (e.target.classList.contains("soltable")) {
      e.preventDefault();
    }
  });

  //Al soltar evitamos también el comportamiento por defecto
  zonaArrastrable.addEventListener("drop", (e) => {
    e.preventDefault();

    if (
      e.target.classList.contains("soltable") &&
      e.target.children.length === 0
    ) {
      const id = e.dataTransfer.getData("id");
      e.target.appendChild(document.getElementById(id));
    }

    comprobarResultado();
  });

  const comprobarResultado = () => {
    let piezasColocadas = 0;

    for (let div of divsPanelJuego) {
      if (div.children.length > 0) piezasColocadas++;
    }

    if (piezasColocadas !== 9) return;

    let puzzleCorrecto = true;

    for (let div of divsPanelJuego) {
      const numeroDiv = div.id.replace("soltable", "");
      const numeroImg = div.children[0].id.replace("arrastrable", "");

      if (numeroDiv !== numeroImg) {
        puzzleCorrecto = false;
        break;
      }
    }

    mostrarMensaje(puzzleCorrecto);
  };

  //Para reiniciar el juego
  botonReinicio.addEventListener("click", () => {
    const mensaje = document.querySelector(".mensaje");
    if (mensaje) mensaje.remove();

    const imagenesPanel = panelJuego.querySelectorAll("img");
    imagenesPanel.forEach((img) => contenedorImagenes.appendChild(img));

    desordenarIndices(contenedorImagenes.children, contenedorImagenes);
  });
};
