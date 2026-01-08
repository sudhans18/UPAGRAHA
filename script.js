
// Constants
const TOTAL_FRAMES = 90;
const BUTTON_FADE_FRAME = 70;
const SCROLL_TRIGGER_END = "+=400%"; // 400% of viewport height scroll distance

// State
const state = {
    frames: [],
    framesLoaded: 0,
    currentFrame: 0
};

// DOM Elements
const canvas = document.getElementById('hero-canvas');
const context = canvas.getContext('2d');
const loader = document.getElementById('loader');
const progressFill = document.getElementById('progress-fill');
const loaderText = document.getElementById('loader-text');
const buttonsContainer = document.getElementById('buttons-container');
const eventButtons = document.querySelectorAll('.event-btn');

// Mobile Check
const isMobile = window.innerWidth <= 768;

// --- Initialization ---

function init() {
    if (isMobile) {
        console.log("Mobile device detected. Disabling cinematic scroll.");
        document.body.classList.remove('loading');
        loader.style.display = 'none';
        return; // Stop here for mobile
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    preloadImages();
}

// --- Preloader ---

function preloadImages() {
    for (let i = 0; i < TOTAL_FRAMES; i++) { // Loop 0 to 89
        // Original filename format: frame_00_delay-0.05s.webp
        // We need padding to '00', '01', etc.
        const frameIndex = i.toString().padStart(2, '0');
        const img = new Image();
        img.src = `assets/frames/frame_${frameIndex}_delay-0.05s.webp`;

        img.onload = () => {
            state.frames[i] = img;
            state.framesLoaded++;
            updateLoader();
        };

        img.onerror = () => {
            console.error(`Failed to load frame_${frameIndex}_delay-0.05s.webp`);
            state.framesLoaded++;
            updateLoader();
        }
    }
}

function updateLoader() {
    const percent = Math.round((state.framesLoaded / TOTAL_FRAMES) * 100);
    progressFill.style.width = `${percent}%`;
    loaderText.innerText = `Loading Timeline data: ${percent}%`;

    if (state.framesLoaded >= TOTAL_FRAMES) {
        console.log("All frames loaded. Initializing animation.");
        setTimeout(() => {
            // Draw initial frame
            renderFrame(0);
            hideLoader();
            initScrollTrigger();
        }, 500);
    }
}

function hideLoader() {
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
    }, 1000);
}

// --- Canvas Logic ---

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redraw current frame on resize
    if (state.frames[Math.floor(state.currentFrame)]) {
        renderFrame(state.currentFrame);
    }
}

function renderFrame(index) {
    const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(index));
    const img = state.frames[frameIndex];

    if (!img) return;

    // "cover" fit logic for canvas
    const aspect = img.width / img.height;
    const canvasAspect = canvas.width / canvas.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > aspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / aspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * aspect;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

    handleInteractivity(frameIndex);
}

// --- Interaction Logic ---

function handleInteractivity(index) {
    if (index >= BUTTON_FADE_FRAME) {
        buttonsContainer.style.pointerEvents = 'auto';
        eventButtons.forEach(btn => btn.classList.add('visible'));
    } else {
        buttonsContainer.style.pointerEvents = 'none';
        eventButtons.forEach(btn => btn.classList.remove('visible'));
    }
}

// --- GSAP ScrollTrigger ---

function initScrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
        trigger: "#animation-container",
        start: "top top", // Pin immediately
        end: SCROLL_TRIGGER_END,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
            const targetFrame = self.progress * (TOTAL_FRAMES - 1);
            renderFrame(targetFrame);
            state.currentFrame = targetFrame;
        }
    });
    
}

// Start
init();
