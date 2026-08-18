// ============================================
// Second Foundation - Competition Website
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Navigation ----
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---- FAQ Accordion ----
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item.active').forEach(activeItem => {
                activeItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ---- Waitlist Form ----
    const form = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('waitlistSuccess');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                timestamp: new Date().toISOString()
            };

            // Store locally as backup
            const submissions = JSON.parse(localStorage.getItem('sf_waitlist') || '[]');
            submissions.push(data);
            localStorage.setItem('sf_waitlist', JSON.stringify(submissions));

            // Show success message
            form.style.display = 'none';
            successMessage.style.display = 'block';
        });
    }

    // ---- Scroll-triggered fade-in animations ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to sections and cards
    const animateElements = document.querySelectorAll(
        '.section-header, .prize-card, .reward-card, .pillar, .journey-step, ' +
        '.profile-card, .tier-card, .fairness-card, .community-card, ' +
        '.might-card, .about-content, .creator-layout, .leaderboard-layout, ' +
        '.reward-path, .faq-item, .waitlist-content, .final-prize-content'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        // Stagger animations within the same section
        const siblings = el.parentElement.querySelectorAll('.fade-in');
        const siblingIndex = Array.from(siblings).indexOf(el);
        el.style.transitionDelay = `${siblingIndex * 0.08}s`;
        observer.observe(el);
    });
});
