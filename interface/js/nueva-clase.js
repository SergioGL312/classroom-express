window.onload = init;
var headers = {};
var urlProfe = "http://localhost:5555/p";
var urlAlumno = "http://localhost:5555/a";
var paramURL = new URLSearchParams(window.location.search);
var id = paramURL.get('idA');

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }

    if (localStorage.getItem('rol') === 'profesor') {
      document.getElementById('btn-registrar').addEventListener('click', registrar);
    } else {
      document.getElementById('div-nombre').style.display = 'none';
      document.getElementById('div-descripcion').style.display = 'none';
      document.getElementById('div-codigo').style.display = 'contents';
      document.getElementById('btn-registrar').addEventListener('click', registrarseAClase);
    }
  } else {
    window.location.href = "index.html";
  }
}

function registrar() {
  var nombre = document.getElementById('input-nombre').value;
  var descripcion = document.getElementById('input-descripcion').value;
  if (nombre != "") {
    axios.post(urlProfe + "/crearCurso/", {
      "nombre_clase": nombre,
      "descripcion": descripcion,
      "id_profesor_a_cargo": localStorage.getItem("id")
    })
      .then(res => {
        if (res.data.code === 201) {
          alert(`${res.data.message}`);
          window.location.href = `profe.html?id=${localStorage.getItem('id')}`;
        } else { alert(`${res.data.message}`); }
      })
      .catch(err => { console.log(err); });
  } else { alert("Valores incompletos") }
}

function registrarseAClase() {
  var codigo = document.getElementById('input-codigo').value;
  if (id == localStorage.getItem('id')) {
    if (!codigo.length < 6 || !codigo.length > 6) {
      axios.post(urlAlumno + "/inscribirse/", {
        "id_usuario": id,
        "codigo": codigo
      })
        .then(res => {
          if (res.data.code === 201) {
            alert(`${res.data.message}`);
            window.location.href = `profe.html?id=${id}`;
          } else { alert(`${res.data.message}`); }
        })
        .catch(err => { console.log(err); });
    } else { alert("Deben de ser 6 digitos"); }
  }
}