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

    systemCards.forEach(card => {
        card.addEventListener('click', () => switchProject(card.getAttribute('data-project'), true));
    });

    function loadLazyEmbeds(root) {
        root.querySelectorAll('iframe.lazy-embed').forEach(frame => {
            const src = frame.getAttribute('data-src');
            if (src && !frame.getAttribute('src')) frame.setAttribute('src', src);
        });
    }

    const videoTabs = document.querySelectorAll('.video-tab');
    const videoPanels = document.querySelectorAll('.video-panel');
    function showVideoTab(id) {
        videoTabs.forEach(tab => {
            const on = tab.getAttribute('data-tab') === id;
            tab.classList.toggle('active', on);
            tab.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        videoPanels.forEach(panel => {
            const on = panel.id === id;
            panel.classList.toggle('active', on);
            panel.hidden = !on;
            if (on) loadLazyEmbeds(panel);
        });
    }
    videoTabs.forEach(tab => {
        tab.addEventListener('click', () => showVideoTab(tab.getAttribute('data-tab')));
    });
    const firstPanel = document.querySelector('.video-panel.active');
    if (firstPanel) loadLazyEmbeds(firstPanel);

    const slides = document.querySelectorAll('.hero-slide');
    const dotsWrap = document.querySelector('.hero-dots');
    if (slides.length && dotsWrap) {
        let current = 0;
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            const title = slides[i].querySelector('.hero-caption');
            dot.setAttribute('aria-label', title ? title.textContent.trim() : 'Slide ' + (i + 1));
            if (i === 0) dot.classList.add('is-active');
            dot.addEventListener('click', () => go(i));
            dotsWrap.appendChild(dot);
        });
        const dots = dotsWrap.querySelectorAll('button');
        function go(n) {
            current = (n + slides.length) % slides.length;
            slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
            dots.forEach((d, i) => d.classList.toggle('is-active', i === current));
        }
        setInterval(() => go(current + 1), 4000);
    }

    document.querySelectorAll('.video-more').forEach(btn => {
        btn.addEventListener('click', () => switchProject(btn.getAttribute('data-project'), true));
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
