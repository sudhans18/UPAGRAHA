// ===========================================
// HERO.JS - Hero Effects (Background Glitch)
// ===========================================

const heroContainer = document.querySelector('#hero-container');

export function initHeroEffects() {
    // Continuous glitch effect - Loki-Green for 3s, Loki-Red for 2s
    // Glitch animation plays consistently on BOTH transitions
    // Colors sync permanently, no scroll lock

    // Total cycle: 5 seconds (3s Green + 2s Red)
    setInterval(() => {
        if (heroContainer) {
            // GREEN → RED transition
            // 1. Add glitch animation
            heroContainer.classList.add('glitching');
            // 2. Change to red background
            heroContainer.classList.add('glitch-red');
            heroContainer.classList.remove('glitch-green');

            // 3. Add theme-red class to body for UI color sync
            document.body.classList.add('theme-red');

            // Remove glitch animation after 0.5s
            setTimeout(() => {
                heroContainer.classList.remove('glitching');
            }, 500);

            // After 2 seconds, transition back to GREEN
            setTimeout(() => {
                // RED → GREEN transition
                // 1. Add glitch animation
                heroContainer.classList.add('glitching');
                // 2. Change to green background
                heroContainer.classList.add('glitch-green');
                heroContainer.classList.remove('glitch-red');

                // 3. Remove theme-red class for green UI
                document.body.classList.remove('theme-red');

                // Remove glitch animation after 0.5s
                setTimeout(() => {
                    heroContainer.classList.remove('glitching');
                }, 500);
            }, 2000); // Red shows for 2 seconds
        }
    }, 5000); // Repeat every 5 seconds (3s green + 2s red)
}

export function initHeroTransition() {
    // Transition disabled - hero section scrolls normally
    return;
}
