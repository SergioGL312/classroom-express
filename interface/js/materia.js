window.onload = init;
var headers = {};
var url = "http://localhost:5555";
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
    loadInfoMateria();
  } else {
    window.location.href = 'index.html';
  }
}

function loadTareas() {
  axios.get(url + `/p/tareas=${id_clase}`, headers)
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
    divTareas.onclick = function() {
      window.location.href = `tarea.html?id=${t.id}`;
    };

    contenedor.appendChild(divTareas);
  }
}

function loadInfoMateria() {
  axios.get(url + `/p/curso=${id_clase}`, headers)
    .then(function (res) {
      displayInfoMateria(res.data.message);
    }).catch(function (err) {
      console.log(err);
    });
}

function displayInfoMateria(info) {
  let titulo = document.getElementById("titulo");
  let codigo = document.getElementById("codigo-de-clase");

  titulo.textContent = info[0].nombre_clase;
  codigo.textContent = info[0].codigo;
}