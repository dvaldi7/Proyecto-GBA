/* RESPONSIVE NAV BUTTON */
document.addEventListener("DOMContentLoaded", () => {
  const myButton = document.querySelector(".button");
  const myNav = document.querySelector(".nav");

  if (myButton && myNav) {
    myButton.addEventListener("click", () => {
      myNav.classList.toggle("activo");
    });
  }

  /* CERRAR MENÚ AL HACER CLIC EN UN ENLACE */
  const menuLinks = document.querySelectorAll('.nav a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (myNav && myNav.classList.contains('activo')) {
        myNav.classList.remove('activo');
      }
    });
  });

  /* SLIDER */
  const slider = document.getElementById("slider");
  const galleryContainer = document.querySelector(".slider-container");
  const slides = document.querySelectorAll(".slider-item");
  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");
  const video = document.getElementById('video');

  // Si no hay slider en esta página, salimos sin errores
  if (!slider || !galleryContainer || slides.length === 0) return;

  let currentIndex = 0;
  const totalImages = slides.length;

  function updateSlide() {
    const offset = -currentIndex * 100;
    galleryContainer.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  function navigate(direction) {
    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    updateSlide();
  }

  // Botones
  if (prevButton) prevButton.addEventListener("click", () => {
    navigate(-1);
    stopAutoplay();
  });
  if (nextButton) nextButton.addEventListener("click", () => {
    navigate(1);
    stopAutoplay();
  });

  // Dots dinámicos
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("slider-dots");
  slider.appendChild(dotsContainer);

  const dots = [];
  for (let i = 0; i < totalImages; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlide();
      stopAutoplay();
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

 // Autoplay
let autoplayInterval = null;
const intervalTime = 5000;

function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
        navigate(1);
    }, intervalTime);
}

//  detener el autoplay
function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}

// play del video para detener el slider.
if (video) {
    video.addEventListener('play', () => {
        stopAutoplay();
    });

    // pause para reanudarlo.
    video.addEventListener('pause', () => {
        startAutoplay();
    });
}

startAutoplay();
slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", () => startAutoplay());
updateSlide();
});