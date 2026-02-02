// ============================================
// FLOATING PROJECT NAVIGATION FUNCTIONALITY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const floatingNavItems = document.querySelectorAll('.floating-nav-item');

    // Function to switch project
    function switchProject(targetProject) {
        // Remove active class from all cards and floating nav items
        projectCards.forEach(card => card.classList.remove('active'));
        floatingNavItems.forEach(item => item.classList.remove('active'));

        // Add active class to corresponding elements
        const targetCard = document.getElementById(targetProject);
        if (targetCard) {
            targetCard.classList.add('active');

            // Update floating nav item
            const floatingItem = document.querySelector(`.floating-nav-item[data-project="${targetProject}"]`);
            if (floatingItem) {
                floatingItem.classList.add('active');
            }
            
            // Smooth scroll to project section
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Handle floating nav item clicks
    floatingNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetProject = this.getAttribute('data-project');
            switchProject(targetProject);
        });
    });

    // Set first project as active by default
    if (projectCards.length > 0) {
        projectCards[0].classList.add('active');
        if (floatingNavItems.length > 0) {
            floatingNavItems[0].classList.add('active');
        }
    }
});

// ============================================
// MODAL FUNCTIONALITY
// ============================================

const modal = document.getElementById('mediaModal');
const modalContent = modal.querySelector('.modal-content');
const modalClose = modal.querySelector('.modal-close');

// Open modal with image
document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('click', function() {
        const src = this.getAttribute('src');
        const alt = this.getAttribute('alt') || '';
        
        modalContent.innerHTML = `<img src="${src}" alt="${alt}">`;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalContent.innerHTML = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
