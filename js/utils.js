// ===========================================
// UTILS.JS - Shared Utilities & State
// ===========================================

// Tab Visibility API - pause animations when tab inactive
export let isTabActive = true;
document.addEventListener('visibilitychange', () => {
    isTabActive = !document.hidden;
});

// Debounce helper
export function debounce(fn, delay) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
}
