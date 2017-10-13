var changeSectionQ = false,
    scrollReturner = true,
    height = window.innerHeight;
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize",
    screenApply,
    screenHeight = screen.height,
    screenWidth = screen.width,
    windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;
if (_detectPhone()) {
    orientationChanger();
    window.addEventListener(orientationEvent, function () {
        screenHeight = screen.height;
        screenWidth = screen.width;
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        orientationChanger();
    }, false);
} else {
    document.querySelector('.landing-container').style.display = 'block';
}

function orientationChanger() {
    if (_detectApple()) {
        if (Math.abs(window.orientation) === 90 || Math.abs(window.orientation) === 180) {
            screenApply = false;
        } else {
            screenApply = true;
        }
        if (screenApply) {
            document.querySelector('.landing-container').style.display = 'none';
            if (screenHeight >= 568) {
                document.querySelector('.rotate-block').style.display = 'block';
            } else {
                document.querySelector('.default-block').style.display = 'block';
            }
        } else {
            document.querySelector('.rotate-block').style.display = 'none';
            document.querySelector('.landing-container').style.display = 'block';
        }
    } else {
        screenApply = screenWidth < screenHeight;
        if (screenApply) {
            if (screenHeight >= 568) {
                document.querySelector('.landing-container').style.display = 'none';
                document.querySelector('.rotate-block').style.display = 'block';
            } else {
                document.querySelector('.default-block').style.display = 'block';
            }
        } else {
            document.querySelector('.rotate-block').style.display = 'none';
            document.querySelector('.landing-container').style.display = 'block';
        }
    }
}

$(function () {
    $(window).on('resize', function () {
        height = window.innerHeight;
    });
    _detectPhone(function () {
        $('html').addClass('mobile');
    }, function () {

    });
    if (_detectSafari()) {
        $('body').addClass('safari');
    }
    var startSection = $('.s-1');
    startSection.removeClass('hidden');
    backgroundChanger(startSection);
    sectionAnimation(startSection);
    contentAnimation(startSection);
    $('.scroll-screen.hidden').css({
        'pointer-events': 'none'
    });
    TweenMax.set('.scroll-screen', {
        y: 0,
        z: .1
    });
    $('.menu-likar__menu__click').on('click', _headerMenuClick);
    $(".s-2_icons-container_cell--click").on('click', function () {
        var indexSwitch = $(this).data('switch-text');
        $(".s-2_icons-container_cell--click").removeClass("active");
        $(this).addClass("active");
        $('[class^="s-2_content_switch-"]').addClass("s-2_content_switch_hidden");
        $(".s-2_content_switch-" + indexSwitch).removeClass("s-2_content_switch_hidden");
    });

    $('a.section__changer-anchor, a.button-yellow').on('click', function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash),
                screenEls = $('.scroll-screen'),
                visibleScreen = $('.scroll-screen:visible'),
                visibleI = screenEls.index(visibleScreen),
                targetI = screenEls.index(target);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                if (visibleI > targetI) {
                    sectionChanger(visibleScreen, target);
                } else {
                    sectionChanger(visibleScreen, target);
                }

                return false;
            }
        }
    });
    //Firefox
    $(document).bind('DOMMouseScroll', function (e) {
        scrollDirection(e, 'firefox');
        if (scrollReturner) {
            //prevent page fom scrolling
            return false;
        }
    });

    //IE, Opera, Safari
    $(document).bind('mousewheel', function (e) {
        scrollDirection(e);
        if (scrollReturner) {
            //prevent page fom scrolling
            return false;
        }
    });
    $('.section-changer__button-back').on('click', function () {
        var visibleScreen = $('.scroll-screen:visible'),
            target = visibleScreen.prev();
        if (!target.hasClass('scroll-screen')) {
            return
        }
        sectionChanger(visibleScreen, target);
    });
    $('.section-changer__button-next').on('click', function () {
        var visibleScreen = $('.scroll-screen:visible'),
            target = visibleScreen.next();
        if (!target.hasClass('scroll-screen')) {
            return
        }
        sectionChanger(visibleScreen, target);
    });
});

