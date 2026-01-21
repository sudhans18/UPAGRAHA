// ===========================================
// HERO.JS - Hero Effects (Background Glitch)
// ===========================================

const heroContainer = document.querySelector('#hero-container');

export function initHeroEffects() {
    // Hover-triggered glitch effect on interactive hero elements
    // When user hovers -> switch to red theme with glitch
    // When user moves away -> switch back to green theme with glitch

    if (!heroContainer) return;

    // Helper function to trigger RED glitch
    function triggerRedGlitch() {
        heroContainer.classList.add('glitching');
        heroContainer.classList.add('glitch-red');
        heroContainer.classList.remove('glitch-green');
        document.body.classList.add('theme-red');

        setTimeout(() => {
            heroContainer.classList.remove('glitching');
        }, 500);
    }

    // Helper function to trigger GREEN glitch (return to normal)
    function triggerGreenGlitch() {
        heroContainer.classList.add('glitching');
        heroContainer.classList.add('glitch-green');
        heroContainer.classList.remove('glitch-red');
        document.body.classList.remove('theme-red');

        setTimeout(() => {
            heroContainer.classList.remove('glitching');
        }, 500);
    }

    // Elements that trigger the glitch effect on hover
    const glitchTriggers = [
        '.hero-main-title',      // UPAGRAHA '26 title
        '.hero-countdown',       // Countdown timer
        '.hero-btn.primary',     // Register button
        '.hero-btn.secondary'    // Events button
    ];

    // Add hover listeners to all trigger elements
    glitchTriggers.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener('mouseenter', triggerRedGlitch);
            element.addEventListener('mouseleave', triggerGreenGlitch);
            element.style.cursor = 'pointer';
        }
    });
}

export function initHeroTransition() {
    // Transition disabled - hero section scrolls normally
    return;
}
