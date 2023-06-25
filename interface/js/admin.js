window.onload = init;
var headers = {};
var url = "http://localhost:5555/admin";

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }

    document.getElementById('btn-enviar').addEventListener('click', crearUsuario);

  } else {
    window.location.href = 'index.html';
  }
}

function crearUsuario() {
  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var contrasenia = document.getElementById('contraseña').value;
  var rol = document.getElementById('rol').value;

  if (validateEmail(email)) {
    if (nombre && email && contrasenia && rol) {
      axios.post(url + `/nuevoUsuario/`, {
        "nombre": nombre,
        "email": email,
        "contrasenia": contrasenia,
        "rol": rol
      })
        .then(res => {
          if (res.data.code === 201) {
            alert(`${res.data.message}`);
            window.location.href = "admin.html";
          } else { alert(`${res.data.message}`); }
        })
        .catch(err => { console.log(err); });
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