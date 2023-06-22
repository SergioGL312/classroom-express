window.onload = init;
var headers = {};
var url = "http://localhost:5555/p";
var paramURL = new URLSearchParams(window.location.search);
var id_clase = paramURL.get('id');


function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }
    loadTareas();
    document.getElementById('enlace-tablon').href = `materia.html?id=${id_clase}`;
    document.getElementById('enlace-trabajo').href = `trabajoClase.html?id=${id_clase}`;
    document.getElementById('btn-crear-clase').addEventListener('click', () => window.location.href = `crearTarea.html?id=${id_clase}`);
  } else {
    window.location.href = 'index.html';
  }
}

function loadTareas() {
  axios.get(url + `/tareas=${id_clase}`, headers)
    .then(function (res) {
      displayTareas(res.data.message);
    }).catch(function (err) {
      console.log(err);
    });
}

function displayTareas(tareas) {
  var contenedor = document.getElementById("contenedor-tareas");

  for (let t of tareas) {
    let divTareas = document.createElement("div");

    divTareas.textContent = t.titulo_de_la_tarea;
    divTareas.style.cursor = "pointer";
    divTareas.onclick = function () {
      window.location.href = `tareasEntregadas.html?id=${t.id}`;
    };

    contenedor.appendChild(divTareas);
  }
}