//Calculadora de notas basicas

// CONSTANTES
const UMBRAL_APROBACION = 6;
const UMBRAL_PROMOCION = 8;

// ARRAY PRINCIPAL
let notas = [];

// ESTADO DE LA NOTA
function estadoMateria(nota) {
  if (nota < UMBRAL_APROBACION) return "DESAPROBADA";
  if (nota < UMBRAL_PROMOCION) return "APROBADA";
  return "PROMOCIONADA";
}

// GUARDAR Y CARGAR
function guardar() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function cargar() {
  const data = localStorage.getItem("notas");
  if (data !== null) {
    notas = JSON.parse(data);
  }
}

// ACTUALIZAR LISTA EN EL DOM
function renderLista() {
  const div = document.getElementById("lista");

  if (notas.length === 0) {
    div.innerHTML = "<p>No hay notas cargadas.</p>";
    return;
  }

  let html = "";

  for (let i = 0; i < notas.length; i++) {
    let n = notas[i];
    html += "<p>Nota: " + n + " → " + estadoMateria(n) + "</p>";
  }

  div.innerHTML = html;
}

// MOSTRAR PROMEDIO
function renderPromedio() {
  const p = document.getElementById("promedio");

  if (notas.length === 0) {
    p.innerHTML = "—";
    return;
  }

  let suma = 0;
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i];
  }

  let promedio = suma / notas.length;
  p.innerHTML = promedio;  // sin toFixed
}

// MANEJAR FORMULARIO
document.getElementById("form-nota").addEventListener("submit", function(e) {
  e.preventDefault();

  const input = document.getElementById("input-nota");
  const valor = Number(input.value);

  if (valor >= 1 && valor <= 10) {
    notas.push(valor);
    guardar();
    renderLista();
    renderPromedio();
    input.value = "";
  } else {
    alert("Ingresá una nota entre 1 y 10.");
  }
});

// BOTÓN LIMPIAR
document.getElementById("limpiar").addEventListener("click", function() {
  if (confirm("¿Eliminar todas las notas?")) {
    notas = [];
    guardar();
    renderLista();
    renderPromedio();
  }
});

// INICIO
cargar();
renderLista();
renderPromedio();
