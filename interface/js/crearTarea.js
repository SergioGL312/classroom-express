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

    document.getElementById('enlace-tarea').href = `crearTarea.html?id=${id_clase}`;
    document.getElementById('btn-regresar').addEventListener('click', () => window.location.href = `trabajoClase.html?id=${id_clase}`);
    document.getElementById('input-valor').addEventListener('input', verificarInputNumero);
    document.getElementById('btn-nueva-tarea').addEventListener('click', agregar);
  } else {
    window.location.href = 'index.html';
  }
}

function agregar() {
  var titulo = document.getElementById('input-titulo').value;
  var descripcion = document.getElementById('input-description').value;
  var valor = document.getElementById('input-valor').value;
  var fecha = document.getElementById('input-fecha').value;

  if (titulo != "" && valor != "" && fecha != "") {
    axios.post(url + `/crearTarea/`, {
      "titulo": titulo,
      "descripcion": descripcion,
      "valor": valor,
      "fecha_de_vencimiento": fecha,
      "id": id_clase
  })
      .then(res => {
          if (res.data.code === 201) {
              alert(`${res.data.message}`);
              window.location.href = `trabajoClase.html?id=${id_clase}`;
          } else { alert(`${res.data.message}`); }
      })
      .catch(err => { console.log(err); });
  }  else { alert("Valores incompletos") }
}

function verificarInputNumero(event) {
  var input = event.target;
  var valor = input.value;
  var numero = valor.replace(/\D/g, '');
  input.value = numero;
}
