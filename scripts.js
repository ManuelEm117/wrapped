if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/wrapped/sw.js')
      .then((reg) => console.log('Service Worker registrado', reg))
      .catch((err) => console.error('Error registrando SW', err));
  });
}
if (window.matchMedia('(display-mode: standalone)').matches) {
  // Mostrar botón "Ver resumen de nuestro año"
}
