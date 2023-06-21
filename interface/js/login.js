window.onload = init;
var url = "http://localhost:5555";

function init() {
  if (!localStorage.getItem('token-c')) {
    document.querySelector('.btn-primary').addEventListener('click', login);
  } else {
    window.location.href = "profe.html";
  }
}

function login() {
  var email = document.getElementById('input-mail').value;
  var contrasenia = document.getElementById('input-password').value;
  if (validateEmail(email)) {
    if (email && contrasenia) {
      axios.post(url + "/login", {
        "email": email,
        "contrasenia": contrasenia
      })
        .then(res => {
          if (res.data.code === 200) {
            localStorage.setItem("token-c", res.data.message.token);
            if (res.data.message.rol === 'profesor') {
              window.location.href = "profe.html";
            } else {
              window.location.href = "alumno.html";
            }
          } else { alert("Error Email y/o Contraseña Incorrecto"); }
        })
        .catch(err => console.log(err));
    } else { alert("Error faltan campos"); }
  } else { alert('Digita un correo valido'); }
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return String(email)
    .toLowerCase()
    .match(
      re
    );
}