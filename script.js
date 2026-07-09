// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // --- CREATE FLOATING PARTICLES ---
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random positioning
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.width = (Math.random() * 6 + 2) + 'px';
            particle.style.height = particle.style.width;

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // --- FORM VALIDATION ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const successMsg = document.getElementById('formSuccess');

            // Simple validation
            if (name.value.trim() === '' || email.value.trim() === '' || message.value.trim() === '') {
                successMsg.textContent = 'Please fill in all fields';
                successMsg.style.color = '#ff4444';
                successMsg.style.display = 'block';
            } else if (!email.value.includes('@') || !email.value.includes('.')) {
                successMsg.textContent = 'Please enter a valid email';
                successMsg.style.color = '#ff4444';
                successMsg.style.display = 'block';
            } else {
                successMsg.textContent = 'Thank you! Your message has been sent.';
                successMsg.style.color = '#00eeff';
                successMsg.style.display = 'block';
                contactForm.reset();
            }

            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        });
    }

    // --- ACTIVE NAVIGATION HIGHLIGHTING ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function highlightNav() {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNav);

    // Call once on load
    highlightNav();

    // --- SMOOTH SCROLLING ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- 3D EFFECT FOR CERTIFICATION CARDS ---
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- ANIMATE SKILL ITEMS ON SCROLL ---
    const skillItems = document.querySelectorAll('.skill-item');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 1s ease';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 1000);
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        observer.observe(item);
    });

    // --- ADD PULSE ANIMATION TO STYLESHEET ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 168, 255, 0.7); }
            50% { transform: scale(1.05); box-shadow: 0 0 20px 5px rgba(0, 168, 255, 0.9); }
            100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 168, 255, 0.7); }
        }
    `;
    document.head.appendChild(style);
});
