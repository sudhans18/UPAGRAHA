// Main JS for SPA

// --- Preloader ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const fill = document.getElementById('preloader-bar');

    // Simulate loading since we don't have heavy assets yet
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        fill.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = 0;
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.classList.remove('loading'); // Enable scrolling
                    initAnimations(); // Start animations after load
                }, 500);
            }, 500);
        }
    }, 100);
});

// --- Countdown ---
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 59); // 59 Days from now

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) return;

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('d-val').innerText = d.toString().padStart(2, '0');
    document.getElementById('h-val').innerText = h.toString().padStart(2, '0');
    document.getElementById('m-val').innerText = m.toString().padStart(2, '0');
    document.getElementById('s-val').innerText = s.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);

// --- Starfield Background ---
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let width, height, stars = [];

function initResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createStars();
}

function createStars() {
    stars = [];
    const count = 200;
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random()
        });
    }
}

function animateStars() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#00ff41'; // Green tint stars

    stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed; // Move up
        if (star.y < 0) star.y = height;
    });

    requestAnimationFrame(animateStars);
}

// --- Cinematic Events ---
const frameCount = 79;
const frames = [];
const eventsCanvas = document.getElementById('events-canvas');
const eventCtx = eventsCanvas.getContext('2d');

// Dynamic frame preloading (better approach - scalable and maintainable)
const eventImages = [];
const eventsObj = { frame: 0 };

function preloadEventImages() {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        // Using simplified naming: "frame 0.webp", "frame 1.webp", etc.
        img.src = `assets/frames3/frame ${i}.webp`;
        eventImages[i] = img;

        img.onerror = () => {
            console.error(`Failed to load frame ${i}.webp`);
        };
    }
}

function renderEventFrame() {
    const img = eventImages[eventsObj.frame];
    if (img) {
        // Cover fit
        const hRatio = eventsCanvas.width / img.width;
        const vRatio = eventsCanvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (eventsCanvas.width - img.width * ratio) / 2;
        const centerShift_y = (eventsCanvas.height - img.height * ratio) / 2;

        eventCtx.clearRect(0, 0, eventsCanvas.width, eventsCanvas.height);
        eventCtx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    }
}

// --- GSAP Animations ---
function initAnimations() {
    // Intro
    gsap.from('.hero-center', {
        duration: 2, pointerEvents: 'none',
        scale: 2.5, opacity: 0, ease: 'power3.out', delay: 0.2
    });

    gsap.from('.home-logos-container', {
        duration: 1, y: -50, opacity: 0, delay: 1
    });

    // Sections ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.spa-section h2').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            y: 50, opacity: 0, duration: 1
        });
    });

    // --- TIMELINE: Pinned Horizontal Scroll ---
    const timelineTrack = document.querySelector('.timeline-track-wrapper');
    const timelineSection = document.querySelector('#timeline');

    if (timelineTrack && timelineSection) {
        // Calculate scroll distance
        const getScrollDistance = () => {
            return timelineTrack.scrollWidth - window.innerWidth * 0.8;
        };

        // Pin the entire section and animate horizontal scroll
        gsap.to(timelineTrack, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
                trigger: timelineSection,
                start: "top top",
                end: () => "+=" + getScrollDistance(),
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                pinSpacing: true
            }
        });

        // Animate events appearing
        gsap.from('.timeline-event', {
            scrollTrigger: {
                trigger: timelineSection,
                start: 'top 60%'
            },
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4
        });

        // Animate branch lines drawing
        gsap.from('.branch-lines path', {
            scrollTrigger: {
                trigger: timelineSection,
                start: 'top 60%'
            },
            strokeDashoffset: 500,
            strokeDasharray: 500,
            duration: 1,
            stagger: 0.05,
            ease: 'power2.out'
        });
    }

    // --- Cinematic Events ScrollTrigger ---
    eventsCanvas.width = window.innerWidth;
    eventsCanvas.height = window.innerHeight;

    const eventTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#events",
            start: "top top",
            end: "+=300%", // Long scroll for animation
            pin: true,
            scrub: true,
            onUpdate: renderEventFrame
        }
    });

    eventTl.to(eventsObj, {
        frame: 78,
        snap: "frame",
        ease: "none",
        duration: 2
    })
        .to('.events-overlay', { opacity: 0, duration: 0.2 }, "<") // Fade out text early
        .to('.events-grid', { opacity: 1, pointerEvents: 'all', duration: 0.5 }); // Fade in grid at end

    // Initial render
    preloadEventImages();
    // Re-render on resize
    window.addEventListener('resize', () => {
        initResize();
        eventsCanvas.width = window.innerWidth;
        eventsCanvas.height = window.innerHeight;
        renderEventFrame();
    });
}

// Mobile Nav
document.querySelector('.nav-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Initialization
initResize();
// animateStars(); // Disable old starfield to save performance or keep it? User wants "multiverse". Keeping it.
animateStars();