function _headerMenuClick() {
    var $headerMenu = $('.menu-likar__menu');
    TweenMax.killChildTweensOf($('.menu-likar__menu'));
    $('.menu-likar__menu-icon').toggleClass('close');
    $headerMenu.toggleClass('opened');
    if ($headerMenu.hasClass('opened')) {
        TweenMax.to('.menu-likar__menu-logo', .2, {opacity: 0, display: 'none'});
        TweenMax.to('.menu-likar__menu-list', .3, {
            opacity: 1,
            display: 'block',
            delay: .2
        });
    } else {
        TweenMax.to('.menu-likar__menu-list', .2, {opacity: 0, display: 'none'});
        TweenMax.to('.menu-likar__menu-logo', .3, {
            opacity: 1,
            display: 'block',
            delay: .2
        });
    }
};

function sectionChanger(visibleScreen, element) {
    if (!element.length || changeSectionQ || (visibleScreen[0] == element[0])) {
        return
    }

    changeSectionQ = true;
    visibleScreen.css({
        'pointer-events': 'none'
    });
    element.removeClass('hidden').show().css({
        'pointer-events': 'none'
    });
    backgroundChanger(element);
    TweenMax.fromTo(visibleScreen, .6, {
        opacty: 1
    }, {
        opacity: 0,
        onComplete: function () {
            visibleScreen.hide().addClass('hidden');
        }
    });
    TweenMax.fromTo(element, .6, {
        opacity: 0
    }, {
        opacity: 1,
        onComplete: function () {
            TweenMax.set(visibleScreen, {
                opacity: 1
            });
            element.css({
                'pointer-events': ''
            });
            contentAnimation(element);
            changeSectionQ = false;

        }
    });
    sectionAnimation(element);
    changeLiActive(element);
}

function sectionAnimation(element) {
    $('.woman').attr('class', 'woman');
    //$('.woman-svg').attr('class', 'woman-svg');
    $('.pack-on-woman').attr('class', 'pack-on-woman');
    $('.laktiki-on-woman').attr('class', 'laktiki-on-woman');
    $(".s-7_content_logo").attr('class', "s-7_content_logo");
    if ($(element).hasClass('s-1')) {
        $('.menu-likar__menu').removeClass('active');
        $('.menu-likar__white-box').addClass('opened');
        $(".s-7_content_logo").addClass("s-7_content_logo__passive");
    } else {
        $('.menu-likar__white-box').removeClass('opened');
        $('.menu-likar__menu').addClass('active');
    }
    if ($(element).hasClass('s-2')) {
        $(".woman").addClass("woman__grey-50");
        $(".s-7_content_logo").addClass("s-7_content_logo__passive");
    }
    if ($(element).hasClass('s-3')) {
        $(".woman").addClass("woman__grey-100");
        $(".s-7_content_logo").addClass("s-7_content_logo__passive");
    }
    if ($(element).hasClass('s-4')) {
        $(".woman").addClass("woman__grey-50-opacity");
        $(".s-7_content_logo").addClass("s-7_content_logo__passive");
        $(".pack-on-woman").addClass("pack-on-woman_active");
    }
    if ($(element).hasClass('s-5')) {
        $(".woman").addClass("woman__blur").finish();
        $(".s-7_content_logo").addClass("s-7_content_logo__passive");
        $(".laktiki-on-woman").delay(5000).addClass("laktiki-on-woman_active");
    }
    if ($(element).hasClass('s-6')) {
        $(".s-7_content_logo").addClass("s-7_content_logo__passive");
        //$(".pack-on-woman").addClass("");
    }
    if ($(element).hasClass('s-7')) {
        $(".woman").addClass("woman__blur_left");
        $(".pack-on-woman").addClass("pack-on-woman_active");
        $(".s-7_content_logo").addClass("s-7_content_logo__active");
    }
}

$(".samolik7").on('click', function () {
    $(this).toggleClass('samolik_passive');
});
$(".samolik").on('click', function () {
    $(this).toggleClass('samolik_passive_hide');
});

