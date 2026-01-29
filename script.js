// Small utilities: mobile nav toggle + scroll reveal + contact form mailto fallback
document.addEventListener('DOMContentLoaded', function () {
    // Mobile nav toggles (multiple pages)
    ['navToggle', 'navToggle2', 'navToggle3', 'navToggle4', 'navToggle5'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                document.querySelector('.nav').classList.toggle('open');
            });
        }
    });

    // Simple scroll reveal using IntersectionObserver
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));

    // Contact form: open mailto with subject/body if JS enabled
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('name').value || '';
            const business = document.getElementById('business').value || '';
            const email = document.getElementById('email').value || '';
            const message = document.getElementById('message').value || '';
            const subject = encodeURIComponent(`Contacto web - ${business || name}`);
            const body = encodeURIComponent(`Nombre: ${name}\nNegocio: ${business}\nEmail: ${email}\n\nMensaje:\n${message}`);
            const mailto = `mailto:hola@calle7studio.com?subject=${subject}&body=${body}`;
            window.location.href = mailto;
        });
    }

    // Intro video handling
    const introOverlay = document.getElementById('intro-overlay');
    const introVideo = document.getElementById('intro-video');

    if (introOverlay && introVideo) {
        // Prevent scrolling while intro is visible
        document.body.style.overflow = 'hidden';

        const finishIntro = () => {
            introOverlay.classList.add('hidden');
            document.body.style.overflow = '';
            // Stop video to save resources
            setTimeout(() => {
                introVideo.pause();
                introOverlay.remove();
            }, 800);
        };

        // When video ends
        introVideo.addEventListener('ended', finishIntro);

        // Allow skipping by clicking
        introOverlay.addEventListener('click', finishIntro);
    }
});
