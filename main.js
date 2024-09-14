/* RESPONSIVE NAV BUTTON */

const myButton = document.querySelector(".button");
const myNav = document.querySelector(".nav");

myButton.addEventListener("click", () => {
    myNav.classList.toggle("activo");
    
});

/* SLIDER */ 

let currentIndex = 0;

document.querySelector('.prev-button').addEventListener('click', () => {
    navigate(-1);
});

document.querySelector('.next-button').addEventListener('click', () => {
    navigate(1);
});

function navigate(direction) {
    const galleryContainer = document.querySelector('.slider-container');
    const totalImages = document.querySelectorAll('.slider-item').length;
    
    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    const offset = -currentIndex * 100;
    
    galleryContainer.style.transform = `translateX(${offset}%)`;
}

//AUTOPLAY FOR SLIDER

let autoplayInterval = null;

function startAutoplay(interval) {
    stopAutoplay();  // Detiene cualquier autoplay anterior para evitar múltiples intervalos.
    autoplayInterval = setInterval(() => {
        navigate(1);  // Navega a la siguiente imagen cada intervalo de tiempo.
    }, interval);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
}

// AUTOPLAY AFTER 3s
startAutoplay(5000);

// Opcional: Detener autoplay cuando el usuario interactúa con los botones de navegación.
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', stopAutoplay);
});

