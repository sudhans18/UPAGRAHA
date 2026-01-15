// Navbar Component
document.addEventListener('DOMContentLoaded', () => {
    const navHTML = `
    <nav id="main-nav">
        <div class="nav-container">
            <a href="index.html" class="nav-logo">UPAGRAHA</a>
            <div class="nav-links">
                <a href="index.html#home" class="nav-link">HOME</a>
                <a href="index.html#about" class="nav-link">ABOUT</a>
                <a href="index.html#timeline" class="nav-link">TIMELINE</a>
                <a href="index.html#events" class="nav-link">EVENTS</a>
                <a href="index.html#sponsors" class="nav-link">SPONSORS</a>
                <a href="index.html#contact" class="nav-link">CONTACT</a>
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
