// ===========================================
// TIMELINE.JS - Sacred Timeline Horizontal Scroll
// ===========================================

export function initTimelineAnimation() {
    const timelineTrack = document.querySelector('.timeline-track-wrapper');
    const timelineSection = document.querySelector('#timeline');

    if (!timelineTrack || !timelineSection) return;

    // Cache scroll distance at init time for better performance
    const scrollDistance = timelineTrack.scrollWidth - window.innerWidth * 0.8;

    gsap.to(timelineTrack, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
            trigger: timelineSection,
            start: "top top",
            end: "+=" + scrollDistance,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinSpacing: true
        }
    });

    gsap.from('.timeline-event', {
        scrollTrigger: {
            trigger: timelineSection,
            start: 'top 60%'
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4
    });

    gsap.from('.branch-lines path', {
        scrollTrigger: {
            trigger: timelineSection,
            start: 'top 60%'
        },
        strokeDashoffset: 500,
        strokeDasharray: 500,
        duration: 1,
        stagger: 0.05,
        ease: 'power2.out'
    });
}
