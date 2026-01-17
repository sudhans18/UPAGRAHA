// ===========================================
// MAIN.JS - Orchestration & Initialization Layer
// ===========================================
// 
// This file imports all modules and coordinates initialization.
// GSAP must be loaded globally before this module runs.
// ===========================================

import { initCountdown } from './countdown.js';
import { initStarfield, resizeStarfield } from './starfield.js';
import { initHeroEffects, initHeroTransition } from './hero.js';
import { initTimelineAnimation } from './timeline.js';
import { initEventsAnimation, resizeEventsCanvas } from './events.js';
import { debounce } from './utils.js';

// --- Preloader ---
function initPreloader() {
    const loader = document.getElementById('loader');
    const fill = document.getElementById('preloader-bar');

    if (!loader || !fill) return;

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
                    document.body.classList.remove('loading');
                    initAnimations();
                }, 500);
            }, 500);
        }
    }, 100);
}

// --- GSAP Animations ---
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize hero transition
    initHeroTransition();

    // Scroll indicator animation
    gsap.from('.scroll-indicator', {
        duration: 1,
        opacity: 0,
        y: 20,
        delay: 1.5
    });

    // Section titles animation
    gsap.utils.toArray('.spa-section h2').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 1
        });
    });

    // Timeline
    initTimelineAnimation();

    // Events
    initEventsAnimation();
}

// --- Mobile Navigation ---
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    // HOME button should scroll to absolute top (full-screen hero)
    const homeLink = document.querySelector('.nav-link[href="#hero-about-wrapper"]');
    if (homeLink) {
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ABOUT button should scroll to trigger hero shrink animation
    const aboutLink = document.querySelector('.nav-link[href="#about"]');
    if (aboutLink) {
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Scroll to about section (triggers hero transition)
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// --- Resize Handler ---
const handleResize = debounce(() => {
    resizeStarfield();
    resizeEventsCanvas();
}, 200);

window.addEventListener('resize', handleResize);

// --- Bootstrap ---
window.addEventListener('load', initPreloader);
initStarfield();
initHeroEffects();
initCountdown();
initMobileNav();
