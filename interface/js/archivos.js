window.onload = init;
var headers = {};
var url = "http://localhost:5555/p";
var paramURL = new URLSearchParams(window.location.search);
var id_entrega_de_tarea = paramURL.get('idTE');
var id_estudiante = paramURL.get('idEs');
var id_tarea = paramURL.get('idT');

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }
    loadGitHUb();
    loadCalificacion();
    loadRetroalimentacion();

    document.getElementById('coderater').href = `profe.html?id=${localStorage.getItem('id')}`;
    document.getElementById('calificacion').addEventListener('input', verificarInputNumero);
    document.getElementById('btn-calif').addEventListener('click', calificar);
  } else {
    window.location.href = 'index.html';
  }
}

function loadGitHUb() {
  axios.get(url + `/archivosId?idUsuario=${id_estudiante}&idTarea=${id_entrega_de_tarea}`, headers)
    .then(function (res) {
      var aElement = document.getElementById('archivo-actual');
      aElement.href = res.data.message[0].url_repo;
      aElement.textContent = res.data.message[0].url_repo;

      var encodedUrl = encodeURIComponent(res.data.message[0].url_repo);
      document.getElementById('generar-uml').addEventListener('click', () => {
        window.location.href = `http://localhost:3000/generate?r=${encodedUrl}`
      });

    }).catch(function (err) {
      console.log(err);
    });
}

function loadCalificacion() {
  axios.get(url + `/califExistente?idTarea=${id_tarea}&idEstudiante=${id_estudiante}`, headers)
    .then(function (res) {
      var inputCalif = document.getElementById('calificacion');
      if (Array.isArray(res.data.message) && res.data.message.length > 0 && res.data.message[0].calificacion !== undefined) {
        inputCalif.value = res.data.message[0].calificacion;
      } else {
        inputCalif.value = '';
      }
    }).catch(function (err) {
      console.log(err);
    });
}

function loadRetroalimentacion() {
  axios.get(url + `/retroExistente?idTarea=${id_tarea}&idEstudiante=${id_estudiante}`, headers)
    .then(function (res) {
      var inputRetro = document.getElementById('comentario-privado');
      if (Array.isArray(res.data.message) && res.data.message.length > 0 && res.data.message[0].retroalimentacion !== undefined) {
        inputRetro.value = res.data.message[0].retroalimentacion;
      } else {
        inputRetro.value = '';
      }
    }).catch(function (err) {
      console.log(err);
    });
}

function calificar() {
  var calif = document.getElementById('calificacion').value;
  var retro = document.getElementById('comentario-privado').value;

  if (calif !== '') {
    axios.post(url + `/calificar/`, {
      "id_tarea": id_tarea,
      "id_estudiante": id_estudiante,
      "calificacion": calif
    })
      .then(res => {
        if (res.data.code === 201) {
          alert(`${res.data.message}`);
          window.location.href = `tareasEntregadas.html?id=${id_tarea}`;
        } else { alert(`${res.data.message}`); }
      })
      .catch(err => { console.log(err); });
    axios.put(url + `/retroalimentacion/`, {
      "id_tarea": id_tarea,
      "id_estudiante": id_estudiante,
      "retroalimentacion": retro
    })
      .then(res => {
        if (res.data.code === 201) {
          alert(`${res.data.message}`);
          window.location.href = `tareasEntregadas.html?id=${id_tarea}`;
        } else { alert(`${res.data.message}`); }
      })
      .catch(err => { console.log(err); });
  } else { alert("Ingrese una calificación") }
}

function verificarInputNumero(event) {
  var input = event.target;
  var valor = input.value;
  var numero = valor.replace(/\D/g, '');
  input.value = numero;
}
