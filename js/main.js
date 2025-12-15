let notas = [];

// --- LocalStorage ---
function guardarNotas() {
  localStorage.setItem("notas", JSON.stringify(notas));
}

function cargarNotas() {
  const data = localStorage.getItem("notas");
  if (data !== null) {
    notas = JSON.parse(data);
  }
}

// --- Lógica ---
function estadoMateria(nota) {
  const umbralAprobacion = APP_CONFIG.umbralAprobacion;
  const umbralPromocion = APP_CONFIG.umbralPromocion;

  if (nota < umbralAprobacion) {
    return "DESAPROBADA";
  } else if (nota < umbralPromocion) {
    return "APROBADA";
  } else {
    return "PROMOCIONADA";
  }
}

// --- Inicialización ---
async function init() {
  // config de JSON
  const config = await cargarConfig();

  if (!config) {
    return; // si no hay config, no iniciamos la app
  }

  // Cargar notas guardadas
  cargarNotas();

  // Render inicial
  renderLista(notas, estadoMateria);
  renderPromedio(notas);

  // --- Agregar nota ---
  document
    .getElementById("form-nota")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const input = document.getElementById("input-nota");
      const valor = Number(input.value);

      if (valor >= 1 && valor <= 10) {
        notas.push(valor);
        guardarNotas();

        renderLista(notas, estadoMateria);
        renderPromedio(notas);

        Swal.fire({
          icon: "success",
          title: "Nota registrada",
          text: `Nota: ${valor} → ${estadoMateria(valor)}`,
          timer: 1200,
          showConfirmButton: false,
        });

        input.value = "";
        input.focus();
      } else {
        Swal.fire({
          icon: "warning",
          title: "Dato inválido",
          text: "Ingresá una nota entre 1 y 10.",
        });
      }
    });

  // --- Limpiar todo ---
  document
    .getElementById("limpiar")
    .addEventListener("click", async function () {
      const result = await Swal.fire({
        icon: "question",
        title: "¿Eliminar todas las notas?",
        text: "Esta acción no se puede deshacer.",
        showCancelButton: true,
        confirmButtonText: "Sí, borrar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        notas = [];
        guardarNotas();
        renderLista(notas, estadoMateria);
        renderPromedio(notas);

        Swal.fire({
          icon: "success",
          title: "Notas eliminadas",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
}

// --- Incio app ---
init();