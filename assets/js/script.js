$(document).ready(function () {
    // toggle menu
    $(".toggle_menu").on("click", function () {
        $("body").toggleClass("show__menu");
    });

    // dropdown toggle for mobile
    const $dropdowns = $(".dropdown");

    $dropdowns.each(function () {
        const $dropdown = $(this);
        const $toggle = $dropdown.find(".dropdown-toggle");

        $toggle.on("click", function (e) {
            if ($(window).width() < 1024) {
                e.preventDefault();

                // Collapse other dropdowns
                $dropdowns.not($dropdown).removeClass("open");

                // Toggle current dropdown
                $dropdown.toggleClass("open");
            }
        });
    });

    // close all dropdowns if clicking outside (mobile only)
    $(document).on("click", function (e) {
        if ($(window).width() < 1024) {
            $dropdowns.each(function () {
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0) {
                    $(this).removeClass("open");
                }
            });
        }
    });

    $('.hero-slider').owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        animateOut: 'fadeOut',
        smartSpeed: 2000,
        dots: false,
        nav: false,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false
    });

    // reveal fade effect
    function revealOnScroll() {
        $(".fade-in-up").each(function () {
            const boxTop = this.getBoundingClientRect().top;
            if (boxTop < window.innerHeight - 80) {
                $(this).addClass("visible");
            }
        });
    }

    $(window).on("scroll", revealOnScroll);
    revealOnScroll();

    // AOS init
    AOS.init({
        duration: 800,
        once: true,
    });

    // GLightbox init
    const lightbox = GLightbox();
});