var counter_s1 = true, counter_s2 = true, counter_s3 = true, counter_s4 = true, counter_s5 = true, counter_s6 = true, counter_s7 = true;
function contentAnimation(element) {
    //$('.woman-svg').attr('class', 'woman-svg');
    if ($(element).hasClass('s-1')) {
        if(counter_s1) {

            new TimelineMax().fromTo('.woman', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.woman-svg', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).staggerFromTo($('[data-name="lact-bacteria-n"]'), .1, {
                opacity: 0
            }, {
                opacity: 1
            }, .04).fromTo('.s-1_animation-1', 0.5, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0
            }).fromTo('.s-1_animation-2', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-1_animation-3', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            });
            counter_s1 = false;
        } else {
            $('#woman-id').attr('class', 'woman-svg__for_s1');
             TweenMax.fromTo($('[data-name="bacteria"]'), .3, {
                 opacity: 1
             }, {
                 opacity: 0
             });
            TweenMax.to($('[data-name="bacteria-more"]'), 0, {
                opacity: 0
            });
        }
    }
    if ($(element).hasClass('s-2')) {
        if(counter_s2) {
            $('.woman-svg').attr('class', 'woman-svg').addClass('woman-svg__for_s2');
            new TimelineMax().staggerFromTo($('[data-name="bacteria"]'), .3, {
                opacity: 0
            }, {
                opacity: 1
            }, .04).fromTo('.s-2_animation-1', 0.5, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                delay: 0
            }).fromTo('.s-2_animation-2', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-2_animation-3', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-2_animation-4', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-2_animation-55', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-2_animation-5', 0.5, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            }).fromTo('.s-2_animation-6', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            });
            counter_s2 = false;
        } else {
            $('#woman-id').attr('class', 'woman-svg__for_s2');
            TweenMax.fromTo($('[data-name="bacteria"]'), 0, {
                opacity: 0
            }, {
                opacity: 1
            });
            TweenMax.fromTo($('[data-name="bacteria-more"]'), 0, {
                opacity: 1
            }, {
                opacity: 0
            });
            //$('.woman-svg').addClass('woman-svg__for_s2');
        }
    }
    if ($(element).hasClass('s-3')) {
        if(counter_s3) {
            $('.woman-svg').attr('class', 'woman-svg').addClass('woman-svg__for_s3');
            new TimelineMax().staggerFromTo($('[data-name="bacteria-more"]'), .3, {
                opacity: 0
            }, {
                opacity: 1
            }, .04).fromTo('.s-3_animation-1', 0.5, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                delay: 0
            }).fromTo('.s-3_animation-2', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-3_animation-3', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-3_animation-4', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-3_animation-6', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            });
            counter_s3 = false;
        } else {
            $('#woman-id').attr('class', 'woman-svg__for_s3');
            TweenMax.fromTo($('[data-name="bacteria-more"]'), .3, {
                opacity: 0
            }, {
                opacity: 1
            })
            //$('.woman-svg').addClass('woman-svg__for_s2');
        }

    }
    if ($(element).hasClass('s-4')) {
        if (counter_s4) {
            $('.woman-svg').attr('class', 'woman-svg').addClass('woman-svg__for_s4');
            new TimelineMax().fromTo('.s-4_animation-1', 0.5, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                delay: 0
            }).fromTo('.s-4_animation-2', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-4_animation-3', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-4_animation-5', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-4_animation-6', 0.5, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            }).fromTo('.s-4_animation-7', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            });
            counter_s4 = false;
        } else {
            $('#woman-id').attr('class', 'woman-svg__for_s4');
            // TweenMax.fromTo($('[data-name="lact-bacteria-n"]'), 0, {
            //     opacity: 1
            // }, {
            //     opacity: 0
            // });
        }
    }
    if ($(element).hasClass('s-5')) {
        if(counter_s5) {
            $('.woman-svg').attr('class', 'woman-svg').addClass('woman-svg__for_s5');
            new TimelineMax().staggerFromTo($('[data-name="lact-bacteria-n"]'), .1, {
                opacity: 0
            }, {
                opacity: 1
            }, .04).staggerFromTo($('[data-name="bacteria-more"],[data-name="bacteria"]'), .1, {
                opacity: 1
            }, {
                opacity: 0
            }, .02).fromTo('.s-5_animation-1', 0.5, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            delay: 0
        }).fromTo('.s-5_animation-2', 0.5, {
            opacity: 0
        }, {
            opacity: 1
        }).fromTo('.s-5_animation-3', 0.5, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1
        }).fromTo('.s-5_animation-4', 0.5, {
            y: 50,
            opacity: 0
        }, {
            y: 0,
            opacity: 1
        }).fromTo('.s-5_animation-5', 0.5, {
            x: -50,
            opacity: 0
        }, {
            x: 0,
            opacity: 1
        }).fromTo('.s-5_animation-6', 0.5, {
            opacity: 0
        }, {
            opacity: 1
        });
        counter_s5 = false;
        } else {
            $('#woman-id').attr('class', 'woman-svg__for_s5');
            TweenMax.to($('[data-name="lact-bacteria-n"]'), .3, {
                opacity: 1
            });
            TweenMax.to($('[data-name="bacteria-more"],[data-name="bacteria"]'), 0, {
                opacity: 0
            });
        }

    }
    if ($(element).hasClass('s-6')) {
        if (counter_s6) {
            $('.woman-svg').attr('class', 'woman-svg').addClass('woman-svg__for_s6');
            new TimelineMax().fromTo('.s-6_animation-1', 0.5, {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                delay: 0
            }).fromTo('.s-6_animation-2', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            });

            TweenMax.staggerFromTo('.s-6_animation-3', .3, {
                opacity: 0,
                y: 50
            }, {
                delay: 1,
                y: 0,
                opacity: 1
            }, .25);

            new TimelineMax().fromTo('.s-6_animation-4', 0.9, {
                x: -50,
                opacity: 0
            }, {
                delay: 1,
                x: 0,
                opacity: 1
            }).fromTo('.s-6_animation-5', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            });
            counter_s6 = false;
        } else {
            $('#woman-id').attr('class', 'woman-svg__for_s6');
            TweenMax.to($('[data-name="lact-bacteria-n"]'), .3, {
                opacity: 1
            });
            TweenMax.to($('[data-name="bacteria-more"],[data-name="bacteria"]'), 0, {
                opacity: 0
            });
        }
    }
    if ($(element).hasClass('s-7')) {
        if (counter_s7) {
            $('.woman-svg').attr('class', 'woman-svg').addClass('woman-svg__for_s7');
            new TimelineMax().fromTo('.s-7_animation-1', 0.5, {
                opacity: 0
            }, {
                opacity: 1,
                delay: 0
            }).fromTo('.s-7_animation-2', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-7_animation-3', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.s-7_animation-4', 0.5, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1
            }).fromTo('.s-7_animation-5', 0.5, {
                opacity: 0
            }, {
                opacity: 1
            }).fromTo('.samolik7', 0.5, {
                opacity: 0,
                y: 100
            }, {
                opacity: 1,
                y: 0
            });
            counter_s7 = false;
        } else {
            $('#woman-id').attr('class', 'woman-svg__for_s7');
        }
    }
}

