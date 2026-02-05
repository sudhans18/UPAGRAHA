// Simple animations without ScrollTrigger for better performance
// Uses basic GSAP with Intersection Observer for entry animations

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initAboutAnimations, 100);
});

function initAboutAnimations() {
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        // Fallback: make everything visible
        document.querySelectorAll('.about-card, .stat-card, .organizer-logo, .loki-btn').forEach(el => {
            el.style.opacity = '1';
        });
        return;
    }

    // Animate stat counters when section comes into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    const statsGrid = document.querySelector('.stats-grid-cube');
    if (statsGrid) {
        statsObserver.observe(statsGrid);
    }

    // Simple fade-in animations on load (no scroll trigger)
    gsap.fromTo(".about-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.2 }
    );

    gsap.fromTo(".stat-card",
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)", delay: 0.4 }
    );

    gsap.fromTo(".organizer-logo",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)", delay: 0.6 }
    );

    gsap.fromTo(".loki-btn",
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out", delay: 0.8 }
    );
}

function animateCounters() {
    const stats = [
        { id: "stat-registrations", val: 350, suffix: "+" },
        { id: "stat-colleges", val: 23, suffix: "+" },
        { id: "stat-prizepool", val: 25, suffix: "k+" },
        { id: "stat-partners", val: 9, suffix: "+" }
    ];

    stats.forEach(stat => {
        const el = document.getElementById(stat.id);
        if (!el) return;

        let counter = { val: 0 };
        gsap.to(counter, {
            val: stat.val,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function () {
                el.innerText = Math.ceil(this.targets()[0].val) + stat.suffix;
            }
        });
    });
}
