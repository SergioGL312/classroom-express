window.onload = init;
var headers = {};
var urlProfe = "http://localhost:5555/p";
var urlAlumno = "http://localhost:5555/a";
var paramURL = new URLSearchParams(window.location.search);
var id_clase = paramURL.get('id');

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }

    if (localStorage.getItem('rol') === 'profesor') {
      loadTareas('P');
      loadInfoMateria('P');
      document.getElementById('enlace-trabajo').href = `trabajoClase.html?id=${id_clase}`;
    } else if (localStorage.getItem('rol') === 'alumno') {
      loadTareas('A');
      loadInfoMateria('A');
      document.getElementById('enlace-trabajo').style.display = 'none';
    }
    document.getElementById('enlace-tablon').href = `materia.html?id=${id_clase}`;
    document.getElementById('coderater').href = `profe.html?id=${localStorage.getItem('id')}`;
  } else {
    window.location.href = 'index.html';
  }
}

function loadTareas(rol) {
  if (rol === 'P') {
    axios.get(urlProfe + `/tareas=${id_clase}`, headers)
      .then(function (res) {
        displayTareas(res.data.message);
      }).catch(function (err) {
        console.log(err);
      });
  } else if (rol === 'A') {
    axios.get(urlAlumno + `/tareas?idClase=${id_clase}&idUsuario=${localStorage.getItem('id')}`, headers)
      .then(function (res) {
        displayTareas(res.data.message);
      }).catch(function (err) {
        console.log(err);
      });
  }
}

function displayTareas(tareas) {
  var contenedor = document.getElementById("contenedor-tareas");

  for (let t of tareas) {
    let divTareas = document.createElement("div");

    divTareas.textContent = t.titulo_de_la_tarea;
    divTareas.style.cursor = "pointer";
    divTareas.onclick = function () {
      if (localStorage.getItem("rol") === "profesor") {
        window.location.href = `tareasEntregadas.html?id=${t.id}`;
      } else if(localStorage.getItem("rol") === "alumno") {
        window.location.href = `entregarTarea.html?idT=${t.id}&idC=${id_clase}`;
      }
    };
    contenedor.appendChild(divTareas);
  }
}

function loadInfoMateria(rol) {
  if (rol === 'P') {
    axios.get(urlProfe + `/curso=${id_clase}`, headers)
      .then(function (res) {
        displayInfoMateria(res.data.message);
      }).catch(function (err) {
        console.log(err);
      });
  } else if (rol === 'A') {
    axios.get(urlAlumno + `/infoMateria?idClase=${id_clase}&idUsuario=${localStorage.getItem('id')}`, headers)
      .then(function (res) {
        displayInfoMateria(res.data.message);
      }).catch(function (err) {
        console.log(err);
        if (err.response.data.code === 404) {
          plantilla404(err.response.data.message);
        }
      });
  }
}

function displayInfoMateria(info) {
  let titulo = document.getElementById("titulo");
  var divCodigo = document.getElementById("div-codigo-clase");
  titulo.textContent = info[0].nombre_clase;
  if (localStorage.getItem('rol') === 'profesor') {
    let codigo = document.getElementById("codigo-de-clase");
    codigo.textContent = info[0].codigo;
  } else if (localStorage.getItem('rol') === 'alumno') {
    divCodigo.style.display = 'none';
  }
}

function plantilla404(err) {
  var titulo404 = document.createElement('h1');
  var mensaje = document.createElement('h4');

  titulo404.textContent = "404";
  mensaje.textContent = err;

  document.getElementById("contenedor-tareas").appendChild(titulo404);
  document.getElementById("contenedor-tareas").appendChild(mensaje);
}