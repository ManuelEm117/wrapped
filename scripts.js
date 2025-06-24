// Registrar el Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/wrapped/sw.js')
      .then((reg) => console.log('Service Worker registrado', reg))
      .catch((err) => console.error('Error registrando SW', err));
  });
}

// Mostrar interfaz según el modo
window.addEventListener('DOMContentLoaded', () => {
  const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone === true; // soporte para iOS antiguo

  if (isIos && !isStandalone) {
    document.getElementById('instrucciones').style.display = 'block';
  } else {
    document.getElementById('app').style.display = 'block';
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
