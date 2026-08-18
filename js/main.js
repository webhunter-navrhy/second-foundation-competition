document.addEventListener('DOMContentLoaded', () => {

    // ── AOS (Animate On Scroll) ──
    AOS.init({
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // ── tsParticles ──
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('tsparticles', {
            fullScreen: false,
            fpsLimit: 60,
            particles: {
                number: {
                    value: 50,
                    density: { enable: true, area: 1200 }
                },
                color: { value: ['#be8c00', '#e6e6e6', '#39386c'] },
                shape: { type: 'circle' },
                opacity: {
                    value: { min: 0.05, max: 0.25 },
                    animation: {
                        enable: true,
                        speed: 0.3,
                        minimumValue: 0.03,
                        sync: false
                    }
                },
                size: {
                    value: { min: 1, max: 2.5 },
                    animation: {
                        enable: true,
                        speed: 1,
                        minimumValue: 0.5,
                        sync: false
                    }
                },
                links: {
                    enable: true,
                    distance: 160,
                    color: '#be8c00',
                    opacity: 0.06,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.4,
                    direction: 'none',
                    random: true,
                    straight: false,
                    outModes: { default: 'out' }
                }
            },
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: 'grab'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        links: { opacity: 0.15 }
                    }
                }
            },
            detectRetina: true
        });
    }

    // ── Nav scroll effect ──
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = y;
    }, { passive: true });

    // ── Mobile menu ──
    const burger = document.getElementById('navBurger');
    const overlay = document.getElementById('mobileOverlay');

    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            burger.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ── Smooth scroll ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ── Waitlist form ──
    const form = document.getElementById('waitlistForm');
    const ok = document.getElementById('waitlistOk');

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const fd = new FormData(form);
            const entry = { name: fd.get('name'), email: fd.get('email'), ts: new Date().toISOString() };
            const list = JSON.parse(localStorage.getItem('sf_waitlist') || '[]');
            list.push(entry);
            localStorage.setItem('sf_waitlist', JSON.stringify(list));
            form.hidden = true;
            ok.hidden = false;
        });
    }

});
