let APP_CONFIG = null;

async function cargarConfig() {
  try {
    const res = await fetch("data/config.json");
    if (!res.ok) {
      throw new Error("No se pudo cargar config.json");
    }
    APP_CONFIG = await res.json();
    return APP_CONFIG;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo cargar la configuración del simulador."
    });
    APP_CONFIG = null;
    return null;
  } finally {
  }
}
