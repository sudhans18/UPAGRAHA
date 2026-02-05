/* =========================================
   CLUB LOGO CLICK HANDLERS
   Scrolls to respective team section when clicking club logos
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initLogoNavigation();
});

function initLogoNavigation() {
    const clickableLogos = document.querySelectorAll('.clickable-logo');

    if (!clickableLogos || clickableLogos.length === 0) return;

    clickableLogos.forEach(logo => {
        logo.addEventListener('click', function () {
            const clubName = this.dataset.club;
            if (!clubName) return;

            // First, scroll to the team section
            const teamSection = document.getElementById('team');
            if (!teamSection) return;

            // Smooth scroll to team section
            teamSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // After scrolling, click the appropriate tab
            setTimeout(() => {
                const targetTab = document.querySelector(`.team-tab-btn[data-club="${clubName}"]`);
                if (targetTab) {
                    // Trigger click on the tab to show the correct team
                    targetTab.click();
                }
            }, 800); // Wait for scroll animation to mostly complete
        });

        // Add hover effect
        logo.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
        });

        logo.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}
