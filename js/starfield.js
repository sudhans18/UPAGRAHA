// ===========================================
// STARFIELD.JS - Animated Starfield Canvas
// ===========================================

import { isTabActive } from './utils.js';

const canvas = document.getElementById('stars-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let width, height, stars = [];

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
    if (!ctx) return;

    // Skip rendering if tab is not active
    if (!isTabActive) {
        requestAnimationFrame(animateStars);
        return;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#00ff41';

    stars.forEach(star => {
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y -= star.speed;
        if (star.y < 0) star.y = height;
    });

    requestAnimationFrame(animateStars);
}

export function initStarfield() {
    if (!canvas) return;

    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createStars();
    animateStars();
}

export function resizeStarfield() {
    if (!canvas) return;

    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    createStars();
}
