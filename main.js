document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // DYNAMIC YEAR IN FOOTER
    // ========================================
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ========================================
    // MOBILE MENU TOGGLE
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMobile = document.getElementById('nav-mobile');
    const navMobileLinks = document.querySelectorAll('.nav-mobile a');
    const navMobileClose = document.querySelector('.nav-mobile-close');

    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMobile.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    if (menuToggle && navMobile) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMobile.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded',
                navMobile.classList.contains('active'));
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navMobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on X button click
        if (navMobileClose) {
            navMobileClose.addEventListener('click', closeMenu);
        }

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMobile.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================
    const revealElements = document.querySelectorAll('.programa-card, .equipo-card, .contacto-card, .section-title');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                // Staggered animation delay
                setTimeout(() => {
                    element.classList.add('visible');
                }, index * 100);
            }
        });
    };

    // Initial check
    revealOnScroll();

    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const extraOffset = 20;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // HERO VIDEO ERROR HANDLING
    // ========================================
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.addEventListener('error', () => {
            console.log('Video failed to load, background image will be shown');
            heroVideo.style.display = 'none';
        });
    }
});

// ========================================
// POLYFILL FOR SCROLL-TO BEHAVIOR
// ========================================
if (!('scrollBehavior' in document.documentElement.style)) {
    const originalScrollTo = window.scrollTo;
    window.scrollTo = function(options) {
        if (typeof options === 'object' && options.behavior === 'smooth') {
            const start = window.pageYOffset;
            const opt = Object(options);
            const end = opt.top;
            const duration = opt.duration || 500;
            const startTime = performance.now();

            function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const ease = progress < 0.5
                    ? 2 * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                window.scrollTo(0, start + (end - start) * ease);

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        } else {
            originalScrollTo.apply(this, arguments);
        }
    };
}