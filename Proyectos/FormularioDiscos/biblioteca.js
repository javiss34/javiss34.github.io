"use strict";

const recorrerGeneros = (listaGeneros) => {
  let seleccionados = [];
  for (let i = 0; i < listaGeneros.length; i++) {
    if (listaGeneros[i].checked) {
      seleccionados.push(listaGeneros[i].value);
    }
  }
  return seleccionados;
};

const recorrerPrestado = (listaRadios) => {
  let seleccion = "No";
  for (let i = 0; i < listaRadios.length; i++) {
    if (listaRadios[i].checked) {
      seleccion = listaRadios[i].value;
    }
  }
  return seleccion;
};


const cargarLocalStorage = () => {
  if (typeof Storage !== "undefined") {
    const datos = localStorage.getItem("discos");
    return datos ? JSON.parse(datos) : [];
  }
  return [];
};


const pintarDiscos = (json) => {
  let plantilla = "";
  json.map((d) => {
    plantilla += `
      <div class="disco">
        <p><strong>Nombre:</strong> ${d.nombre}</p>
        <p><strong>Intérprete:</strong> ${d.interprete}</p>
        <p><strong>Año:</strong> ${d.anioPubli}</p>
        <p><strong>Géneros:</strong> ${d.generos.join(", ")}</p>
        <p><strong>Localización:</strong> ${d.localizacion}</p>
        <p><strong>Prestado:</strong> ${d.prestado}</p>
        <img src="${d.caratula}" width="100">
        <button class="borrar" data-id="${d.id}">X</button>
      </div>
    `;
  });
  return plantilla;
};


const borrarDisco = (discos, id) => {
  return discos.filter(disco => disco.id !== id);
};

export {
  recorrerGeneros,
  recorrerPrestado,
  cargarLocalStorage,
  pintarDiscos,
  borrarDisco
};
