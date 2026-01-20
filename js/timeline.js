// ===========================================
// TIMELINE.JS - Sacred Timeline Logic
// Assigns past/current/future states and adds PRESENT label
// ===========================================

export function initTimelineAnimation() {
    const timelineEvents = document.querySelectorAll('.timeline-event');
    const scrollContainer = document.querySelector('.monitor-screen');

    if (!timelineEvents.length || !scrollContainer) return;

    // Current date - Jan 19, 2026 for demo, use new Date() in production
    const today = new Date('2026-01-19T00:00:00');
    // const today = new Date();

    let closestUpcomingEvent = null;
    let closestUpcomingDiff = Infinity;

    // First pass: classify all events and find the closest upcoming one
    timelineEvents.forEach(event => {
        const dateStr = event.getAttribute('data-date');
        if (!dateStr) return;

        const eventDate = new Date(dateStr);
        const diff = eventDate - today; // positive = future, negative = past

        // Remove any existing state classes
        event.classList.remove('past', 'current', 'future');

        if (diff < 0) {
            // Event is in the past
            event.classList.add('past');
        } else {
            // Event is in the future (or today)
            event.classList.add('future');

            // Track closest upcoming event
            if (diff < closestUpcomingDiff) {
                closestUpcomingDiff = diff;
                closestUpcomingEvent = event;
            }
        }
    });

    // Mark the closest upcoming event as "current"
    if (closestUpcomingEvent) {
        closestUpcomingEvent.classList.remove('future');
        closestUpcomingEvent.classList.add('current');

        // Add "PRESENT" label to current event
        const presentLabel = document.createElement('span');
        presentLabel.className = 'present-label';
        presentLabel.textContent = 'PRESENT';
        closestUpcomingEvent.appendChild(presentLabel);

        // Scroll to center the current event
        setTimeout(() => {
            const containerWidth = scrollContainer.clientWidth;
            const eventLeft = closestUpcomingEvent.offsetLeft;
            const eventWidth = closestUpcomingEvent.clientWidth;

            // Calculate scroll position to center the element
            const scrollPos = eventLeft - (containerWidth / 2) + (eventWidth / 2);

            scrollContainer.scrollTo({
                left: Math.max(0, scrollPos),
                behavior: 'smooth'
            });
        }, 500);
    }
}
