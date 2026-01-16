// Home Page Logic

// Countdown Timer
const eventDate = new Date('2026-02-15T09:00:00').getTime(); // Approx 30 days from now (User said 30 days)

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = "EVENT STARTED";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM if elements exist
    const dayEl = document.getElementById('days');
    if (dayEl) {
        dayEl.innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }
}

setInterval(updateCountdown, 1000);

// Intro Animation
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on home page
    if (!document.getElementById('home-hero')) return;

    const tl = gsap.timeline();

    tl.to('.intro-overlay', {
        duration: 1.5,
        opacity: 0,
        delay: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
            document.querySelector('.intro-overlay').style.display = 'none';
        }
    })
        .from('.hero-title', {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        }, "-=0.5")
        .from('.hero-subtitle', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, "-=0.7")
        .from('.countdown-container', {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        }, "-=0.5")
        .from('.hero-buttons a', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        }, "-=0.5");

    // 3D Tilt Effect for Hero Content
    const heroContent = document.querySelector('.hero-content');
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 50;
        const y = (window.innerHeight / 2 - e.pageY) / 50;

        gsap.to(heroContent, {
            rotationY: x,
            rotationX: y,
            duration: 1,
            ease: 'power2.out'
        });
    });
});
