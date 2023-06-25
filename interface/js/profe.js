window.onload = init;
var headers = {};
var urlProfe = "http://localhost:5555/p";
var urlAlumno = "http://localhost:5555/a";
var paramURL = new URLSearchParams(window.location.search);
var id = paramURL.get('id');

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }
    if (localStorage.getItem('rol') === "profesor") {
      loadClases("P");
      document.getElementById("nueva-clase").addEventListener('click', () => window.location.href = 'nuevaClase.html');
    } else {
      loadClases("A");
      document.getElementById("nueva-clase").addEventListener('click', () => window.location.href = `nuevaClase.html?idA=${id}`);
    }
    document.getElementById('coderater').href = `profe.html?id=${localStorage.getItem('id')}`;
    document.getElementById("log-out").addEventListener('click', logout);
  } else {
    window.location.href = `index.html?id=${localStorage.getItem('id')}`;
  }
}

function loadClases(rol) {
  if (rol === "P" && id == localStorage.getItem('id')) {
    axios.get(urlProfe + "/listaCursos=" + id, headers)
      .then(function (res) {
        displayClases(res.data.message);
      }).catch(function (err) {
        console.log(err);
      });
  } else if (rol === "A" && id == localStorage.getItem('id')) {
    axios.get(urlAlumno + "/listaCursos=" + id, headers)
      .then(function (res) {
        displayClases(res.data.message);
      }).catch(function (err) {
        console.log(err);
      });
  }

}

function displayClases(clases) {
  var contenedor = document.getElementById("contenedor-principal");

  for (let c of clases) {
    let divPadre = document.createElement("div");
    let divHijo = document.createElement("div");
    let h2Nombre = document.createElement("h2");

    divPadre.classList.add("course");
    divPadre.classList.add(`id-curso-${c.id}`);
    divHijo.classList.add("div-course-name");
    h2Nombre.textContent = c.nombre_clase;
    h2Nombre.classList.add("h2-course-name");
    divHijo.appendChild(h2Nombre);
    divHijo.style.cursor = "pointer";
    divHijo.onclick = function () {
      window.location.href = `materia.html?id=${c.id}`;
    };

    divPadre.appendChild(divHijo);
    contenedor.appendChild(divPadre);
  }
}

function logout() {
  localStorage.clear();
  window.location.href = 'index.html';
}