function backgroundChanger(el) {
    var elId = el.attr('id');
    TweenMax.to('.background-item', .3, {
        opacity: 0
    });
    TweenMax.to('.background-item.' + elId, .3, {
        opacity: 1
    });
}

function changeLiActive(el) {
    var li1 = $('.navigation__nav li'),
        screenEls = $('.scroll-screen'),
        visibleI = screenEls.index(el);
    li1.removeClass('active').eq(visibleI).addClass('active');
}

function scrollDirection(event, brwsr) {
    var visibleScreen = $('.scroll-screen:visible'),
        nextEl = visibleScreen.next('.scroll-screen'),
        prevEl = visibleScreen.prev('.scroll-screen');
    if (brwsr === 'firefox') {
        if (event.originalEvent.detail > 0) {
            //scroll down
            sectionChanger(visibleScreen, nextEl);
        } else {
            //scroll up
            sectionChanger(visibleScreen, prevEl);
        }
    } else {
        if (event.originalEvent.wheelDelta < 0) {
            //scroll down
            sectionChanger(visibleScreen, nextEl);
        } else {
            //scroll up
            sectionChanger(visibleScreen, prevEl);
        }
    }
}

function _detectPhone(phone, desktop) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (phone) {
            phone();
        }
        return true
    } else {
        if (desktop) {
            desktop();
        }
        return false
    }
}

function _detectApple() {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        $('html').addClass('ios-mobile');
        return true
    } else {
        return false
    }
}

function _detectSafari() {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
        return true
    } else {
        return false
    }
}
