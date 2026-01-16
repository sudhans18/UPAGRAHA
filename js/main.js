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

// --- Countdown Timer for Hero Section ---
// Target: February 19, 2026
const countdownTargetDate = new Date('2026-02-19T00:00:00');

function updateHeroCountdown() {
    const now = new Date().getTime();
    const distance = countdownTargetDate - now;

    // Elements
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    if (distance < 0) {
        daysEl.innerText = '00';
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00';
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = d.toString().padStart(2, '0');
    hoursEl.innerText = h.toString().padStart(2, '0');
    minutesEl.innerText = m.toString().padStart(2, '0');
    secondsEl.innerText = s.toString().padStart(2, '0');
}

// Update countdown immediately and then every second
updateHeroCountdown();
setInterval(updateHeroCountdown, 1000);

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

// ============================================
// CINEMATIC HERO - Full Feature Set
// ============================================
// 
// Features:
// 1. Floating animation - subtle up/down drift
// 2. Mouse parallax - pseudo-3D exploration
// 3. Scroll-to-card transition - zooms out to bottom-right
// 4. About text enters from left
// ============================================

const heroContainer = document.querySelector('#hero-container');
const heroImage = document.querySelector('#hero-image');
const heroSection = document.querySelector('#hero-cinematic');

let isInCardMode = false;

// --- Floating Animation State ---
// We use a shared variable to track floating offset, combined with parallax
let floatingOffset = { y: 0 };

function initHeroFloating() {
    if (!heroImage) return;

    // Animate the offset value, not the element directly
    gsap.to(floatingOffset, {
        y: -20,          // 20px range (moves up)
        duration: 6,     // Half of 12s cycle (yoyo doubles it)
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });
    console.log('🎈 Floating animation initialized (12s cycle, 20px range)');
}

// --- Mouse Parallax Effect ---
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function updateParallax() {
    if (!heroImage) {
        requestAnimationFrame(updateParallax);
        return;
    }

    const lerpFactor = 0.05;
    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;

    const rangeMultiplier = isInCardMode ? 0.3 : 1;
    const xVal = currentX * 50 * rangeMultiplier;
    const yVal = currentY * 30 * rangeMultiplier;

    // COMBINE parallax with floating offset
    gsap.set(heroImage, {
        x: xVal,
        y: yVal + floatingOffset.y  // Add floating offset to parallax
    });

    requestAnimationFrame(updateParallax);
}

// Start loops
updateParallax();
initHeroFloating();

/**
 * Initialize Hero Zoom-Out Transition
 * Pins wrapper, shrinks hero AND animates about text simultaneously
 */
function initHeroTransition() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroAboutWrapper = document.querySelector('#hero-about-wrapper');
    const aboutSection = document.querySelector('#about');
    const aboutText = document.querySelector('.about-text');

    if (!heroAboutWrapper || !heroContainer) {
        console.warn('Hero elements not found, skipping transition');
        return;
    }

    const targetScale = 0.45;

    // Create pinned scroll animation
    // The wrapper gets pinned while both hero and about animate
    const masterTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: heroAboutWrapper,
            start: "top top",
            end: "+=150%",      // 150vh of scroll for the transition
            pin: true,          // PIN the wrapper (both hero + about visible)
            scrub: 1.8,
            onUpdate: (self) => {
                isInCardMode = self.progress > 0.5;
                if (self.progress > 0.7) {
                    heroContainer.classList.add('is-card');
                } else {
                    heroContainer.classList.remove('is-card');
                }
            },
            onLeave: () => {
                // Dock the card to the about section
                heroContainer.classList.add('is-docked');
                heroContainer.style.transform = `scale(${targetScale})`;
            },
            onEnterBack: () => {
                // Undock when scrolling back
                heroContainer.classList.remove('is-docked');
                heroContainer.style.position = 'fixed';
                heroContainer.style.top = '0';
                heroContainer.style.left = '0';
                heroContainer.style.right = 'auto';
                heroContainer.style.bottom = 'auto';
            }
        }
    });

    // PARALLEL ANIMATIONS (all happen during the same scroll):

    // 1. Scroll indicator fades out
    masterTimeline.to(scrollIndicator, {
        opacity: 0,
        duration: 0.2
    }, 0);

    // 2. Hero shrinks and moves to bottom-right
    masterTimeline.to(heroContainer, {
        scale: targetScale,
        x: '25vw',
        y: '20vh',
        borderRadius: "20px",
        ease: "none",
        duration: 1
    }, 0);

    // 3. About text enters from left (SAME timeline = parallel)
    if (aboutText) {
        // Start invisible and off-screen left
        gsap.set(aboutText, { x: -300, opacity: 0 });

        masterTimeline.to(aboutText, {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.8
        }, 0.2);  // Slight delay so it starts after hero begins shrinking
    }

    console.log('🎬 Hero zoom-out + About parallel animation initialized');
}


// --- GSAP Animations ---
function initAnimations() {
    // Register ScrollTrigger plugin first
    gsap.registerPlugin(ScrollTrigger);

    // Initialize the cinematic hero transition
    initHeroTransition();

    // Scroll indicator fade in animation
    gsap.from('.scroll-indicator', {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 1.5  // Slight delay after page load
    });

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
