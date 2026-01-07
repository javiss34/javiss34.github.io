"use strict";

import {
  recorrerGeneros,
  recorrerPrestado,
  cargarLocalStorage,
  pintarDiscos,
  borrarDisco,
} from "./biblioteca.js";

import {
  validarTexto,
  validarAnio,
  validarGenero,
  validarLocalizacion,
} from "./validaciones.js";

window.onload = () => {
  const formulario = document.forms.formularioPrincipal;
  const formularioSecundario = document.forms.formularioSecundario;

  //Campos
  const nombre = formulario.nombre;
  const caratula = formulario.caratula;
  const interprete = formulario.grupoOInterprete;
  const anio = formulario.anioPublicacion;
  const localizacion = formulario.localizacion;

  //Listas
  const listaGeneros = document.getElementsByName("genero");
  const listaPrestado = document.getElementsByName("boleano");

  //Zonas
  const zonaErrores = document.getElementById("zonaErrores");
  const zonaMostrar = document.getElementById("zonaMostrar");
  const textoBuscar = document.getElementById("textoBuscar");

  let discos = cargarLocalStorage();

  //Delegación de evntos para el formulario principal
  formulario.addEventListener("click", (e) => {
    //Guardar
    if (e.target.id === "guardar") {
      e.preventDefault();
      zonaErrores.innerHTML = "";

      let errores = [];

      if (!validarTexto(nombre.value)) {
        errores = [...errores, "Nombre no válido (mínimo 5 caracteres)"];
      }

      if (!validarTexto(interprete.value)) {
        errores = [...errores, "Intérprete no válido (mínimo 5 caracteres)"];
      }

      if (!validarAnio(anio.value)) {
        errores = [...errores, "Año no válido"];
      }

      if (!validarGenero(listaGeneros)) {
        errores = [...errores, "Debes seleccionar al menos un género"];
      }

      if (!validarLocalizacion(localizacion.value)) {
        errores = [...errores, "Localización incorrecta (ES-001AA)"];
      }

      if (errores.length > 0) {
        errores.forEach((error) => {
          const p = document.createElement("p");
          p.textContent = error;
          zonaErrores.appendChild(p);
          zonaErrores.classList.add("error");
        });
      } else {
        const nuevoDisco = {
          id: crypto.randomUUID(),
          nombre: nombre.value,
          caratula: caratula.value,
          interprete: interprete.value,
          anioPubli: anio.value,
          generos: recorrerGeneros(listaGeneros),
          localizacion: localizacion.value,
          prestado: recorrerPrestado(listaPrestado),
        };

        discos = [...discos, nuevoDisco];
        localStorage.setItem("discos", JSON.stringify(discos));
        formulario.reset();
        zonaMostrar.innerHTML = "";
      }
    }

    //Mostrar
    if (e.target.id === "mostrar") {
      if(discos.length){
        zonaMostrar.innerHTML = pintarDiscos(discos);
        zonaMostrar.classList.add("mostrar");
      }else{
        zonaMostrar.innerHTML = "No hay discos";
        zonaMostrar.classList.add("mostrar");

      }
    }
  });

  //Delegación de eventos para el formulario secundario
  formularioSecundario.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.id === "buscar") {
      const filtrados = discos.filter((d) =>
        d.nombre.toLowerCase().includes(textoBuscar.value.toLowerCase())
      );
      if(filtrados.length>0){
        zonaMostrar.innerHTML = pintarDiscos(filtrados);
        zonaMostrar.classList.add("mostrar");
      }else{
        zonaMostrar.innerHTML = "No se puede encontrar el disco buscado";
        zonaMostrar.classList.add("mostrar");
      }
    }
    if (e.target.id === "limpiar") {
    zonaMostrar.innerHTML = pintarDiscos(discos);
    textoBuscar.value = "";
  }
  });


  //Delegación de eventos para la zona mostrar
  zonaMostrar.addEventListener("click", (e) => {
    if (e.target.classList.contains("borrar")) {
      if (confirm("¿Quieres borrar este disco?")) {
        discos = borrarDisco(discos, e.target.dataset.id);
        localStorage.setItem("discos", JSON.stringify(discos));
        zonaMostrar.innerHTML = pintarDiscos(discos);
      }
    }
  });
};
