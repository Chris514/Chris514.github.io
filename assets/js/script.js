$(document).ready(function() {
   
    $('.avatar').hide().fadeIn(1000);
    $('.intro-section h1').hide().fadeIn(1200);
    $('.intro-section h2').hide().fadeIn(1400);
    $('.intro-text').hide().fadeIn(1600);
    $('.description').hide().fadeIn(1800);
    $('.social-links').hide().fadeIn(2000);

    
    $('.social-link').on('click', function(e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

   
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        $('body::before').css('transform', 'translateY(' + (scrollTop * 0.5) + 'px)');
    });

    
    function checkFadeIn() {
        $('.statement-paragraph').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in');
            }
        });
    }

   
    checkFadeIn();
    
    
    $(window).on('scroll', checkFadeIn);
}); 
