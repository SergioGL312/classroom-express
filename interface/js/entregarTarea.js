window.onload = init;
var headers = {};
var url = "http://localhost:5555/a";
var paramURL = new URLSearchParams(window.location.search);
var id_tarea = paramURL.get('idT');
var id_clase = paramURL.get('idC');

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }
    loadCalificacion();
    loadInfoMateria();
    loadURL();
    loadRetroalimentacion();
    document.getElementById('btn-subir').addEventListener('click', subirTarea);
    document.getElementById('coderater').href = `profe.html?id=${localStorage.getItem('id')}`;
  } else {
    window.location.href = 'index.html';
  }
}

function loadInfoMateria() {
  axios.get(url + `/infoTarea?idClase=${id_clase}&idUsuario=${localStorage.getItem('id')}&idTarea=${id_tarea}`, headers)
    .then(function (res) {
      displayInfoMateria(res.data.message);
    }).catch(function (err) {
      console.log(err);
    });
}

function displayInfoMateria(info) {
  var titulo = document.getElementById("titulo");
  var descripcion = document.getElementById("descripcion");

  titulo.textContent = info[0].titulo_de_la_tarea;
  descripcion.textContent = info[0].descripcion;
}

function subirTarea() {
  var url_repo = document.getElementById('githubLink').value;
  var validacionResult = validarGitHubLink();
  if (validacionResult[0]) {
    axios.post(url + `/subirTarea/`, {
      "id_tarea": id_tarea,
      "fecha": obtenerFechaActual(),
      "url_repo": url_repo,
      "id_estudiante": localStorage.getItem("id")
    })
      .then(res => {
        if (res.data.code === 201) {
          alert(`${res.data.message}`);
          window.location.href = `materia.html?id=${id_clase}`;
        } else { alert(`${res.data.message}`); }
      })
      .catch(err => { console.log(err); });
  } else {
    alert(validacionResult[1]);
  }
}

function loadURL() {
  axios.get(url + `/urlExistente?idTarea=${id_tarea}&idEstudiante=${localStorage.getItem('id')}`, headers)
    .then(function (res) {
      var input = document.getElementById('githubLink');
      if (Array.isArray(res.data.message) && res.data.message.length > 0 && res.data.message[0].url_repo !== undefined) {
        input.value = res.data.message[0].url_repo;
      } else {
        input.value = '';
      }
    }).catch(function (err) {
      console.log(err);
    });
}


function loadRetroalimentacion() {
  axios.get(url + `/retroalimentacion?idTarea=${id_tarea}&idEstudiante=${localStorage.getItem('id')}`, headers)
    .then(function (res) {
      var comentario = document.getElementById('input-retroalimentacion');
      comentario.disabled = true;
      if (Array.isArray(res.data.message) && res.data.message.length > 0 && res.data.message[0].retroalimentacion !== null) {
        comentario.textContent = res.data.message[0].retroalimentacion;
      } else {
        comentario.textContent = '';
      }
    }).catch(function (err) {
      console.log(err);
    });
}

function loadCalificacion() {
  axios.get(url + `/califExistente?idTarea=${id_tarea}&idEstudiante=${localStorage.getItem("id")}`, headers)
    .then(function (res) {
      var elementoCalif = document.getElementById('calificacion');
      if (res.data.message == "-") {
        elementoCalif.textContent = res.data.message;
      } else {
        elementoCalif.textContent = res.data.message[0].calificacion + "/" + res.data.message[0].valor;
      }
    }).catch(function (err) {
      console.log(err);
    });
}

function validarGitHubLink() {
  var githubLinkInput = document.getElementById('githubLink');
  var githubLink = githubLinkInput.value.trim();

  var githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/; // \.git

  if (githubRegex.test(githubLink)) {
    return [true, ''];
  } else {
    return [false, 'Intente de nuevo: El enlace debe ser válido de GitHub'];
  }
}

function obtenerFechaActual() {
  var fecha = new Date();
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var anio = fecha.getFullYear();
  var hora = fecha.getHours();
  var minutos = fecha.getMinutes();
  var segundos = fecha.getSeconds();

  var fechaActual = anio + '-' + mes + '-' + dia + ' ' + hora + ':' + minutos + ':' + segundos; // Formato de fecha y hora: aaaa/mm/dd hh:mm:ss

  return fechaActual;
}