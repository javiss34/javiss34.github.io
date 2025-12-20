"use strict";

export const desordenarIndices = (array, contenedorPadre) => {
  const indicesUsados = [];

  for (let i = 0; i < array.length; i++) {
    let indice;
    do {
      indice = Math.floor(Math.random() * array.length);
    } while (indicesUsados.includes(indice));

    indicesUsados.push(indice);
    contenedorPadre.appendChild(array[indice]);
  }
};

export const mostrarMensaje = (correcto) => {
  let mensaje = document.querySelector(".mensaje");
  if (mensaje) mensaje.remove();

  mensaje = document.createElement("h1");
  mensaje.className = "mensaje";
  mensaje.textContent = correcto
    ? "🎉 Felicidades, puzzle completado"
    : "❌ Lo siento, puzzle mal hecho";

  document.body.appendChild(mensaje);
};
