document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    const navItems = document.querySelectorAll('.floating-nav-item');
    const systemCards = document.querySelectorAll('.system-card');
    const lab = document.getElementById('lab');

    function switchProject(target, scrollToLab) {
        projectCards.forEach(c => c.classList.remove('active'));
        navItems.forEach(i => i.classList.remove('active'));
        const card = document.getElementById(target);
        if (card) {
            card.classList.add('active');
            const item = document.querySelector(`.floating-nav-item[data-project="${target}"]`);
            if (item) item.classList.add('active');
            if (scrollToLab && lab) {
                lab.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                card.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => switchProject(item.getAttribute('data-project'), false));
    });

    const patentExplore = document.getElementById('patentExplore');
    if (patentExplore) {
        patentExplore.addEventListener('click', (e) => {
            e.preventDefault();
            switchProject('project-1', true);
        });
    }

    if (projectCards.length) {
        projectCards[0].classList.add('active');
        if (navItems.length) navItems[0].classList.add('active');
    }

    const modal = document.getElementById('mediaModal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');

    document.querySelectorAll('.project-image').forEach(img => {
        img.addEventListener('click', function (e) {
            if (this.closest('a')) e.preventDefault();
            modalContent.innerHTML = `<img src="${this.getAttribute('src')}" alt="${this.getAttribute('alt') || ''}">`;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalContent.innerHTML = '';
    }
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    const menuToggle = document.getElementById('menuToggle');
    const siteNavLinks = document.getElementById('siteNavLinks');
    if (menuToggle && siteNavLinks) {
        menuToggle.addEventListener('click', function () {
            const open = siteNavLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        siteNavLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                siteNavLinks.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const counters = document.querySelectorAll('.stat-number[data-count]');
    const animateCount = (el) => {
        const target = Number(el.getAttribute('data-count'));
        const duration = 900;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 3))));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
        const seen = new WeakSet();
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !seen.has(entry.target)) {
                    seen.add(entry.target);
                    animateCount(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach(el => io.observe(el));
    } else {
        counters.forEach(animateCount);
    }
});
