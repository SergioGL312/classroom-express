window.onload = init;
var headers = {};
var url = "http://localhost:5555";
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
  axios.get(url + `/p/tareasAlumnosNombres=${id_tarea}`, headers)
    .then(function (res) {
      console.log(res);
      displayTodasTareas(res.data.message);
    }).catch(function (err) {
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