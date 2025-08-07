(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video - Fixed version
    const videoModal = document.getElementById('videoModal');
    const videoElement = videoModal ? videoModal.querySelector('video') : null;
    
    if (videoModal && videoElement) {
        // Remove autoplay attribute to prevent auto-starting
        videoElement.removeAttribute('autoplay');
        
        videoModal.addEventListener('shown.bs.modal', function () {
            // Only play the video when modal is actually opened
            videoElement.currentTime = 0; // Start from beginning
            videoElement.play().catch(e => console.log("Video play failed:", e));
        });
        
        videoModal.addEventListener('hide.bs.modal', function () {
            // Pause the video and reset to start when modal is hidden
            videoElement.pause();
            videoElement.currentTime = 0;
        });
        
        // Also handle when user clicks the close button or outside modal
        const closeButtons = videoModal.querySelectorAll('[data-bs-dismiss="modal"]');
        closeButtons.forEach(button => {
            button.addEventListener('click', function() {
                videoElement.pause();
                videoElement.currentTime = 0;
            });
        });

        // Handle clicking outside the modal
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoElement.pause();
                videoElement.currentTime = 0;
            }
        });
    }

    // Counter Animation
    function animateCounter() {
        $('.facts .display-2').each(function() {
            const $this = $(this);
            const target = parseInt($this.text().replace('+', ''));
            
            // Only animate if not already animated
            if (!$this.hasClass('counter-animated')) {
                $this.addClass('counter-animated');
                $this.prop('counter', 0).animate({
                    counter: target
                }, {
                    duration: 2500,
                    easing: 'swing',
                    step: function (now) {
                        $this.text(Math.ceil(now) + '+');
                    },
                    complete: function() {
                        $this.text(target + '+');
                    }
                });
            }
        });
    }

    // Trigger counter animation when the facts section comes into view
    let counterTriggered = false;
    $(window).scroll(function() {
        if (!counterTriggered) {
            const factsSection = $('.facts');
            if (factsSection.length > 0) {
                const factsTop = factsSection.offset().top;
                const windowTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                
                // Check if facts section is in viewport (trigger when 70% visible)
                if (windowTop + windowHeight > factsTop + 100) {
                    counterTriggered = true;
                    setTimeout(animateCounter, 300);
                }
            }
        }
    });

    // Also trigger on page load if facts section is already visible
    $(document).ready(function() {
        setTimeout(function() {
            const factsSection = $('.facts');
            if (factsSection.length > 0) {
                const factsTop = factsSection.offset().top;
                const windowTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                
                if (windowTop + windowHeight > factsTop + 100) {
                    animateCounter();
                    counterTriggered = true;
                }
            }
        }, 1000);
    });

    // Project carousel
    $(".project-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:2
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);