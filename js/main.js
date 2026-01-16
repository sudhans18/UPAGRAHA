// Main JS for SPA

// --- Preloader & Intro Animation ---
const introCanvas = document.getElementById('intro-canvas');
const introCtx = introCanvas.getContext('2d');
let introWidth, introHeight;

// Frame names for frames_3 sequence
const introFrameNames = [
    "frame_000_delay-0.042s.webp", "frame_001_delay-0.041s.webp", "frame_002_delay-0.042s.webp", "frame_003_delay-0.042s.webp",
    "frame_004_delay-0.041s.webp", "frame_005_delay-0.042s.webp", "frame_006_delay-0.042s.webp", "frame_007_delay-0.041s.webp",
    "frame_008_delay-0.042s.webp", "frame_009_delay-0.042s.webp", "frame_010_delay-0.041s.webp", "frame_011_delay-0.042s.webp",
    "frame_012_delay-0.042s.webp", "frame_013_delay-0.041s.webp", "frame_014_delay-0.042s.webp", "frame_015_delay-0.042s.webp",
    "frame_016_delay-0.041s.webp", "frame_017_delay-0.042s.webp", "frame_018_delay-0.042s.webp", "frame_019_delay-0.041s.webp",
    "frame_020_delay-0.042s.webp", "frame_021_delay-0.042s.webp", "frame_022_delay-0.041s.webp", "frame_023_delay-0.042s.webp",
    "frame_024_delay-0.042s.webp", "frame_025_delay-0.041s.webp", "frame_026_delay-0.042s.webp", "frame_027_delay-0.042s.webp",
    "frame_028_delay-0.041s.webp", "frame_029_delay-0.042s.webp", "frame_030_delay-0.042s.webp", "frame_031_delay-0.041s.webp",
    "frame_032_delay-0.042s.webp", "frame_033_delay-0.042s.webp", "frame_034_delay-0.041s.webp", "frame_035_delay-0.042s.webp",
    "frame_036_delay-0.042s.webp", "frame_037_delay-0.041s.webp", "frame_038_delay-0.042s.webp", "frame_039_delay-0.042s.webp",
    "frame_040_delay-0.041s.webp", "frame_041_delay-0.042s.webp", "frame_042_delay-0.042s.webp", "frame_043_delay-0.041s.webp",
    "frame_044_delay-0.042s.webp", "frame_045_delay-0.042s.webp", "frame_046_delay-0.041s.webp", "frame_047_delay-0.042s.webp",
    "frame_048_delay-0.042s.webp", "frame_049_delay-0.041s.webp", "frame_050_delay-0.042s.webp", "frame_051_delay-0.042s.webp",
    "frame_052_delay-0.041s.webp", "frame_053_delay-0.042s.webp", "frame_054_delay-0.042s.webp", "frame_055_delay-0.041s.webp",
    "frame_056_delay-0.042s.webp", "frame_057_delay-0.042s.webp", "frame_058_delay-0.041s.webp", "frame_059_delay-0.042s.webp",
    "frame_060_delay-0.042s.webp", "frame_061_delay-0.041s.webp", "frame_062_delay-0.042s.webp", "frame_063_delay-0.042s.webp",
    "frame_064_delay-0.041s.webp", "frame_065_delay-0.042s.webp", "frame_066_delay-0.042s.webp", "frame_067_delay-0.041s.webp",
    "frame_068_delay-0.042s.webp", "frame_069_delay-0.042s.webp", "frame_070_delay-0.041s.webp", "frame_071_delay-0.042s.webp",
    "frame_072_delay-0.042s.webp", "frame_073_delay-0.041s.webp", "frame_074_delay-0.042s.webp", "frame_075_delay-0.042s.webp",
    "frame_076_delay-0.041s.webp", "frame_077_delay-0.042s.webp", "frame_078_delay-0.042s.webp", "frame_079_delay-0.041s.webp",
    "frame_080_delay-0.042s.webp", "frame_081_delay-0.042s.webp", "frame_082_delay-0.041s.webp", "frame_083_delay-0.042s.webp",
    "frame_084_delay-0.042s.webp", "frame_085_delay-0.041s.webp", "frame_086_delay-0.042s.webp", "frame_087_delay-0.042s.webp",
    "frame_088_delay-0.041s.webp", "frame_089_delay-0.042s.webp", "frame_090_delay-0.042s.webp", "frame_091_delay-0.041s.webp",
    "frame_092_delay-0.042s.webp", "frame_093_delay-0.042s.webp", "frame_094_delay-0.041s.webp", "frame_095_delay-0.042s.webp",
    "frame_096_delay-0.042s.webp", "frame_097_delay-0.041s.webp", "frame_098_delay-0.042s.webp", "frame_099_delay-0.042s.webp",
    "frame_100_delay-0.041s.webp", "frame_101_delay-0.042s.webp", "frame_102_delay-0.042s.webp", "frame_103_delay-0.041s.webp",
    "frame_104_delay-0.042s.webp", "frame_105_delay-0.042s.webp", "frame_106_delay-0.041s.webp", "frame_107_delay-0.042s.webp",
    "frame_108_delay-0.042s.webp", "frame_109_delay-0.041s.webp", "frame_110_delay-0.042s.webp", "frame_111_delay-0.042s.webp",
    "frame_112_delay-0.041s.webp", "frame_113_delay-0.042s.webp", "frame_114_delay-0.042s.webp", "frame_115_delay-0.041s.webp",
    "frame_116_delay-0.042s.webp", "frame_117_delay-0.042s.webp", "frame_118_delay-0.041s.webp", "frame_119_delay-0.042s.webp",
    "frame_120_delay-0.042s.webp", "frame_121_delay-0.041s.webp", "frame_122_delay-0.042s.webp", "frame_123_delay-0.042s.webp",
    "frame_124_delay-0.041s.webp", "frame_125_delay-0.042s.webp", "frame_126_delay-0.042s.webp", "frame_127_delay-0.041s.webp",
    "frame_128_delay-0.042s.webp", "frame_129_delay-0.042s.webp", "frame_130_delay-0.041s.webp", "frame_131_delay-0.042s.webp",
    "frame_132_delay-0.042s.webp", "frame_133_delay-0.041s.webp", "frame_134_delay-0.042s.webp", "frame_135_delay-0.042s.webp",
    "frame_136_delay-0.041s.webp", "frame_137_delay-0.042s.webp", "frame_138_delay-0.042s.webp", "frame_139_delay-0.041s.webp",
    "frame_140_delay-0.042s.webp", "frame_141_delay-0.042s.webp", "frame_142_delay-0.041s.webp", "frame_143_delay-0.042s.webp",
    "frame_144_delay-0.042s.webp", "frame_145_delay-0.041s.webp", "frame_146_delay-0.042s.webp", "frame_147_delay-0.042s.webp",
    "frame_148_delay-0.041s.webp", "frame_149_delay-0.042s.webp", "frame_150_delay-0.042s.webp", "frame_151_delay-0.041s.webp",
    "frame_152_delay-0.042s.webp", "frame_153_delay-0.042s.webp", "frame_154_delay-0.041s.webp", "frame_155_delay-0.042s.webp",
    "frame_156_delay-0.042s.webp", "frame_157_delay-0.041s.webp", "frame_158_delay-0.042s.webp", "frame_159_delay-0.042s.webp",
    "frame_160_delay-0.041s.webp", "frame_161_delay-0.042s.webp", "frame_162_delay-0.042s.webp", "frame_163_delay-0.041s.webp",
    "frame_164_delay-0.042s.webp", "frame_165_delay-0.042s.webp", "frame_166_delay-0.041s.webp", "frame_167_delay-0.042s.webp",
    "frame_168_delay-0.042s.webp", "frame_169_delay-0.041s.webp", "frame_170_delay-0.042s.webp", "frame_171_delay-0.042s.webp",
    "frame_172_delay-0.041s.webp", "frame_173_delay-0.042s.webp", "frame_174_delay-0.042s.webp", "frame_175_delay-0.041s.webp",
    "frame_176_delay-0.042s.webp", "frame_177_delay-0.042s.webp", "frame_178_delay-0.041s.webp", "frame_179_delay-0.042s.webp",
    "frame_180_delay-0.042s.webp", "frame_181_delay-0.041s.webp", "frame_182_delay-0.042s.webp", "frame_183_delay-0.042s.webp",
    "frame_184_delay-0.041s.webp", "frame_185_delay-0.042s.webp", "frame_186_delay-0.042s.webp", "frame_187_delay-0.041s.webp",
    "frame_188_delay-0.042s.webp", "frame_189_delay-0.042s.webp", "frame_190_delay-0.041s.webp", "frame_191_delay-0.042s.webp"
];

