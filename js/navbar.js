// Navbar Component
document.addEventListener('DOMContentLoaded', () => {
    const navHTML = `
    <nav id="main-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">UPAGRAHA</a>
            <div class="nav-links">
                <a href="index.html" class="nav-link" data-link="home">HOME</a>
                <a href="events.html" class="nav-link" data-link="events">EVENTS</a>
                <a href="timeline.html" class="nav-link" data-link="timeline">TIMELINE</a>
                <a href="about.html" class="nav-link" data-link="about">ABOUT</a>
                <a href="contact.html" class="nav-link" data-link="contact">CONTACT</a>
            </div>
            <div class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // Active Link Highlight
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Mobile Toggle
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        toggle.classList.toggle('active');
    });

    // Add Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});
