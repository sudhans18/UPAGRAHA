// ===========================================
// HERO.JS - Hero Parallax, Floating, Transition
// ===========================================

import { isTabActive } from './utils.js';

const heroContainer = document.querySelector('#hero-container');
const heroImage = document.querySelector('#hero-image');
const heroSection = document.querySelector('#hero-cinematic');

let isInCardMode = false;
let floatingOffset = { y: 0 };
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

// Mouse Parallax listener
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;
});

function initHeroFloating() {
    if (!heroImage) return;

    gsap.to(floatingOffset, {
        y: -20,
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });
    console.log('🎈 Floating animation initialized (12s cycle, 20px range)');
}

function updateParallax() {
    if (!isTabActive || !heroImage) {
        requestAnimationFrame(updateParallax);
        return;
    }

    const lerpFactor = 0.05;
    currentX += (mouseX - currentX) * lerpFactor;
    currentY += (mouseY - currentY) * lerpFactor;

    const rangeMultiplier = isInCardMode ? 0.3 : 1;
    const xVal = currentX * 50 * rangeMultiplier;
    const yVal = currentY * 30 * rangeMultiplier;

    gsap.set(heroImage, {
        x: xVal,
        y: yVal + floatingOffset.y
    });

    requestAnimationFrame(updateParallax);
}

export function initHeroTransition() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroAboutWrapper = document.querySelector('#hero-about-wrapper');
    const aboutSection = document.querySelector('#about');
    const aboutText = document.querySelector('.about-text');

    if (!heroAboutWrapper || !heroContainer) {
        console.warn('Hero elements not found, skipping transition');
        return;
    }

    // 1) Precompute card dimensions - adjust cardWidth for final size
    // cardScale = 0.5 means hero shrinks to 50% of viewport width
    const cardScale = 0.5;
    const cardRight = window.innerWidth * 0.03;
    const cardBottom = window.innerHeight * 0.05;

    // 2) About section offset setup
    const aboutOffsetX = -100;
    gsap.set(aboutSection, { x: aboutOffsetX, opacity: 0 });

    // 3) Stats cards setup
    const statCards = document.querySelectorAll('.stat-card');
    gsap.set(statCards, { opacity: 0, y: 30 });

    // 4) Create the pinned timeline
    const heroTl = gsap.timeline({
        scrollTrigger: {
            trigger: heroAboutWrapper,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: self => {
                if (self.progress > 0.3 && !isInCardMode) {
                    isInCardMode = true;
                    heroContainer.classList.add('is-card');
                }
            }
        }
    });

    // 5) Calculate final position
    // The card should end up at bottom-right: 3vw from right, 5vh from bottom
    // Since we scale from center, we need to calculate the offset
    const finalX = (window.innerWidth * (1 - cardScale)) / 2 - cardRight;
    const finalY = (window.innerHeight * (1 - cardScale)) / 2 - cardBottom;

    // 6) Animations in parallel
    heroTl
        .to(heroContainer, {
            scale: cardScale,
            x: finalX,
            y: finalY,
            borderRadius: '20px',
            duration: 1,
            ease: "power2.inOut"
        }, 0)
        .to(scrollIndicator, { opacity: 0, duration: 0.2 }, 0)
        .to(aboutSection, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }, 0.2)
        .to(statCards, {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            onStart: animateStatCounters
        }, 0.5); // Adjust this value: higher = cards appear later in scroll
}

function animateStatCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        if (!target || isNaN(target)) return;

        gsap.fromTo(el,
            { innerText: 0 },
            {
                innerText: target,
                snap: { innerText: 1 },
                duration: 2.5,
                ease: "power2.out"
            }
        );
    });
}

export function initHeroEffects() {
    updateParallax();
    initHeroFloating();
}
