$(document).ready(function() {
    // 页面加载时的动画效果
    $('.avatar').hide().fadeIn(1000);
    $('.intro-section h1').hide().fadeIn(1200);
    $('.intro-section h2').hide().fadeIn(1400);
    $('.intro-text').hide().fadeIn(1600);
    $('.description').hide().fadeIn(1800);
    $('.social-links').hide().fadeIn(2000);

    // 社交链接点击效果
    $('.social-link').on('click', function(e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 平滑滚动效果
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });

    // 视差滚动效果
    $(window).on('scroll', function() {
        var scrollTop = $(window).scrollTop();
        $('body::before').css('transform', 'translateY(' + (scrollTop * 0.5) + 'px)');
    });

    // 段落渐入效果
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

    // 初始检查
    checkFadeIn();
    
    // 滚动时检查
    $(window).on('scroll', checkFadeIn);
}); 