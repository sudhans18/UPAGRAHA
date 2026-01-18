// ===========================================
// EVENTS.JS - Cinematic Events Frame Scrubbing
// ===========================================

const frameCount = 83;
const eventsCanvas = document.getElementById('events-canvas');
const eventCtx = eventsCanvas ? eventsCanvas.getContext('2d') : null;
const eventImages = [];
const eventsObj = { frame: 0 };

function preloadEventImages() {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = `assets/frames/frame ${i}.webp`;
        eventImages[i] = img;
        img.onerror = () => {
            console.error(`Failed to load frame ${i}.webp`);
        };
    }
}

function renderEventFrame() {
    if (!eventsCanvas || !eventCtx) return;

    const img = eventImages[eventsObj.frame];
    if (img && img.complete && img.naturalWidth) {
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

export function initEventsAnimation() {
    if (!eventsCanvas) return;

    eventsCanvas.width = window.innerWidth;
    eventsCanvas.height = window.innerHeight;

    // Preload images first
    preloadEventImages();

    // Render frame 0 once loaded (with retry for async loading)
    const showInitialFrame = () => {
        if (eventImages[0] && eventImages[0].complete) {
            renderEventFrame();
        } else {
            setTimeout(showInitialFrame, 100);
        }
    };
    showInitialFrame();

    const eventTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#events",
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: true,
            onUpdate: renderEventFrame
        }
    });

    // Scrub through frames 0-78
    // Make stones appear at frame 72 (earlier than final)
    eventTl.to(eventsObj, {
        frame: 78,
        snap: "frame",
        ease: "none",
        duration: 2
    })
        .to('.events-overlay', { opacity: 0, duration: 0.15 }, 0) // Fade out quickly at start
        .to('#infinity-stones-container', {
            opacity: 1,
            pointerEvents: 'all',
            duration: 0.3
        }, 1.7); // Start at ~85% through (frame 72ish)
}

export function resizeEventsCanvas() {
    if (!eventsCanvas) return;

    eventsCanvas.width = window.innerWidth;
    eventsCanvas.height = window.innerHeight;
    renderEventFrame();
}
