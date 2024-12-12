// Variables globales
let total = 0;

// Función para habilitar el botón de agregar producto
document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    const allInputsFilled = Array.from(
      document.querySelectorAll(".formulario input")
    ).every((input) => input.value);
    document.getElementById("btn-agregar").disabled = !allInputsFilled;
  });
});

// Función para agregar un producto a la tabla
document.getElementById("btn-agregar").addEventListener("click", () => {
  const producto = document.getElementById("producto").value;
  const peso = parseFloat(document.getElementById("peso").value);
  const precio = parseFloat(document.getElementById("precio").value);
  const iva = parseFloat(document.getElementById("iva").value) / 100; // Convertir a decimal
  const subtotal = peso * precio;
  const totalConIva = subtotal + subtotal * iva;

  // Crear una nueva fila en la tabla
  const nuevaFila = document.createElement("tr");
  nuevaFila.innerHTML = `
    <td>${producto}</td>
    <td>${peso.toFixed(2)}</td>
    <td>${precio.toFixed(2)}</td>
    <td>${totalConIva.toFixed(2)}</td>
    <td><button class="btn-eliminar">Eliminar</button></td>
  `;

  document.getElementById("tabla-productos").appendChild(nuevaFila);

  // Actualizar total
  total += totalConIva;
  document.getElementById("total-final").innerText = total.toFixed(2);

  // Limpiar campos
  document.getElementById("producto").value = "";
  document.getElementById("peso").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("iva").value = "";

  // Deshabilitar botón después de agregar
  document.getElementById("btn-agregar").disabled = true;

  // Agregar evento para eliminar fila
  nuevaFila
    .querySelector(".btn-eliminar")
    .addEventListener("click", function () {
      const fila = this.closest("tr");
      const valorFila = parseFloat(fila.cells[3].innerText); // Obtener el valor total con IVA de la fila
      total -= valorFila; // Restar el valor al total
      document.getElementById("total-final").innerText = total.toFixed(2);
      fila.remove(); // Eliminar la fila
    });
});

// Función para limpiar la tabla
function limpiarTabla() {
  document.getElementById("tabla-productos").innerHTML = "";
  total = 0;
  document.getElementById("total-final").innerText = "0.00";
  document.getElementById("codigo-factura").innerText = "";
  document
    .querySelectorAll(".formulario input")
    .forEach((input) => (input.value = ""));
  document.querySelector(".factura").style.display = "none";
}

// Función para generar factura
function generarFactura() {
  const codigoFactura = `FAC-${Date.now()}`; // Generar un código único
  document.getElementById("codigo-factura").innerText = codigoFactura;

  // Obtener datos del cliente
  const nombreCliente = document.getElementById("nombre-cliente").value;
  const direccionCliente = document.getElementById("direccion-cliente").value;

  // Mostrar datos en la factura
  document.getElementById("nombre-cliente-factura").innerText = nombreCliente;
  document.getElementById("direccion-cliente-factura").innerText =
    direccionCliente;

  // Copiar productos a la factura
  const productos = document.getElementById("tabla-productos").children;
  const tablaFactura = document.getElementById("tabla-productos-factura");
  tablaFactura.innerHTML = ""; // Limpiar tabla de la factura

  for (let row of productos) {
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = row.innerHTML; // Copiar contenido
    tablaFactura.appendChild(nuevaFila);
  }

  document.getElementById("total-final-factura").innerText = total.toFixed(2);
  document.querySelector(".factura").style.display = "block";
}

// Función para imprimir la factura
function imprimirFactura() {
  // Usar la URL del logo predeterminado
  const logoUrl = "ruta-del-logo/logo-predeterminado.png";

  const facturaContents = `
     <div class="factura">
        <div style="text-align: center; margin-bottom: 20px;">
           <img id="logo" src="${logoUrl}" style="width: 100px; height: 100px;" alt="Logo de la empresa">
        </div>
        ${document.querySelector(".factura").innerHTML}
     </div>
  `;

  const ventana = window.open("", "_blank");
  ventana.document.write(`
     <html>
     <head>
        <title>Factura</title>
        <style>
           @media print {
              body {
                 font-family: Arial, sans-serif;
                 margin: 0;
                 padding: 20px;
              }
              .factura {
                 width: 100%;
                 border: 1px solid #ccc;
                 padding: 20px;
                 box-shadow: 0 0 10px rgba(0,0,0,0.1);
                 max-width: 800px;
                 margin: 0 auto;
              }
              .factura img {
                 max-width: 100px;
                 height: auto;
              }
              table {
                 width: 100%;
                 border-collapse: collapse;
                 margin-bottom: 20px;
              }
              table, th, td {
                 border: 1px solid #ddd;
              }
              th, td {
                 padding: 10px;
                 text-align: left;
              }
              .total {
                 text-align: right;
                 margin-top: 20px;
              }
              .no-imprimir {
                 display: none;
              }
           }
        </style>
     </head>
     <body>
        ${facturaContents}
     </body>
     </html>
  `);
  ventana.document.close();
  ventana.focus();
  ventana.print();
  ventana.close();
}

// Función para abrir el modal de cerrar sesión
function abrirModal() {
  document.getElementById("modal-cerrar").style.display = "block";
}

// Función para cerrar el modal
function cerrarModal() {
  document.getElementById("modal-cerrar").style.display = "none";
}

// Función para confirmar el cierre de sesión
function confirmarCerrarSesion() {
  alert("Has cerrado sesión"); // Muestra un mensaje de alerta
  cerrarModal(); // Cierra el modal
  window.location.href = "index.html"; // Redirige a la página de inicio
}

// Función para eliminar todos los productos
document.getElementById("btn-eliminar-todos").addEventListener("click", () => {
  limpiarTabla(); // Llama a la función limpiarTabla para eliminar todos los productos
});

function registro(){
  window.location.href = "crud.html";
}