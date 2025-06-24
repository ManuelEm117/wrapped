window.addEventListener('DOMContentLoaded', () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true; // para iOS antiguo

  // Ocultamos ambas pantallas al inicio
  document.getElementById('instrucciones').style.display = 'none';
  document.getElementById('app').style.display = 'none';

  if (isStandalone) {
    // Si está anclado, mostramos la pantalla de app
    document.getElementById('app').style.display = 'block';
  } else {
    // Si NO está anclado, mostramos la pantalla de instrucciones
    document.getElementById('instrucciones').style.display = 'block';
  }

  const btn = document.getElementById('verResumen');
  if (btn) {
    btn.addEventListener('click', () => {
      alert("Aquí empieza el resumen del año ❤️");
      // window.location.href = "wrapped.html";
    });
  }
});
