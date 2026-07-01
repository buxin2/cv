document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');
    const navItems = document.querySelectorAll('.floating-nav-item');

    function switchProject(target) {
        projectCards.forEach(c => c.classList.remove('active'));
        navItems.forEach(i => i.classList.remove('active'));
        const card = document.getElementById(target);
        if (card) {
            card.classList.add('active');
            const item = document.querySelector(`.floating-nav-item[data-project="${target}"]`);
            if (item) item.classList.add('active');
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => switchProject(item.getAttribute('data-project')));
    });

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
});
