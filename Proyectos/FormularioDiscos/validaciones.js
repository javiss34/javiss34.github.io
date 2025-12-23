"use strict";

//El texto tiene que tener mínimo 5 letras
const validarTexto = (texto) => {
  return texto.length >= 5;
};

//Tiene que ser un año válido de 4 cifras
const validarAnio = (anio) => {
  return !isNaN(anio) && anio.length === 4;
};

//Tiene que haber mínimo 1 seleccionado
const validarGenero = (listaGeneros) => {
  for (let i = 0; i < listaGeneros.length; i++) {
    if (listaGeneros[i].checked) {
      return true;
    }
  }
  return false;
};

// Localización ES-001AA
const validarLocalizacion = (localizacion) => {
  const formato = /^ES-\d{3}[A-Z]{2}$/;
  return formato.test(localizacion);
};

export {
  validarTexto,
  validarAnio,
  validarGenero,
  validarLocalizacion
};
