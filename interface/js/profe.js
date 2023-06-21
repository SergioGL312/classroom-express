window.onload = init;
var headers = {};
var url = "http://localhost:5555/p";

function init() {
  if (localStorage.getItem('token-c')) {
    headers = {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token-c')
      }
    }
    loadClases();
    document.getElementById("nueva-clase").addEventListener('click', () => window.location.href = 'nuevaClase.html');
    document.getElementById("log-out").addEventListener('click', logout);
  } else {
    window.location.href = 'index.html';
  }
}

function loadClases() {
  axios.get(url + "/listaCursos", headers)
    .then(function(res) {
        displayClases(res.data.message);
    }).catch(function(err) {
        console.log(err);
    });
}

function displayClases(clases) {
  var contenedor = document.getElementById("contenedor-principal");

  for (let c of clases) {
    let divPadre = document.createElement("div");
    let divHijo = document.createElement("div");
    
    divHijo.classList.add(`id-curso-${c.id}`);
    divHijo.textContent = c.nombre_clase;
    divHijo.style.cursor = "pointer";
    divHijo.onclick = function() {
      window.location.href = `materia.html?id=${c.id}`;
    };

    divPadre.appendChild(divHijo);
    contenedor.appendChild(divPadre);
  }
}

function logout() {
  localStorage.removeItem('token-c');
  window.location.href = 'index.html';
}