const introImages = [];
let loadedIntroFrames = 0;
const totalIntroFrames = introFrameNames.length;

function initIntroResize() {
    introWidth = window.innerWidth;
    introHeight = window.innerHeight;
    introCanvas.width = introWidth;
    introCanvas.height = introHeight;
}

function renderIntroFrame(index) {
    if (index >= introImages.length) return;
    const img = introImages[index];
    if (!img) return;

    // Cover fit
    const hRatio = introCanvas.width / img.width;
    const vRatio = introCanvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const centerShift_x = (introCanvas.width - img.width * ratio) / 2;
    const centerShift_y = (introCanvas.height - img.height * ratio) / 2;

    introCtx.clearRect(0, 0, introCanvas.width, introCanvas.height);
    introCtx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
}

function playIntroAnimation() {
    let currentFrame = 0;
    const fps = 24;
    const interval = 1000 / fps;
    let lastTime = 0;

    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const delta = currentTime - lastTime;

        if (delta > interval) {
            renderIntroFrame(currentFrame);
            currentFrame++;
            lastTime = currentTime - (delta % interval);
        }

        if (currentFrame < totalIntroFrames) {
            requestAnimationFrame(animate);
        } else {
            // Animation finished
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = 0;
                setTimeout(() => {
                    loader.style.display = 'none';
                    document.body.classList.remove('loading');
                    initAnimations();
                }, 1000);
            }, 500);
        }
    }
    requestAnimationFrame(animate);
}

