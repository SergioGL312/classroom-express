window.onload = init;
var headers = {};
var url = "http://localhost:5555/p";
var paramURL = new URLSearchParams(window.location.search);
var id_tarea = paramURL.get('id');

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }
  loadTareas();
  } else {
    window.location.href = 'index.html';
  }
}

function loadTareas() {
  axios.get(url + `/tareasAlumnosNombres=${id_tarea}`, headers)
    .then(function (res) {
      displayTodasTareas(res.data.message);
    }).catch(function (err) {
      if (err.response.data.code === 404) {
        var titulo404 = document.createElement('h1');
        var mensaje = document.createElement('h4');
        
        titulo404.textContent = "404";
        mensaje.textContent = err.response.data.message;
        
        document.getElementById("contenedor-principal").appendChild(titulo404);
        document.getElementById("contenedor-principal").appendChild(mensaje);
      }
      console.log(err);
    });
}

function displayTodasTareas(alumnosTareaEntregada) {
  var contenedor = document.getElementById("contenedor-principal");

  for (let a of alumnosTareaEntregada) {
    let divNombreAlumno = document.createElement("div");

    divNombreAlumno.textContent = a.nombre;
    divNombreAlumno.style.cursor = "pointer";
    divNombreAlumno.onclick = function () {
      window.location.href = `archivos.html?id=${a.id}`;
    };

    contenedor.appendChild(divNombreAlumno);
  }
}