const generarTabla = (tamaño, contenedor) => {

    const tabla = document.createElement("table");
    tabla.classList.add("tabla");

    const tbody = document.createElement("tbody");

    for (let i = 0; i < tamaño; i++) {
        const fila = document.createElement("tr");

        for (let j = 0; j < tamaño; j++) {
            const celda = document.createElement("td");
            fila.appendChild(celda);
        }

        tbody.appendChild(fila);
    }

    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
};

export { generarTabla };