// Preload assets
window.addEventListener('load', () => {
    initIntroResize();
    const fill = document.getElementById('preloader-bar');
    const loaderText = document.getElementById('loader-text');

    introFrameNames.forEach((name, index) => {
        const img = new Image();
        img.src = `assets/frames_3/${name}`;
        img.onload = () => {
            loadedIntroFrames++;
            introImages[index] = img; // Ensure order
            const progress = (loadedIntroFrames / totalIntroFrames) * 100;
            fill.style.width = `${progress}%`;

            if (loadedIntroFrames === totalIntroFrames) {
                // All loaded
                loaderText.innerText = "READY";
                setTimeout(() => {
                    // Hide loader text/bar but keep canvas
                    document.querySelector('.loader-content').style.opacity = 0;
                    playIntroAnimation();
                }, 500);
            }
        };
        img.onerror = () => {
            console.error(`Failed to load frame: ${name}`);
            // Count it anyway to avoid stalling
            loadedIntroFrames++;
            if (loadedIntroFrames === totalIntroFrames) {
                playIntroAnimation();
            }
        };
    });

    window.addEventListener('resize', initIntroResize);
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

    // --- TIMELINE: Pinned Horizontal Scroll ---
    // ENABLED: Using GSAP for horizontal scroll interaction
    const timelineTrack = document.querySelector('.timeline-track-wrapper');
    const timelineSection = document.querySelector('#timeline');

    if (timelineTrack && timelineSection) {
        // Calculate scroll distance
        // We want to scroll the entire width of the track minus the viewport width
        // But since we are clipped inside a monitor, let's just scroll enough to see the end
        const getScrollDistance = () => {
            return timelineTrack.scrollWidth - window.innerWidth;
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
