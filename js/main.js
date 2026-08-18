document.addEventListener('DOMContentLoaded', () => {
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

    // Smooth scroll
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

    // Waitlist form
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

    // Fade in on scroll
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

    document.querySelectorAll('.section').forEach(s => {
        s.classList.add('fade-in');
        obs.observe(s);
    });
});
