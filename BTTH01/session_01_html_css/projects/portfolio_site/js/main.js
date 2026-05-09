const skillBars = document.querySelectorAll('.skill-progress');

const animateSkillBars = (entries, observer) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const progress = entry.target;
        progress.style.setProperty('--target-width', progress.dataset.width);
        progress.classList.add('animate');
        observer.unobserve(progress);
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, {
    threshold: 0.45,
});

skillBars.forEach((bar) => skillObserver.observe(bar));

const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelectorAll('.main-nav a');

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (menuToggle) menuToggle.checked = false;
    });
});

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        contactForm.reset();
        alert('Thank you! Your message has been sent.');
    });
}
