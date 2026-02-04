// ===========================================
// TIMELINE.JS - Sacred Timeline Logic
// Assigns past/current/future states and adds PRESENT label
// ===========================================

export function initTimelineAnimation() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const scrollContainer = document.querySelector('.monitor-screen');

    if (!timelineEvents.length || !scrollContainer) return;

    // Current date - Use system time
    const today = new Date();

    let currentEvent = null;
    let minDiff = Infinity;

    // Sort events by date to ensure correct processing order if not already sorted
    // But assuming DOM order is chronological for now

    // Find the current active event (latest event that is today or in the past)
    // If no past events, it will remain matches for future

    let latestPastEvent = null;
    let earliestFutureEvent = null;
    let earliestFutureDiff = Infinity;

    timelineEvents.forEach(event => {
        const dateStr = event.getAttribute('data-date');
        if (!dateStr) return;

        const eventDate = new Date(dateStr);
        // Reset hours to compare dates only
        eventDate.setHours(0, 0, 0, 0);
        const compareDate = new Date(today);
        compareDate.setHours(0, 0, 0, 0);

        const diff = eventDate - compareDate; // positive = future, negative = past, 0 = today

        // Remove any existing state classes
        event.classList.remove('past', 'current', 'future');

        if (diff <= 0) {
            // Event is today or in the past
            event.classList.add('past');
            // We want the LATEST past event (closest to today but <= today)
            // Since we iterate, we can check if this one is "later" than the stored one
            // Or if the array is sorted, the last one we see is the latest.
            // Let's rely on date comparison to be safe.
            if (!latestPastEvent || eventDate > new Date(latestPastEvent.getAttribute('data-date'))) {
                latestPastEvent = event;
            }
        } else {
            // Event is in the future
            event.classList.add('future');

            if (diff < earliestFutureDiff) {
                earliestFutureDiff = diff;
                earliestFutureEvent = event;
            }
        }
    });

    // Strategy:
    // 1. If there is a "latest past event" (including today), that is the CURRENT PHASE.
    // 2. If there are NO past events (all future), then the first future event is the focus?
    //    Or maybe nothing is "current".
    //    Let's default to the latest past event being "current". 

    const activeEvent = latestPastEvent || earliestFutureEvent;

    // Mark the selected event as "current"
    if (activeEvent) {
        activeEvent.classList.remove('past', 'future');
        activeEvent.classList.add('current');

        // Update Progress Bar
        const progressBar = document.getElementById('timeline-progress');
        if (progressBar) {
            // Logic: fill up to the center of the current event
            // Get index of active event
            const allEvents = Array.from(timelineEvents);
            const index = allEvents.indexOf(activeEvent);

            if (index !== -1) {
                // Check if mobile view (vertical timeline)
                const isMobile = window.matchMedia('(max-width: 768px)').matches;

                if (isMobile) {
                    // Mobile: use height-based calculation for vertical timeline
                    const centerPos = activeEvent.offsetTop + (activeEvent.clientHeight / 2);
                    progressBar.style.height = `${centerPos}px`;
                    progressBar.style.width = ''; // Clear any inline width
                } else {
                    // Desktop: use width-based calculation for horizontal timeline
                    const centerPos = activeEvent.offsetLeft + (activeEvent.clientWidth / 2);
                    progressBar.style.width = `${centerPos}px`;
                    progressBar.style.height = ''; // Clear any inline height
                }
            }
        }

        // Scroll to center the current event (only on desktop)
        const isMobileForScroll = window.matchMedia('(max-width: 768px)').matches;
        if (!isMobileForScroll) {
            setTimeout(() => {
                const containerWidth = scrollContainer.clientWidth;
                const eventLeft = activeEvent.offsetLeft;
                const eventWidth = activeEvent.clientWidth;

                // Calculate scroll position to center the element
                const scrollPos = eventLeft - (containerWidth / 2) + (eventWidth / 2);

                scrollContainer.scrollTo({
                    left: Math.max(0, scrollPos),
                    behavior: 'smooth'
                });
            }, 500);
        }

    }

    // Scroll Reveal Observer for Mobile Animation
    // This runs on all screens but effects are only visible via CSS media query
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    timelineEvents.forEach(event => {
        observer.observe(event);
    });
}
