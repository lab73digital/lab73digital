$.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
};
var t1, t2, animActivated = false;
var idleTime = 0;
$(function () {
    //animation
    t1 = new TimelineMax();
    t2 = new TimelineMax({
        paused: true,
        onComplete: function () {
            $('#shooting__map').imageMapResize();
        },
        onReverseComplete: function () {
            animActivated = false;
        }
    }).to('.s-1__title-big, .s-1__title-small, .s-1__text, .s-1__btn-greenLine, .s-1__btn-orange', .4, {
        autoAlpha: 0,
        y: '50px',
        ease: Power1.easeInOut
    }).to('.main__bg-s1__gray3', .4, {
        y: '-100%',
        ease: Power1.easeInOut
    }).to('.main__bg-s1__gray2', .4, {
        y: '-100%',
        ease: Power1.easeInOut
    }).to('.main__bg-s1__gray1, .main__bg-s1__gray4', .4, {
        y: '-100%',
        ease: Power1.easeInOut
    }).to('.main__bg-s1__players', .4, {
        autoAlpha: 0,
        y: '50%',
        ease: Power1.easeInOut
    }).to('.shooting', .6, {
        autoAlpha: 1,
        display: 'block'
    });
    if (!_detectPhone()) {
        t1.fromTo('.header', .5, {
            autoAlpha: 0,
            y: '-100%'
        }, {
            autoAlpha: 1,
            y: '0%',
            ease: Power1.easeInOut,
            delay: 1
        }).fromTo('.nav-bar', .5, {
            autoAlpha: 0,
            right: '-30px'
        }, {
            autoAlpha: 1,
            right: '1.5625vw',
            ease: Power1.easeInOut
        }).fromTo('.s-1__title-big', .5, {
            autoAlpha: 0,
            y: '50%'
        }, {
            autoAlpha: 1,
            y: '0%',
            ease: Power1.easeInOut
        }).fromTo('.s-1__title-small', .5, {
            autoAlpha: 0,
            y: '50%'
        }, {
            autoAlpha: 1,
            y: '0%',
            ease: Power1.easeInOut
        }).fromTo('.s-1__text', .5, {
            autoAlpha: 0,
            y: '50%'
        }, {
            autoAlpha: 1,
            y: '0%',
            ease: Power1.easeInOut
        }).fromTo('.s-1__btn-greenLine, .s-1__btn-orange', .6, {
            autoAlpha: 0,
            y: '50%'
        }, {
            autoAlpha: 1,
            y: '0%',
            ease: Power2.easeInOut
        });
    }

    //scroll
    var $window = $(window);		//Window object

    var scrollTime = 0.7;			//Scroll time
    var scrollDistance = 250;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll
    var scrollPosition = [
        0,
        0
    ];
    var html = $('html');
    html.data('scroll-position', scrollPosition);
    $window.on('scroll mousewheel', function (e) {
        scrollPosition = [
            e.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
            e.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        ];

        if ($('.nav-menu').hasClass('opened')) {
            window.addEventListener('scroll', noscroll);
            return
        }
        if ($('body').hasClass('shooting-mode')) {
            window.addEventListener('scroll', noscroll);
            return
        }
        if ($('.main').hasClass('bg-animation1')) {
            window.addEventListener('scroll', noscroll);
            return
        }
        html.data('scroll-position', scrollPosition);
        window.removeEventListener('scroll', noscroll);
        menuBtnWatch();
    });
    $window.scrollEnd(function () {
        $('body').removeClass('scrolling');
    }, 50);
    $window.on("mousewheel DOMMouseScroll", function (event) {

        event.preventDefault();

        if ($('.nav-menu').hasClass('opened')) {
            return
        }
        if ($('body').hasClass('shooting-mode')) {
            return
        }
        if ($('.main').hasClass('bg-animation1')) {
            return
        }
        menuBtnWatch();
        var maxH = $(document).height() - $(window).height(),
            currSPos = $window.scrollTop();
        if (currSPos !== maxH && currSPos !== 0) {
            $('body').addClass('scrolling');
        }

        var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta * scrollDistance);

        TweenMax.to($window, scrollTime, {
            scrollTo: {y: finalScroll, autoKill: true},
            ease: Power1.easeOut,	//For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
            autoKill: true,
            overwrite: 5
        });

    });

    //resize
    $(window).on('resize', function () {
        $('.zoomContainer').remove();
        $(".shooting__img").elevateZoom({
            zoomType: "lens",
            lensShape: "round",
            responsive: true,
            lensSize: (16.145833333333336 * ($(window).width() * 0.01)),
            borderColour: '#00b140',
            borderSize: 1
        });
        bgHeight();
    });


    //mousemove
    $(document).on('mousemove', function (e) {
        var eOffsetX = e.pageX,
            eOffsetY = e.pageY;
        $('.shooting__map-target').each(function (i, e) {
            var coords = $(e).attr('coords'),
                cArr = coords.split(','),
                cXArr = [],
                cYArr = [],
                cXMax,
                cXMin,
                cYMax,
                cYMin;
            for (var i = 0; i < cArr.length; i++) {
                if (i % 2) {
                    cYArr.push(cArr[i])
                } else {
                    cXArr.push(cArr[i])
                }
            }
            cXMax = cXArr.reduce(function (a, b) {
                return Math.max(a, b);
            });
            cXMin = cXArr.reduce(function (a, b) {
                return Math.min(a, b);
            });
            cYMax = cYArr.reduce(function (a, b) {
                return Math.max(a, b);
            });
            cYMin = cYArr.reduce(function (a, b) {
                return Math.min(a, b);
            });
            if ((eOffsetX <= cXMax && eOffsetX >= cXMin) && (eOffsetY <= cYMax + 80 && eOffsetY >= cYMin + 80)) {
                $('body').addClass('target-hover');
                return false
            } else {
                $('body').removeClass('target-hover');
            }
        })
    });

    //hover
    $('.nav-bar__menu--hover').hover(function () {
        $('.nav-bar__menu--click').toggleClass('hover');
    }, function () {
        $('.nav-bar__menu--click').toggleClass('hover');
    });
    $('.s-1__btn-orange').hover(function () {
        if (animActivated) {
            return
        }
        TweenMax.to('.main__bg-s1__gray3', .4, {
            y: '-100%',
            ease: Power1.easeInOut
        })
    }, function () {
        if (animActivated) {
            return
        }
        TweenMax.to('.main__bg-s1__gray3', .4, {
            y: '0%',
            ease: Power1.easeInOut
        })
    });

    // Clicks
    $(document).on('click', '.nav-bar__menu--click', function () {
        $('.nav-bar__menu--click').toggleClass('close');
        $('.nav-bar__list').toggleClass('hide');
        if ($('.nav-menu').hasClass('opened')) {
            TweenMax.to('.nav-menu', .5, {
                y: '100%',
                display: 'none',
                ease: Power1.easeInOut
            });
            $('.nav-menu').toggleClass('opened');
        } else {
            TweenMax.killTweensOf('.nav-menu__text, .nav-menu__list-item, .nav-menu__footer');
            TweenMax.fromTo('.nav-menu__text', .6, {
                x: '50%',
                autoAlpha: 0
            }, {
                x: '0%',
                autoAlpha: 1,
                delay: .5
            });
            TweenMax.staggerFromTo('.nav-menu__list-item', .6, {
                x: '50%',
                autoAlpha: 0
            }, {
                x: '0%',
                autoAlpha: 1,
                delay: 1
            }, .1);
            TweenMax.fromTo('.nav-menu__footer', .6, {
                y: '50%',
                autoAlpha: 0
            }, {
                y: '0%',
                autoAlpha: 1,
                delay: 1.5
            });
            TweenMax.to('.nav-menu', .5, {
                y: '0%',
                display: 'block',
                ease: Power1.easeInOut
            });
            $('.nav-menu').toggleClass('opened');
        }
    });
    $('.s-4__carousel-item--click').on('click', function () {
        var player = $(this).attr('data-player'),
            popup = $('.sport__popup[data-player="' + player + '"]'),
            thisWidth = $(this).width(),
            thisHeight = $(this).height(),
            thisTop = $(this).offset().top,
            thisLeft = $(this).offset().left,
            popupHeight = popup.height(),
            popupWidth = popup.width(),
            popupTop = thisTop - popupHeight,
            popupLeft = (thisLeft + thisWidth / 2) - (popupWidth / 2);
        if (_detectPhone()) {
            popupLeft = ($(window).width() / 2) - (popupWidth / 2);
            if ($(window).width() < 768) {
                return
            }
        }
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            TweenMax.to(popup, .4, {
                autoAlpha: 0,
                display: 'none'
            })
        } else {
            $('.s-4__carousel-item--click').removeClass('active');
            $(this).addClass('active');
            if ($('.sport__popup').is(':visible')) {
                TweenMax.to($('.sport__popup'), .3, {
                    autoAlpha: 0,
                    display: 'none',
                    onComplete: function () {
                        popup.css({
                            top: popupTop - 40,
                            left: popupLeft
                        });
                        TweenMax.fromTo(popup, .4, {
                            autoAlpha: 0,
                            display: 'none',
                            y: '10%'
                        }, {
                            autoAlpha: 1,
                            display: 'flex',
                            y: '0%'
                        })
                    }
                })
            } else {
                popup.css({
                    top: popupTop - 40,
                    left: popupLeft
                });
                TweenMax.fromTo(popup, .4, {
                    autoAlpha: 0,
                    display: 'none',
                    y: '10%'
                }, {
                    autoAlpha: 1,
                    display: 'flex',
                    y: '0%'
                })
            }
            TMScrollTo(popupTop - 40);
        }
    });
    $('.nav-bar__list-item a').on('click', function (e) {
        e.preventDefault();
        var hash = e.currentTarget.hash;
        var posTop = $(hash).offset().top + 1;
        if (hash === '#s1') {
            posTop -= 80;
        }
        shootingHide();
        TMScrollTo(posTop);
    });
    $('.nav-menu__list-item a').on('click', function (e) {
        e.preventDefault();
        var hash = e.currentTarget.hash;
        var posTop;
        if ($(this).attr('href') === 'pdf/biathlon__rules.pdf') {
            window.open('pdf/biathlon__rules.pdf', '_blank');
            return
        }
        posTop = $(hash).offset().top + 1;
        if (hash === '#s1') {
            posTop -= 80;
        }
        shootingHide();
        $('.nav-bar__menu--click').toggleClass('close');
        $('.nav-bar__list').toggleClass('hide');
        TweenMax.to('.nav-menu', .5, {
            y: '100%',
            display: 'none',
            ease: Power1.easeInOut,
            onComplete: function () {
                $('.nav-menu').toggleClass('opened');
                TMScrollTo(posTop);
            }
        });
    });
    $('.s-1__btn-orange, .s-4__btn-orange').on('click', function (e) {
        e.preventDefault();
        if (_detectPhone()) {
            TMScrollTo(0, function () {
                TweenMax.to('.shooting', .6, {
                    autoAlpha: 1,
                    display: 'block'
                });
                $('body').addClass('shooting-cursor shooting-mode');
                shootingStart();
            });
        } else {
            TMScrollTo(0, function () {
                t2.play();
                animActivated = true;
                $('body').addClass('shooting-cursor shooting-mode');
                shootingStart();
            });
        }
    });
    $('.shooting__back--click').on('click', function (e) {
        e.preventDefault();
        shootingHide();
    });
    $(".shooting__img").on('click', function () {
        if ($('body').hasClass('target-hover')) {
            $('.zoomContainer').hide();
            TweenMax.to('.shooting__got', .5, {
                autoAlpha: 1,
                display: 'block'
            });
            $('.shooting').addClass('get');
        } else {

        }
    });
    $('.shooting__try').on('click', function (e) {
        e.preventDefault();
        TweenMax.to('.shooting__got', .5, {
            autoAlpha: 0,
            display: 'none'
        });
        $('.zoomContainer').show();
        $('.shooting').removeClass('get');
    });
    $('.shooting__got-niceShot__btn').on('click', function (e) {
        e.preventDefault();
        $('.shooting').addClass('got');
        TweenMax.to('.shooting__got-niceShot__right', .4, {
            autoAlpha: 0,
            display: 'none',
            onComplete: function () {
                TweenMax.to('.shooting__got-niceShot__right-down', .4, {
                    autoAlpha: 1,
                    display: 'flex'
                })
            }
        });
        TweenMax.to('.shooting__text', .4, {
            autoAlpha: 0,
            display: 'none'
        });
        TweenMax.to('.shooting__got', .4, {
            top: '40%'
        });
        TweenMax.to('.shooting__try', .4, {
            autoAlpha: 0,
            display: 'none',
            onComplete: function () {
                TweenMax.to('.shooting__got-down', .4, {
                    autoAlpha: 1,
                    display: 'flex'
                })
            }
        })
    });
    $('.main-anchor').on('click', function (e) {
        e.preventDefault();
        var hash = e.currentTarget.hash;
        var posTop = $(hash).offset().top + 1;
        if (hash === '#s1') {
            posTop -= 80;
        }
        TMScrollTo(posTop);
    });
    $('.go-away__popup-btn').on('click', function (e) {
        e.preventDefault();
        if (_detectPhone()) {
            TweenMax.to('.go-away__popup-container', .4, {
                autoAlpha: 0,
                onComplete: function () {
                    TMScrollTo(0, function () {
                        TweenMax.to('.shooting', .6, {
                            autoAlpha: 1,
                            display: 'block'
                        });
                        $('body').addClass('shooting-cursor shooting-mode');
                        shootingStart();
                    });
                }
            });
        } else {
            TweenMax.to('.go-away__popup-container', .4, {
                autoAlpha: 0,
                onComplete: function () {
                    TMScrollTo(0, function () {
                        t2.play();
                        animActivated = true;
                        $('body').addClass('shooting-cursor shooting-mode');
                        shootingStart();
                    });
                }
            });
        }
    });
    $(document).on('click', function (event) {
        if ($(event.target).hasClass('go-away__popup-container')) {
            TweenMax.to('.go-away__popup-container', .4, {
                autoAlpha: 0
            });
        }
    });
    // $(window).on('beforeunload', function () {
    //     TweenMax.to('.go-away__popup-container', .4, {
    //         autoAlpha: 1
    //     });
    //    return '';
    // });


    //Increment the idle time counter every minute.
    // var idleInterval = setInterval(timerIncrement, 1000); // 1 minute

    //Zero the idle timer on mouse movement.
    $(this).mousemove(function (e) {
        idleTime = 0;
    });
    $(this).keypress(function (e) {
        idleTime = 0;
    });

    //Plugins
    $('.s-2__count-down').countdown('2018/02/09 13:00:00', function (event) {
        var d = declOfNum(event.offset.totalDays, ['день', 'дня', 'дней']),
            h = declOfNum(event.offset.hours, ['час', 'часа', 'часов']),
            m = declOfNum(event.offset.minutes, ['минута', 'минуты', 'минут']),
            s = declOfNum(event.offset.seconds, ['секунда', 'секунды', 'секунд']);
        // var $this = $(this).html(event.strftime(''
        //     + '<div class="s-2__count-down-item skrollable" data-bottom-top="transform:translate(0,200px)" data-top-bottom="transform:translate(0,-200px)" ><span class="s-2__count-down__num">%D</span><span class="s-2__count-down__text">' + d + '</span></div>'
        //     + '<div class="s-2__count-down-item skrollable" data-bottom-top="transform:translate(0,200px)" data-top-bottom="transform:translate(0,-200px)" ><span class="s-2__count-down__num">%H</span><span class="s-2__count-down__text">' + h + '</span></div>'
        //     + '<div class="s-2__count-down-item skrollable" data-bottom-top="transform:translate(0,200px)" data-top-bottom="transform:translate(0,-200px)" ><span class="s-2__count-down__num">%M</span><span class="s-2__count-down__text">' + m + '</span></div>'
        //     + '<div class="s-2__count-down-item skrollable" data-bottom-top="transform:translate(0,200px)" data-top-bottom="transform:translate(0,-200px)" ><span class="s-2__count-down__num">%S</span><span class="s-2__count-down__text">' + s + '</span></div>'));
        $('.s-2__count-down-item-1').html(event.strftime('<span class="s-2__count-down__num">%D</span><span class="s-2__count-down__text">' + d + '</span>'));
        $('.s-2__count-down-item-2').html(event.strftime('<span class="s-2__count-down__num">%H</span><span class="s-2__count-down__text">' + h + '</span>'));
        $('.s-2__count-down-item-3').html(event.strftime('<span class="s-2__count-down__num">%M</span><span class="s-2__count-down__text">' + m + '</span>'));
        $('.s-2__count-down-item-4').html(event.strftime('<span class="s-2__count-down__num">%S</span><span class="s-2__count-down__text">' + s + '</span>'));
    });
    $('#shooting__map').imageMapResize();
    $('.s-4__carousel').slick({
        infinite: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        draggable: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    });
    $('.s-4__carousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        if (!($(window).width() < 768)) {
            $('.s-4__carousel-item--click').removeClass('active');
            TweenMax.to($('.sport__popup'), .3, {
                autoAlpha: 0,
                display: 'none'
            });
        }
    });
    $('.s-4__carousel').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        if ($(window).width() < 768) {
            TweenMax.to($('.sport__popup'), .2, {
                autoAlpha: 0,
                display: 'none',
                onComplete: function () {
                    TweenMax.to($('.sport__popup').eq(nextSlide), .4, {
                        autoAlpha: 1,
                        display: 'flex'
                    });
                }
            });
        }
    });
    if (_detectPhone()) {
        if ($(window).width() < 768) {
            TweenMax.set($('.sport__popup'), {
                top: $('.s-4__carousel').offset().top + $('.s-4__carousel').height(),
                left: 0
            });
            TweenMax.to($('.sport__popup:first-child'), .4, {
                autoAlpha: 1,
                display: 'flex'
            });
        }
    } else {
        $('#menu').clipthru({
            keepClonesInHTML: true,
            autoUpdate: true,
            autoUpdateInterval: 10
        });
    }
    new Clipboard('.shooting__goted-niceShot__copy', {
        text: function () {
            return $('.shooting__goted-niceShot__code').text();
        }
    });
    if (!_detectPhone()) {
        var s = skrollr.init({
            edgeStrategy: 'set',
            easing: {
                WTF: Math.random,
                inverted: function (p) {
                    return 1 - p;
                }
            }
        });
    }
    //functions
    menuBtnWatch();
    bgHeight();
});
function declOfNum(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

function shootingStart() {
    if ($('.zoomContainer').length) {
        if (!$('.shooting').hasClass('get')) {
            $('.zoomContainer').show();
        }
        return
    }
    $(".shooting__img").elevateZoom({
        zoomType: "lens",
        lensShape: "round",
        responsive: true,
        lensSize: (16.145833333333336 * ($(window).width() * 0.01)),
        borderColour: '#00b140',
        borderSize: 1
    });

}

function shootingHide() {
    if (_detectPhone()) {
        TweenMax.to('.shooting', .6, {
            autoAlpha: 0,
            display: 'none'
        });
    } else {
        t2.reverse();
    }
    $('body').removeClass('shooting-cursor shooting-mode');
    $('.zoomContainer').hide();
}

function TMScrollTo(pos, callback) {
    TweenMax.to(window, .6, {
        scrollTo: pos,
        onComplete: function () {
            if (callback) {
                callback();
            }
        }
    });
}
function bgHeight() {
    $('[data-bgH]').each(function (i, e) {
        var id = $(this).attr('data-bgH');
        if (id === 's2') {
            $('.main__bg-s2').css('top', $('#s1').height())
        }
        if (id === 's3') {
            $('.main__bg-s3').css('top', $('#s1').height() + $('#s2').height())
        }
        if (id === 's4') {
            $('.main__bg-s4').css('top', $('#s1').height() + $('#s2').height() + $('#s3').height() + 15)
        }
        $(this).height($('#' + id).height())
    })
}
function menuBtnWatch() {
    var winST = $(window).scrollTop();
    var sectionsWatch = $('.main__section');
    var btns = $('.nav-bar__list-item');
    var btns2 = $('.nav-menu__list-item');
    sectionsWatch.each(function (i, e) {
        var sectionsTop = $(e).offset().top;
        var sectionsBottom = sectionsTop + $(e).height();
        if (winST >= sectionsTop && winST <= sectionsBottom) {
            btns.removeClass('active');
            btns2.removeClass('active');
            $('.nav-menu__list-item a[href="#' + $(e).attr('id') + '"]').parent().addClass('active');
            $('.nav-bar__list-item a[href="#' + $(e).attr('id') + '"]').parent().addClass('active');
        }
    });
}
function noscroll() {
    var html = $('html');
    var scrollPosition = html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
}
function timerIncrement() {
    idleTime = idleTime + 1;
    if (idleTime > 10) { // 10 sec
        TweenMax.to('.go-away__popup-container', .4, {
            autoAlpha: 1
        });
    }
}
function _detectPhone() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}