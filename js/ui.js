function setStatus(texto, tipo) {
  const status = document.getElementById("status");
  status.textContent = texto;

  status.classList.remove("ok", "err");
  if (tipo === "ok") status.classList.add("ok");
  if (tipo === "err") status.classList.add("err");
}

function renderLista(notas, getEstado) {
  const div = document.getElementById("lista");

  if (notas.length === 0) {
    div.innerHTML = "<p>No hay notas cargadas.</p>";
    return;
  }

  const html = notas
    .map((n) => `<p>Nota: <strong>${n}</strong> → ${getEstado(n)}</p>`)
    .join("");

  div.innerHTML = html;
}

function renderPromedio(notas) {
  const p = document.getElementById("promedio");

  if (notas.length === 0) {
    p.textContent = "—";
    return;
  }

  let suma = 0;
  for (let i = 0; i < notas.length; i++) suma += notas[i];

  const promedio = suma / notas.length;
  p.textContent = String(promedio);
}
