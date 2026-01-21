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

    // SKIP PRELOADER IF RETURNING (HASH EXISTS)
    if (window.location.hash && loader) {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        initAnimations();

        // Scroll to hash immediately
        const target = document.querySelector(window.location.hash);
        if (target) setTimeout(() => target.scrollIntoView(), 100);
        return;
    }

    if (!loader) return;

    const text = document.getElementById('loader-text');



    // New "Energy" Steps
    setTimeout(() => {
        if (text) text.innerText = "SYNCHRONIZING";
    }, 1500);

    setTimeout(() => {
        if (text) {
            text.innerText = "READY";
            text.style.color = "#00ff41";
            text.style.textShadow = "0 0 10px #00ff41";
        }
    }, 2800);

    setTimeout(() => {
        loader.style.opacity = 0;
        loader.style.pointerEvents = 'none';
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
            initAnimations();
        }, 800);
    }, 3300);
}

// --- GSAP Animations ---
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize hero transition
    initHeroTransition();

    // Scroll indicator animation - REMOVED

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
