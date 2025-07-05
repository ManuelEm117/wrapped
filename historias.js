document.addEventListener("DOMContentLoaded", () => {
  const stories = document.querySelectorAll(".story");

  // Crear barritas dinámicamente
  const progressContainer = document.getElementById("progress-bars");

  stories.forEach(() => {
    const bar = document.createElement("div");
    bar.classList.add("progress-bar");

    const fill = document.createElement("div");
    fill.classList.add("fill");

    bar.appendChild(fill);
    progressContainer.appendChild(bar);
  });

  const progressBars = document.querySelectorAll(".progress-bar .fill");

  let currentIndex = 0;
  let pause = false;
  let holdTimer;

  const showStory = (index) => {
    stories.forEach((story, i) => {
      story.classList.toggle("active", i === index);
      progressBars[i].style.width =
        i < index ? "100%" : i === index ? "100%" : "0%";
    });
  };

  const nextStory = () => {
    if (pause || currentIndex >= stories.length - 1) return;
    currentIndex++;
    showStory(currentIndex);
  };

  const prevStory = () => {
    if (pause || currentIndex <= 0) return;
    currentIndex--;
    showStory(currentIndex);
  };

  const storyContainer = document.getElementById("story-container");

  storyContainer.addEventListener("touchstart", (e) => {
    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;

    holdTimer = setTimeout(() => {
      pause = true;
    }, 300);

    storyContainer.addEventListener(
      "touchend",
      () => {
        clearTimeout(holdTimer);

        if (!pause) {
          if (touchX > screenWidth / 2) {
            nextStory();
          } else {
            prevStory();
          }
        }

        pause = false;
      },
      { once: true }
    );
  });

  showStory(currentIndex);
  const animateCollagePhotos = () => {
    const container = document.querySelector(".story-1 .photo-collage");

    // Elimina clones anteriores
    const existingClones = container.querySelectorAll(".collage-photo.clone");
    existingClones.forEach((el) => el.remove());

    // Prepara originales y duplicados
    const originalPhotos = Array.from(
      container.querySelectorAll(".collage-photo:not(.clone)")
    );
    const photos = [];

    for (let i = 0; i < 4; i++) {
      originalPhotos.forEach((photo) => {
        const clone = photo.cloneNode(true);
        clone.classList.add("clone");
        container.appendChild(clone);
        photos.push(clone);
      });
    }

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const spacing = 180; // más espacio mínimo entre fotos
    const positions = [];

    const isTooClose = (newBox) => {
      return positions.some((existing) => {
        return !(
          newBox.right + spacing < existing.left - spacing ||
          newBox.left - spacing > existing.right + spacing ||
          newBox.bottom + spacing < existing.top - spacing ||
          newBox.top - spacing > existing.bottom + spacing
        );
      });
    };

    photos.forEach((img) => {
      const imgWidth = 120;
      const imgHeight = 120;

      let attempts = 0;
      let leftPx, topPx, newBox;

      do {
        // Usamos rangos más amplios para que algunas fotos vayan más a los bordes
        const leftPercent = Math.random() * 75; // antes era 70+10
        const topPercent = Math.random() * 90; // antes era 65+10

        leftPx = (leftPercent / 100) * containerWidth;
        topPx = (topPercent / 100) * containerHeight;

        newBox = {
          left: leftPx,
          top: topPx,
          right: leftPx + imgWidth,
          bottom: topPx + imgHeight,
        };

        attempts++;
        if (attempts > 200) break; // más intentos para conseguir buen espaciado
      } while (isTooClose(newBox));

      positions.push(newBox);

      img.style.left = `${leftPx}px`;
      img.style.top = `${topPx}px`;

      const directions = [
        { x: "0px", y: "-100vh" },
        { x: "0px", y: "100vh" },
        { x: "-100vw", y: "0px" },
        { x: "100vw", y: "0px" },
      ];
      const enterDir =
        directions[Math.floor(Math.random() * directions.length)];

      img.style.setProperty("--from-x", enterDir.x);
      img.style.setProperty("--from-y", enterDir.y);

      // Añadimos más variedad al `delay` y duración para evitar solapamientos animados
      const delay = Math.random() * 1.2 + 0.2;
      const duration = Math.random() * 0.6 + 0.9;

      img.style.animation = `enterPhoto ${duration.toFixed(
        2
      )}s ease-out ${delay.toFixed(2)}s forwards`;
    });
  };

  animateCollagePhotos();
});
