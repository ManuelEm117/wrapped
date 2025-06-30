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
});
