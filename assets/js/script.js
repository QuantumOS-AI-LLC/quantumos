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