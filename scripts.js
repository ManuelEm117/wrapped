// Mostrar interfaz según el modo
//const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
window.addEventListener("DOMContentLoaded", () => {
  //const isStandalone = true; // para pruebas en PC
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
  if (isStandalone) {
    document.getElementById("app").style.display = "block";
  } else {
    document.getElementById("instrucciones").style.display = "block";
  }

  const btn = document.getElementById("verResumen");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Aquí empieza el resumen del año ❤️");
      // window.location.href = "wrapped.html";
    });
  }

  // --- Animación canvas background ---

  const canvas = document.getElementById("backgroundCanvas");
  const ctx = canvas.getContext("2d");

  let width, height;
  function resize() {
    width = canvas.width = canvas.clientWidth;
    height = canvas.height = canvas.clientHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  // Definimos las figuras (círculos con colores y opacidad)
  class Circle {
    constructor(x, y, r, speedX, speedY, color, alpha) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
      this.alpha = alpha;
      this.dirX = Math.random() < 0.5 ? -1 : 1;
      this.dirY = Math.random() < 0.5 ? -1 : 1;
    }
    update() {
      this.x += this.speedX * this.dirX;
      this.y += this.speedY * this.dirY;
      if (this.x < -this.r || this.x > width + this.r) this.dirX *= -1;
      if (this.y < -this.r || this.y > height + this.r) this.dirY *= -1;
    }
    draw(ctx) {
      ctx.beginPath();
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        this.r * 0.1,
        this.x,
        this.y,
        this.r
      );
      gradient.addColorStop(
        0,
        `rgba(${this.color.r},${this.color.g},${this.color.b},${this.alpha})`
      );
      gradient.addColorStop(
        1,
        `rgba(${this.color.r},${this.color.g},${this.color.b},0)`
      );
      ctx.fillStyle = gradient;
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Convert hex color to RGB object
  function hexToRgb(hex) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  // Colores base
  const greenBase = hexToRgb("#a2ef4a"); // verde claro
  const blueBase = hexToRgb("#0000FF"); // azul puro

  // Creamos un array con círculos variados usando variantes de estos colores
  const circles = [];
  const count = 250;

  for (let i = 0; i < count; i++) {
    // Variar tamaño, velocidad y color (mezcla verde/azul)
    const radius = 60 + Math.random() * 80;
    const speedX = 0.15 + Math.random() * 1;
    const speedY = 0.1 + Math.random() * 1;

    // Mezcla color
    const color = i % 2 === 0 ? greenBase : blueBase;

    // Variar alpha para que sean sutiles
    const alpha = 0.15 + Math.random() * 0.1;

    // Posición inicial aleatoria en el canvas
    const x = Math.random() * width;
    const y = Math.random() * height;

    circles.push(new Circle(x, y, radius, speedX, speedY, color, alpha));
  }

  // Animación ciclo
  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Fondo oscuro suave
    ctx.fillStyle = "#121212";
    ctx.fillRect(0, 0, width, height);

    circles.forEach((c) => {
      c.update();
      c.draw(ctx);
    });

    requestAnimationFrame(animate);
  }
  animate();
});

