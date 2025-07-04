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

    const existingClones = container.querySelectorAll(".collage-photo.clone");
    existingClones.forEach((el) => el.remove());

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
    const positions = [];
    const spacing = 160;

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
        const leftPercent = Math.random() * 70 + 10;
        const topPercent = Math.random() * 65 + 10;

        leftPx = (leftPercent / 100) * containerWidth;
        topPx = (topPercent / 100) * containerHeight;

        newBox = {
          left: leftPx,
          top: topPx,
          right: leftPx + imgWidth,
          bottom: topPx + imgHeight,
        };

        attempts++;
        if (attempts > 150) break;
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

      const maxDisp = 150;
      let toX = (Math.random() - 0.5) * 2 * maxDisp;
      let toY = (Math.random() - 0.5) * 2 * maxDisp;

      if (leftPx + toX < 0) toX = -leftPx;
      if (leftPx + imgWidth + toX > containerWidth)
        toX = containerWidth - imgWidth - leftPx;
      if (topPx + toY < 0) toY = -topPx;
      if (topPx + imgHeight + toY > containerHeight)
        toY = containerHeight - imgHeight - topPx;

      img.style.setProperty("--to-x", `${toX}px`);
      img.style.setProperty("--to-y", `${toY}px`);

      const delay = Math.random() * 1.3 + 0.2;

      img.style.animation = `enterPhoto 1.2s ease-out ${delay.toFixed(
        2
      )}s forwards`;

      const totalDelay = (delay + 1.2 + 0.3) * 1000;
      setTimeout(() => {
        img.style.animation = `explodePhoto 1.5s ease-in-out forwards`;

        setTimeout(() => {
          img.style.animation = "none";
          img.style.transform = `translate(${toX}px, ${toY}px)`;

          let direction = 1;
          const amplitudeX = 1.5;
          const amplitudeY = 1.5;
          const duration = 15000;

          const animateSideToSide = () => {
            direction = -direction;
            img.style.transition = `transform ${duration}ms ease-in-out`;
            const offsetX = toX + amplitudeX * direction;
            const offsetY =
              toY + amplitudeY * direction * (Math.random() > 0.5 ? 1 : -1);
            img.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            setTimeout(animateSideToSide, duration);
          };

          animateSideToSide();
        }, 1500);
      }, totalDelay);
    });
  };

  animateCollagePhotos();
});
