function validar(id) {
  const correo = document.getElementById("correo").value;
  const contraseña = document.getElementById("contraseña").value;

  if (correo && contraseña) {
    swal({
      title: "¡Bien hecho!",
      text: "Datos completos.",
      icon: "success",
      button: "Aceptar",
    }).then(() => {
      // Sólo se llama a registro si swal se ha cerrado correctamente
      registro();
    });
    return true;
  } else
    swal({
      title: "ops lose !",
      text: "te faltan datos!",
      icon: "error",
      button: "ok",
    });
}

/* function registro() {
  const user = document.getElementById("correo").value;
  const pass = document.getElementById("contraseña").value;

  if (user == "kevin@gmail.com" && pass == "1234") {
    window.location.href = "http://127.0.0.1:3000/tabla%20beta/beta3.html";
  } else {
    alert("datos incorrectos");
  }
} */

function iniciarSesion(event) {
  event.preventDefault(); // Evitamos que el formulario se envíe de inmediato
  validar();
}
