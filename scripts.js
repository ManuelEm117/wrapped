// Mostrar interfaz según el modo
window.addEventListener('DOMContentLoaded', () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

  if (isStandalone) {
    // Si está en modo standalone, muestra la pantalla de la app
    document.getElementById('app').style.display = 'block';
  } else {
    // Si no está en modo standalone, muestra la pantalla de instrucciones
    document.getElementById('instrucciones').style.display = 'block';
  }

  const btn = document.getElementById('verResumen');
  if (btn) {
    btn.addEventListener('click', () => {
      // Aquí rediriges o inicias tu wrapped
      alert("Aquí empieza el resumen del año ❤️");
      // window.location.href = "wrapped.html";
    });
  }
});
