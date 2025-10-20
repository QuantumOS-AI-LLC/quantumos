document.addEventListener('DOMContentLoaded', function() {
    
    // toggle menu   
    const toggleButtons = document.querySelectorAll(".toggle_menu");
    const bodyElement=document.body;
    toggleButtons.forEach(button => {
        button.addEventListener("click", function() {
            if (bodyElement.classList.contains("show__menu")) {
                bodyElement.classList.remove("show__menu");
            } else {
                bodyElement.classList.add("show__menu");
            }
        });
    });

    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach((dropdown) => {
        const toggle = dropdown.querySelector('.dropdown-toggle');

        toggle.addEventListener('click', (e) => {
            // Only expand/collapse on mobile
            if (window.innerWidth < 1024) {
                e.preventDefault();

                // Collapse others first
                dropdowns.forEach((d) => {
                    if (d !== dropdown) d.classList.remove('open');
                });

                // Toggle current dropdown
                dropdown.classList.toggle('open');
            }
        });
    });

    // Close all dropdowns if clicking outside (mobile only)
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
            dropdowns.forEach((dropdown) => {
                if (!dropdown.contains(e.target)) {
                    dropdown.classList.remove('open');
                }
            });
        }
    });


    // reveal fade effect
    function revealOnScroll() {
        document.querySelectorAll('.fade-in-up').forEach(el => {
            const box = el.getBoundingClientRect();
            if (box.top < window.innerHeight - 80) el.classList.add('visible');
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // aos 
    AOS.init({
        duration: 800,
        once: true,
    });

    const lightbox = GLightbox();
    
});