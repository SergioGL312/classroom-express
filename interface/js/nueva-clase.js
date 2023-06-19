window.onload = init;
var headers = {};
var url = "http://localhost:5555/p/";

function init() {
    if (localStorage.getItem('token-c')) {
        headers = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token-c')
            }
        }
        document.getElementById('registrar').addEventListener('click', registrar);
    } else {
        window.location.href = "index.html";
    }
}

function registrar() {
    var nombre = document.getElementById('input-name').value;
    var descripcion = document.getElementById('input-description').value;
    if (nombre != "") {
        axios.post(url + "/crearCurso/", {
            "nombre_clase": nombre,
            "descripcion": descripcion
        })
            .then(res => {
                if (res.data.code === 201) {
                    alert(`${res.data.message}`);
                    window.location.href = "profe.html";
                } else { alert(`${res.data.message}`); }
            })
            .catch(err => { console.log(err); });
    } else { alert("Valores incompletos") }
}