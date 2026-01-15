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

// Hardcoded filenames to match exact assets (User requested NO renaming)
// Generated from file list
const assetNames = [
    "frame_00_delay-0.067s.webp", "frame_01_delay-0.066s.webp", "frame_02_delay-0.067s.webp", "frame_03_delay-0.067s.webp",
    "frame_04_delay-0.066s.webp", "frame_05_delay-0.067s.webp", "frame_06_delay-0.067s.webp", "frame_07_delay-0.066s.webp",
    "frame_08_delay-0.067s.webp", "frame_09_delay-0.067s.webp", "frame_10_delay-0.066s.webp", "frame_11_delay-0.067s.webp",
    "frame_12_delay-0.067s.webp", "frame_13_delay-0.066s.webp", "frame_14_delay-0.067s.webp", "frame_15_delay-0.067s.webp",
    "frame_16_delay-0.066s.webp", "frame_17_delay-0.067s.webp", "frame_18_delay-0.067s.webp", "frame_19_delay-0.066s.webp",
    "frame_20_delay-0.067s.webp", "frame_21_delay-0.067s.webp", "frame_22_delay-0.066s.webp", "frame_23_delay-0.067s.webp",
    "frame_24_delay-0.067s.webp", "frame_25_delay-0.066s.webp", "frame_26_delay-0.067s.webp", "frame_27_delay-0.067s.webp",
    "frame_28_delay-0.066s.webp", "frame_29_delay-0.067s.webp", "frame_30_delay-0.067s.webp", "frame_31_delay-0.066s.webp",
    "frame_32_delay-0.067s.webp", "frame_33_delay-0.067s.webp", "frame_34_delay-0.066s.webp", "frame_35_delay-0.067s.webp",
    "frame_36_delay-0.067s.webp", "frame_37_delay-0.066s.webp", "frame_38_delay-0.067s.webp", "frame_39_delay-0.067s.webp",
    "frame_40_delay-0.066s.webp", "frame_41_delay-0.067s.webp", "frame_42_delay-0.067s.webp", "frame_43_delay-0.066s.webp",
    "frame_44_delay-0.067s.webp", "frame_45_delay-0.067s.webp", "frame_46_delay-0.066s.webp", "frame_47_delay-0.067s.webp",
    "frame_48_delay-0.067s.webp", "frame_49_delay-0.066s.webp", "frame_50_delay-0.067s.webp", "frame_51_delay-0.067s.webp",
    "frame_52_delay-0.066s.webp", "frame_53_delay-0.067s.webp", "frame_54_delay-0.067s.webp", "frame_55_delay-0.066s.webp",
    "frame_56_delay-0.067s.webp", "frame_57_delay-0.067s.webp", "frame_58_delay-0.066s.webp", "frame_59_delay-0.067s.webp",
    "frame_60_delay-0.067s.webp", "frame_61_delay-0.066s.webp", "frame_62_delay-0.067s.webp", "frame_63_delay-0.067s.webp",
    "frame_64_delay-0.066s.webp", "frame_65_delay-0.067s.webp", "frame_66_delay-0.067s.webp", "frame_67_delay-0.066s.webp",
    "frame_68_delay-0.067s.webp", "frame_69_delay-0.067s.webp", "frame_70_delay-0.066s.webp", "frame_71_delay-0.067s.webp",
    "frame_72_delay-0.067s.webp", "frame_73_delay-0.066s.webp", "frame_74_delay-0.067s.webp", "frame_75_delay-0.067s.webp",
    "frame_76_delay-0.066s.webp", "frame_77_delay-0.067s.webp", "frame_78_delay-0.067s.webp"
];

const eventImages = [];
const eventsObj = { frame: 0 };

function preloadEventImages() {
    assetNames.forEach((name) => {
        const img = new Image();
        img.src = `assets/frames3/${name}`;
        eventImages.push(img);
    });
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

    // Timeline Animation
    gsap.from('.timeline-node', {
        scrollTrigger: {
            trigger: '#timeline',
            start: 'top 60%'
        },
        y: 100, opacity: 0, stagger: 0.2, duration: 0.8
    });

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
