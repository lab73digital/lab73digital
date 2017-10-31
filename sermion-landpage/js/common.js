// var changeSectionQ = false,
//     scrollReturner = true,
//     height = window.innerHeight;
// var supportsOrientationChange = "onorientationchange" in window,
//     orientationEvent = supportsOrientationChange ? "orientationchange" : "resize",
//     screenApply,
//     screenHeight = screen.height,
//     screenWidth = screen.width,
//     windowHeight = window.innerHeight,
//     windowWidth = window.innerWidth;
// if (_detectPhone()) {
//     orientationChanger();
//     window.addEventListener(orientationEvent, function () {
//         screenHeight = screen.height;
//         screenWidth = screen.width;
//         windowHeight = window.innerHeight;
//         windowWidth = window.innerWidth;
//         orientationChanger();
//     }, false);
// } else {
//     document.querySelector('.landing-container').style.display = 'block';
// }
//
// function orientationChanger() {
//     if (_detectApple()) {
//         if (Math.abs(window.orientation) === 90 || Math.abs(window.orientation) === 180) {
//             screenApply = false;
//         } else {
//             screenApply = true;
//         }
//         if (screenApply) {
//             document.querySelector('.landing-container').style.display = 'none';
//             if (screenHeight >= 568) {
//                 document.querySelector('.rotate-block').style.display = 'block';
//             } else {
//                 document.querySelector('.default-block').style.display = 'block';
//             }
//         } else {
//             document.querySelector('.rotate-block').style.display = 'none';
//             document.querySelector('.landing-container').style.display = 'block';
//         }
//     } else {
//         screenApply = screenWidth < screenHeight;
//         if (screenApply) {
//             if (screenHeight >= 568) {
//                 document.querySelector('.landing-container').style.display = 'none';
//                 document.querySelector('.rotate-block').style.display = 'block';
//             } else {
//                 document.querySelector('.default-block').style.display = 'block';
//             }
//         } else {
//             document.querySelector('.rotate-block').style.display = 'none';
//             document.querySelector('.landing-container').style.display = 'block';
//         }
//     }
// }
//
// function _detectPhone(phone, desktop) {
//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//         if (phone) {
//             phone();
//         }
//         return true
//     } else {
//         if (desktop) {
//             desktop();
//         }
//         return false
//     }
// }
//
// function _detectApple() {
//     if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
//         $('html').addClass('ios-mobile');
//         return true
//     } else {
//         return false
//     }
// }
//
// function _detectSafari() {
//     if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
//         return true
//     } else {
//         return false
//     }
// }

$(document).ready(function () {
    //$('.sermion-page').hide();
    //$('[class*="goto"]').hide();
    // $('.parallax').parallax({
    //     imageSrc: 'img/doc-parallax/inside-bg.jpg',
    //     speed: 0.8
    // });

    var controller = new ScrollMagic.Controller();

    var tweenScreen1 = new TimelineMax().to('.screen-1', .5,
        {
            ease: Power1.easeInOut,
            opacity: 1
        }).add(TweenMax.to('.head-svg', .5,
        {
            ease: Power1.easeInOut,
            opacity: 1
        }), '.head-svg').add(TweenMax.from('.animation_1_1', .5,
        {
            ease: Power1.easeInOut,
            opacity: 0
        }), '.head-svg').from('.animation_1_2', .5,
        {
            ease: Power1.easeInOut,
            opacity: 0
        }).from('.animation_1_3', .5,
        {
            ease: Power1.easeInOut,
            opacity: 0
        }).staggerFrom('.animation_1_4', .9,
        {
            opacity: 0,
            y: -30
        }, .3).from('.animation_1_5', .5,
        {
            ease: Power1.easeInOut,
            opacity: 0
        }).to('.animation_1_6', .3,
        {
            ease: Power1.easeInOut,
            opacity: 1
        });

    new ScrollMagic.Scene({
        triggerElement: ".animation_1_1",
        reverse: false
    }).setTween(tweenScreen1).addTo(controller);


    var disclaimerShowed = false;

    $('.to-sermion').on('click', function () {
        headPuzzleGatherAll();
        if (!disclaimerShowed) {
            $("body").css("overflow", "hidden");
            new TimelineMax().set('.disclaimer', {
                display: 'block'
            }).fromTo('.disclaimer', .7, {
                opacity: 0
            }, {
                opacity: 1
            });
            $('.head-svg').css('pointer-events', 'none');
            //console.log('pointer-events:none');
            //$('.disclaimer').show('slow');
        } else {
            $('.parallax-mirror').css('display', 'block');
        }

        $('.head-svg').css('width', 'auto');
        scrolledToBottom = false;

        new TimelineMax().to('.screen-page:visible', 0.5, {
            opacity: 0,
            display: 'none',
            ease: Power1.easeInOut,
            onComplete: function () {
                $(window).scrollTop(0);
            }
        }).fromTo('.sermion-page', 0.5, {
            opacity: 0,
            display: 'none',
            y: $(window).height(),
            ease: Power1.easeInOut
        }, {
            opacity: 1,
            display: 'block',
            y: 0,
            ease: Power1.easeInOut,
            onComplete: function () {
                //$('.parallax-mirror').css('display','block');
                // $('.parallax').parallax({
                //     imageSrc: 'img/doc-parallax/inside-bg.jpg',
                //     speed: 0.8
                // });
                var tween0 = new TimelineMax().staggerFrom('.parallax_text', 0.9,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0,
                        y: 50
                    }, 0.3);
                var tween5 = new TimelineMax().from('.animation_sermion-page_1', 0.6,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0
                    }).from('.animation_sermion-page_2', 0.5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0
                    }).from('.animation_sermion-page_3', 0.5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0
                    }).from('.animation_sermion-page_4', 0.5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0
                    }).from('.animation_sermion-page_5', 0.5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0
                    }).from('.animation_sermion-page_6', 0.5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0
                    });
                var tween1 = new TimelineMax().fromTo('.s-3__graph-line, .s-3__graph-circle, .s-3__graph-percent', 1, {
                    opacity: 0
                }, {
                    opacity: 1
                }).add(TweenMax.from('.s-3__graph-circle, .s-3__graph-percent', 1, {
                    bottom: 0
                }), '.s-3__graph-line, .s-3__graph-circle, .s-3__graph-percent').add(TweenMax.from('.s-3__graph-line', 1, {
                    height: 0
                }), '.s-3__graph-line, .s-3__graph-circle, .s-3__graph-percent').add(function () {
                    $('.s-3__animate-number').each(function () {
                        var number = $(this).data('number');
                        var decimal_places = 1;
                        var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
                        $(this).animateNumber({
                            number: number * decimal_factor,

                            numberStep: function (now, tween) {
                                var floored_number = Math.floor(now) / decimal_factor,
                                    target = $(tween.elem);

                                if (decimal_places > 0) {
                                    // force decimal places even if they are 0
                                    floored_number = floored_number.toFixed(decimal_places);

                                    // replace '.' separator with ','
                                    floored_number = floored_number.toString();
                                }

                                target.text(floored_number);
                            }
                        }, 1000)
                    });
                }, '.s-3__graph-line, .s-3__graph-circle, .s-3__graph-percent');

                var tween2 = new TimelineMax().from('.s-4__graph-item_row--1', .6, {
                    ease: Power1.easeInOut,
                    opacity: 0,
                    y: -50
                }).from('.s-4__graph-item_row--2', .6, {
                    ease: Power1.easeInOut,
                    opacity: 0,
                    y: -50
                }).from('.s-4__graph-item_row--3', .6, {
                    ease: Power1.easeInOut,
                    opacity: 0,
                    y: -50
                }).from('.s-4__graph-item_row--4', .6, {
                    ease: Power1.easeInOut,
                    opacity: 0,
                    y: -50
                }).from('.s-4__graph-item_row--5', .6, {
                    ease: Power1.easeInOut,
                    opacity: 0,
                    y: -50
                });

                var tween3 = new TimelineMax().staggerFrom('.td-circle_animation--1', .9, {
                    ease: Power1.easeInOut,
                    opacity: 0,
                    width: 0,
                    height: 0
                }, 0.3).staggerFrom('.td-circle_animation--2', .9, {
                    ease: Power1.easeInOut,
                    opacity: 0,
                    width: 0,
                    height: 0
                }, 0.3);
                var tween4 = new TimelineMax().staggerTo('.td-circle_animation--1 p', .9, {
                    ease: Power1.easeInOut,
                    opacity: 1
                }, 0.3).staggerTo('.td-circle_animation--2 p', .9, {
                    ease: Power1.easeInOut,
                    opacity: 1
                }, 0.3);

                new ScrollMagic.Scene({
                    triggerElement: ".s-3",
                    reverse: false
                }).setTween(tween1).addTo(controller);
                new ScrollMagic.Scene({
                    triggerElement: ".s-4",
                    reverse: false
                }).setTween(tween2).addTo(controller);
                new ScrollMagic.Scene({
                    triggerElement: ".s-5",
                    reverse: false
                }).setTween(tween3).addTo(controller);
                new ScrollMagic.Scene({
                    triggerElement: ".s-5",
                    reverse: false
                }).setTween(tween4).addTo(controller);
                new ScrollMagic.Scene({
                    triggerElement: ".parallax",
                    reverse: false
                }).setTween(tween0).addTo(controller);
                new ScrollMagic.Scene({
                    triggerElement: ".animation_sermion-page_1",
                    reverse: false
                }).setTween(tween5).addTo(controller);

            }
        });


    });


    $('#screen-1_button').on('click', function () {
        if ($('.head-svg').hasClass('head-opened')) {
            return
        }
        TweenMax.to('.screen-1_visible', 0.7, {
            opacity: 0,
            onComplete: function () {
                $('.screen-1_visible').toggleClass('hide');
                $('.screen-1_hidden').toggleClass('show');
                TweenMax.from('.screen-1_hidden', 0.7, {opacity: 0});
                $('svg').css('pointer-events', 'auto');
            }
        });

        $('.head-svg').addClass('head-opened');
        $('.drop-shadow_here').addClass('shadow-puzzles');
        PuzzleExplode();
        headPuzzleFistCheck();


    });

    //$('.disclaimer').hide();
    $('.discard').on('click', function () {
        location.reload();
    });
    $('.confirm').on('click', function () {
        disclaimerShowed = true;
        $('.parallax-mirror').css('display', 'block');
        $('svg').css('pointer-events', 'auto');
        TweenMax.from('.parallax-mirror', .5, {

            delay: 2,
            opacity: 0
        });
        $('.parallax').parallax({
            imageSrc: 'img/doc-parallax/inside-bg.jpg',
            speed: 0.8
        });
        $('.disclaimer').hide('slow');
        $("body").css("overflow", "auto");
        $('.sermion-page').removeClass('sermion-overlay');
    });

    function PuzzleExplode() {
        if (!( $('#violet-1').hasClass('head_puzzle--checked') || $('#violet-1').hasClass('head_puzzle--pasted') )) {
            console.log('violet exploded');
            var puzzleTweenViolet = new TimelineMax().fromTo('#violet-1', 0.7,
                {
                    ease: Power4.easeInOut,
                    x: 0,
                    y: 0,
                    rotation: 0
                }, {
                    ease: Power1.easeInOut,
                    x: -400,
                    y: 0,
                    rotation: -25
                }).to('#violet-1', 2,
                {
                    ease: Power1.easeInOut,
                    rotation: -15,
                    x: -410,
                    y: 5,
                    repeat: -1,
                    yoyo: true
                });
        }
        if (!( $('#red-2').hasClass('head_puzzle--checked') || $('#red-2').hasClass('head_puzzle--pasted') )) {
            console.log('red exploded');
            var puzzleTweenRed = new TimelineMax().fromTo('#red-2', 0.7,
                {
                    ease: Power4.easeInOut,
                    x: 0,
                    y: 0,
                    rotation: 0
                }, {
                    ease: Power1.easeInOut,
                    x: -300,
                    y: 200,
                    rotation: -35
                }).to('#red-2', 2,
                {
                    ease: Power1.easeInOut,
                    rotation: -25,
                    x: -310,
                    y: 205,
                    repeat: -1,
                    yoyo: true
                });
        }

        if (!( $('#yelloow-3').hasClass('head_puzzle--checked') || $('#yelloow-3').hasClass('head_puzzle--pasted') )) {
            console.log('yellow exploded');
            var puzzleTweenYellow = new TimelineMax().fromTo('#yelloow-3', 0.7, {
                    ease: Power4.easeInOut,
                    x: 0,
                    y: 0,
                    rotation: 0
                },
                {
                    ease: Power1.easeInOut,
                    x: 280,
                    y: -50,
                    rotation: -20
                }).to('#yelloow-3', 2,
                {
                    ease: Power1.easeInOut,
                    rotation: -30,
                    x: 290,
                    y: -40,
                    repeat: -1,
                    yoyo: true
                });
        }

        if (!( $('#blue-4').hasClass('head_puzzle--checked') || $('#blue-4').hasClass('head_puzzle--pasted') )) {
            console.log('blue exploded');
            var puzzleTweenBlue = new TimelineMax().fromTo('#blue-4', 0.7, {
                    ease: Power4.easeInOut,
                    x: 0,
                    y: 0,
                    rotation: 0
                },
                {
                    ease: Power1.easeInOut,
                    x: 300,
                    y: 50,
                    rotation: 15
                }).to('#blue-4', 2,
                {
                    ease: Power1.easeInOut,
                    rotation: 5,
                    x: 310,
                    y: 40,
                    repeat: -1,
                    yoyo: true
                });
        }


        TweenMax.to('.puzzle_text', .5, {
            fill: '#615f5f',
            opacity: 1,
            delay: 0.8
        });
        //$('.puzzle_text').addClass('puzzle_text--active');
        //$('.drop-shadow_here').addClass('shadow-puzzles');


        var puzzleTweenKilledRed = false;
        var puzzleTweenKilledBlue = false;
        var puzzleTweenKilledViolet = false;
        var puzzleTweenKilledYellow = false;
        $('#red-2').on('click', function () {
            puzzleTweenRed.kill();
            puzzleTweenKilledRed = true;
        }).on('mouseenter', function () {
            puzzleTweenRed.paused(true);
        }).on('mouseleave', function () {
            if (!puzzleTweenKilledRed) {
                if (!$('.sermion-page:visible').length) {
                    puzzleTweenRed.paused(false);
                }
            }
        });
        $('#violet-1').on('click', function () {
            puzzleTweenViolet.kill();
            puzzleTweenKilledViolet = true;
        }).on('mouseenter', function () {
            puzzleTweenViolet.paused(true);
        }).on('mouseleave', function () {
            if (!puzzleTweenKilledViolet) {
                if (!$('.sermion-page:visible').length) {
                    puzzleTweenViolet.paused(false);
                }
            }
        });
        $('#blue-4').on('click', function () {
            puzzleTweenBlue.kill();
            puzzleTweenKilledBlue = true;
        }).on('mouseenter', function () {
            puzzleTweenBlue.paused(true);
        }).on('mouseleave', function () {
            if (!puzzleTweenKilledBlue) {
                if (!$('.sermion-page:visible').length) {
                    puzzleTweenBlue.paused(false);
                }
            }
        });
        $('#yelloow-3').on('click', function () {
            puzzleTweenYellow.kill();
            puzzleTweenKilledYellow = true;
        }).on('mouseenter', function () {
            puzzleTweenYellow.paused(true);
        }).on('mouseleave', function () {
            if (!puzzleTweenKilledYellow) {
                if (!$('.sermion-page:visible').length) {
                    puzzleTweenYellow.paused(false);
                }
            }
        });
    }

    function pagePuzzlesSwitcher(activePage) {
        console.log(activePage);
        $('.page_puzzle__active').removeClass('page_puzzle__active');
        $(activePage).find('.page_puzzle_first-item').addClass('page_puzzle__active');
        $(activePage).find('.page_puzzle__active').everyTime(3500, function () {
            if (!$(activePage).find('.page_puzzle__active').parent().next().length) {
                $(activePage).find('.page_puzzle__active').removeClass('page_puzzle__active');
                $(activePage).find('.page_puzzle_first-item').addClass('page_puzzle__active');
            } else {
                $(activePage).find('.page_puzzle__active').removeClass('page_puzzle__active').parent().next().find('.page_puzzle').addClass('page_puzzle__active');
            }
        });

    }


    var scrolledToBottom = false;

    function scrollHead() {
        $('svg').css('pointer-events', 'none');
        console.log('pointer-events nooooooone');
        $(window).on('scroll', function () {
            if (scrolledToBottom) {
                //scrolledToBottom = false;
                return
            }
            if ($('.screen-page:visible').length) {
                var bodyTop = $(window).scrollTop(),
                    visiblePage = $('.screen-page:visible').height(),
                    windowHeight = $(window).height(),
                    headSvgLeft = '';
                var headPosTop = (bodyTop / (visiblePage - windowHeight));
                if (headPosTop * 30 > 24) {
                    var ttttop = ($('.head-svg').offset().top + $('.head-svg').height() / 2) / visiblePage * 100;
                    var lllleft = ($('.head-svg').offset().left + $('.head-svg').width() / 2) / $('.screen-page:visible').width() * 100;
                    //console.log(ttttop, lllleft);
                    new TimelineMax().to($('.head_puzzle--checked').find('.puzzle_image_bad'), .5,
                        {
                            opacity: 0, display: 'none'
                        }).to($('.head_puzzle--checked').find('.puzzle_image_good'), .5,
                        {
                            opacity: 1, display: 'inline'
                        });
                    new TimelineMax().set('.head_puzzle--checked',
                        {
                            y: 0,
                            onComplete: function () {
                                $('.head_puzzle--checked').find('.drop-shadow_here').removeClass('shadow-puzzles');
                                $('.head_puzzle--unchecked').find('.puzzle_text').css('display', 'block');
                                if ($('.head_puzzle--pasted').length === 3) {
                                    $('.hide-if-4-pasted').css('display', 'none');
                                    console.log('length === 4');
                                }
                            }
                        }).set('.head-svg', {
                        position: 'absolute',
                        top: ttttop + '%',
                        left: lllleft + '%'
                    }).to('.head-svg', 2, {
                        bezier: [{left: lllleft + '%', top: ttttop + '%'}, {left: '15%', top: 90 + '%'},
                            {left: '50%', top: 93 + '%'}],
                        ease: Power1.easeInOut,
                        onComplete: function () {
                            $('.head_puzzle--checked').addClass('head_puzzle--pasted');
                            $('.head_puzzle--pasted').removeClass('head_puzzle--checked');
                            $('.head_puzzle--unchecked').find('.puzzle_text').addClass('puzzle_text--big');
                            new TimelineMax().set('.head-svg',
                                {
                                    top: ($('.head-svg').offset().top + $('.head-svg').height / 2) / windowHeight * 10 + '%',
                                    position: 'absolute'
                                }).to($('.head_puzzle--pasted').find('.puzzle_text_good'), .5,
                                {
                                    display: 'inline',
                                    opacity: 1
                                }).to('.head_puzzle--unchecked', 0.5,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 1,
                                    display: 'block',
                                    onComplete: function () {
                                        $('svg').css('pointer-events', 'auto');
                                        headPuzzleCheck();
                                    }
                                });
                        }
                    });
                    scrolledToBottom = true;
                } else {
                    headSvgLeft = '7vw';
                    TweenMax.set('.head-svg',
                        {
                            top: 50 + (headPosTop * 30) + 'vh',
                            left: headSvgLeft
                        });
                    TweenMax.set('.head_puzzle--checked',
                        {
                            y: -800 + headPosTop * 800,
                            onComplete: function () {
                                //$('svg').css('pointer-events', 'auto');
                            }
                        });
                }
            } else if ($('.sermion-page:visible').length) {
                //console.log('sermion-page is ready to scroll');
                var bodyTopSer = $(window).scrollTop(),
                    visiblePageSer = $('.sermion-page:visible').height(),
                    windowHeightSer = $(window).height(),
                    headPosTopSer = (bodyTopSer / (visiblePageSer - windowHeightSer)),
                    headSvgLeftSer = '7%';
                TweenMax.set('.head-svg',
                    {
                        top: 20 + (headPosTopSer * 50) + '%',
                        left: headSvgLeftSer,
                        onComplete: function () {
                            //$('svg').css('pointer-events', 'auto');
                        }
                    });
            }
        });
    }

    //scrollHead();


    function headPuzzleFistCheck() {
        $('.head_puzzle--click').on('click', function () {
            if (!$('.head_puzzle--pasted').length) {
                var goto = $(this).data('goto-page');
                //$('.page_puzzle__active').removeClass('page_puzzle__active');
                pagePuzzlesSwitcher(goto);
                TweenMax.to('.screen-1', 1,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0,
                        display: 'none',
                        onComplete: function () {
                            scrollHead();
                            new TimelineMax().set(goto,
                                {display: 'block'}).fromTo(goto, 1,
                                {ease: Power1.easeInOut, opacity: 0, y: $(window).height() + 'px'},
                                {ease: Power1.easeInOut, opacity: 1, y: 0}).from($('.animation_screen-page_1:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).from($('.animation_screen-page_2:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).from($('.animation_screen-page_3:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).from($('.animation_screen-page_4:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).staggerFrom($('.animation_screen-page_5:visible'), 0.9,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0,
                                    y: -30
                                }, 0.3);
                            var tweenScreenPage1 = new TimelineMax().from($('.animation_screen-page_6:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).staggerFrom($('.animation_screen-page_7:visible'), 0.9,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }, 0.3);
                            var tweenScreenPage2 = new TimelineMax().from($('.animation_screen-page_8:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).from($('.animation_screen-page_9:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).from($('.animation_screen-page_10:visible'), 0.6,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0
                                }).staggerFrom($('.animation_screen-page_11:visible'), 0.9,
                                {
                                    ease: Power1.easeInOut,
                                    opacity: 0,
                                    y: -30
                                }, 0.3).from($('.animation_screen-page_12:visible'), 0.6,
                                {
                                    opacity: 0,
                                    onComplete: function () {
                                        $('.screen-page:visible').find('[class*="animation"]').removeClass('[class*="animation"]');
                                    }
                                });
                            new ScrollMagic.Scene({
                                triggerElement: $('.animation_screen-page_6:visible'),
                                reverse: false
                            }).setTween(tweenScreenPage1).addTo(controller);
                            new ScrollMagic.Scene({
                                triggerElement: $('.animation_screen-page_8:visible'),
                                reverse: false
                            }).setTween(tweenScreenPage2).addTo(controller);
                        }
                    });
                $(this).removeClass('head_puzzle--unchecked').addClass('head_puzzle--checked')
                    .find('.puzzle_text').css('display', 'none');
                TweenMax.to('.head_puzzle--unchecked', 0.5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0,
                        display: 'none',
                        onComplete: function () {
                            TweenMax.to('.head-svg', 1,
                                {
                                    ease: Power1.easeInOut,
                                    left: ('7vw'),
                                    //top: 400 + 'px',
                                    height: ('10vw'),
                                    position: 'fixed'
                                });
                            TweenMax.to('.head_puzzle--checked', 1,
                                {
                                    ease: Power1.easeInOut,
                                    x: 0,
                                    y: -800,
                                    rotation: 360
                                });
                        }
                    });
            } else {
                headPuzzleCheck()
            }
        })
    }

    function headPuzzleCheck() {
        $('.head_puzzle--click').on('click', function () {
            $('.head-svg').css('width', '100%');
            //if (!$(this).hasClass('head_puzzle--pasted')) {
            if (true) {
                $(this).removeClass('head_puzzle--unchecked').addClass('head_puzzle--checked')
                    .find('.puzzle_text').css('display', 'none');
                new TimelineMax().to('.puzzle_text_good', .5,
                    {
                        display: 'none',
                        opacity: 0
                    });
                TweenMax.to('.head_puzzle--unchecked', .5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0,
                        display: 'none',
                        onComplete: function () {
                            var tttttop = ($(window).height() - ($('.screen-page:visible').height() - $('.head-svg').offset().top - ($('.head-svg').height()) / 2)) / $(window).height() * 100;
                            var llllleft = ($('.head-svg').offset().left + $('.head-svg').width() / 2) / $('.screen-page:visible').width() * 100;
                            //console.log(llllleft, tttttop);
                            new TimelineMax().set('.head-svg',
                                {
                                    position: 'fixed',
                                    top: tttttop + '%',
                                    left: llllleft + '%'
                                }).to('.head-svg', 1,
                                {
                                    ease: Power1.easeInOut,
                                    bezier: [{left: llllleft + '%', top: tttttop + '%'}, {
                                        left: 28 + '%',
                                        top: 75 + '%'
                                    }, {left: 7 + '%', top: 50 + '%'}]
                                });
                            TweenMax.to('.head_puzzle--checked', .9,
                                {
                                    x: 0,
                                    y: -800,
                                    rotation: 360
                                });
                        }
                    });
                var goto = $(this).data('goto-page');
                //$('.page_puzzle__active').removeClass('page_puzzle__active');
                pagePuzzlesSwitcher(goto);
                if ($('.screen-page:visible').length) {
                    TweenMax.to('.screen-page:visible', 1,
                        {
                            ease: Power1.easeInOut,
                            opacity: 0,
                            display: 'none',
                            onComplete: function () {
                                $(window).scrollTop(0);
                                new TimelineMax().set(goto,
                                    {display: 'block'}).fromTo(goto, 1,
                                    {ease: Power1.easeInOut, opacity: 0, y: $(window).height() + 'px'},
                                    {
                                        ease: Power1.easeInOut, opacity: 1, y: 0, onComplete: function () {
                                        scrollHead();
                                        scrolledToBottom = false;
                                    }
                                    }).from($('.animation_screen-page_1:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).from($('.animation_screen-page_2:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).from($('.animation_screen-page_3:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).from($('.animation_screen-page_4:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).staggerFrom($('.animation_screen-page_5:visible'), 0.9,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0,
                                        y: -30
                                    }, 0.3);
                                var tweenScreenPage1 = new TimelineMax().from($('.animation_screen-page_6:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).staggerFrom($('.animation_screen-page_7:visible'), 0.9,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }, 0.3);
                                var tweenScreenPage2 = new TimelineMax().from($('.animation_screen-page_8:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).from($('.animation_screen-page_9:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).from($('.animation_screen-page_10:visible'), 0.6,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0
                                    }).staggerFrom($('.animation_screen-page_11:visible'), 0.9,
                                    {
                                        ease: Power1.easeInOut,
                                        opacity: 0,
                                        y: -30
                                    }, 0.3).from($('.animation_screen-page_12:visible'), 0.6,
                                    {
                                        opacity: 0,
                                        onComplete: function () {
                                            $('.screen-page:visible').find('[class*="animation"]').removeClass('[class*="animation"]');
                                        }
                                    });
                                new ScrollMagic.Scene({
                                    triggerElement: $('.animation_screen-page_6:visible'),
                                    reverse: false
                                }).setTween(tweenScreenPage1).addTo(controller);
                                new ScrollMagic.Scene({
                                    triggerElement: $('.animation_screen-page_8:visible'),
                                    reverse: false
                                }).setTween(tweenScreenPage2).addTo(controller);
                            }
                        });
                } else if ($('.sermion-page:visible').length) {
                    $('.parallax-mirror').css('display', 'none');
                    TweenMax.to('.sermion-page:visible', 1,
                        {
                            ease: Power1.easeInOut,
                            opacity: 0,
                            display: 'none',
                            onComplete: function () {
                                $(window).scrollTop(0);
                                new TimelineMax().set(goto,
                                    {display: 'block'}).fromTo(goto, 1,
                                    {ease: Power1.easeInOut, opacity: 0, y: $(window).height() + 'px'},
                                    {
                                        ease: Power1.easeInOut, opacity: 1, y: 0, onComplete: function () {
                                        scrollHead();
                                        scrolledToBottom = false;
                                    }
                                    });
                            }
                        });
                }
            }
        })
    }

    function headPuzzleCheckFromSermione() {
        $('.head_puzzle--click').on('click', function () {
            $('.head_puzzle--gathered').addClass('head_puzzle--gathered');
            $('.head-svg').css('width', '100%');
            //if (!$(this).hasClass('head_puzzle--pasted')) {
            if (true) {
                console.log('3');
                $(this).removeClass('head_puzzle--unchecked').addClass('head_puzzle--checked')
                    .find('.puzzle_text').css('display', 'none');
                new TimelineMax().to('.puzzle_text_good', .5,
                    {
                        display: 'none',
                        opacity: 0
                    });
                TweenMax.to('.head_puzzle--unchecked', .5,
                    {
                        ease: Power1.easeInOut,
                        opacity: 0,
                        display: 'none',
                        onComplete: function () {
                            var tttttop = ($(window).height() - ($('.screen-page:visible').height() - $('.head-svg').offset().top - ($('.head-svg').height()) / 2)) / $(window).height() * 100;
                            var llllleft = ($('.head-svg').offset().left + $('.head-svg').width() / 2) / $('.screen-page:visible').width() * 100;
                            //console.log(llllleft, tttttop);
                            new TimelineMax().set('.head-svg',
                                {
                                    position: 'fixed',
                                    top: tttttop + '%',
                                    left: llllleft + '%'
                                }).to('.head-svg', .5,
                                {
                                    top: 50 + '%',
                                    left: 7 + '%'
                                });
                            TweenMax.to('.head_puzzle--checked', .9,
                                {
                                    x: 0,
                                    y: -800,
                                    rotation: 360
                                });
                        }
                    });
                var goto = $(this).data('goto-page');
                //$('.page_puzzle__active').removeClass('page_puzzle__active');
                pagePuzzlesSwitcher(goto);

                if ($('.screen-page:visible').length) {
                    console.log('1');
                    TweenMax.to('.screen-page:visible', 1,
                        {
                            ease: Power1.easeInOut,
                            opacity: 0,
                            display: 'none',
                            onComplete: function () {
                                $(window).scrollTop(0);
                                new TimelineMax().set(goto,
                                    {display: 'block'}).fromTo(goto, 1,
                                    {ease: Power1.easeInOut, opacity: 0, y: $(window).height() + 'px'},
                                    {
                                        ease: Power1.easeInOut, opacity: 1, y: 0, onComplete: function () {
                                        scrollHead();
                                        scrolledToBottom = false;
                                        PuzzleExplode();

                                    }
                                    });
                            }
                        });
                } else if ($('.sermion-page:visible').length) {
                    console.log('2');
                    $('.parallax-mirror').css('display', 'none');
                    TweenMax.to('.sermion-page:visible', 1,
                        {
                            ease: Power1.easeInOut,
                            opacity: 0,
                            display: 'none',
                            onComplete: function () {
                                $(window).scrollTop(0);
                                new TimelineMax().set(goto,
                                    {display: 'block'}).fromTo(goto, 1,
                                    {ease: Power1.easeInOut, opacity: 0, y: $(window).height() + 'px'},
                                    {
                                        ease: Power1.easeInOut, opacity: 1, y: 0, onComplete: function () {
                                        scrollHead();
                                        scrolledToBottom = false;
                                        PuzzleExplode();

                                    }
                                    });
                            }
                        });
                }
            }
        })
    }

    function headPuzzleGatherAll() {
        $('.head_puzzle--unchecked').addClass('head_puzzle--gathered');
        $('.head_puzzle--click').find('.puzzle_text').css('display', 'none');
        new TimelineMax().to('.puzzle_text_good', .5,
            {
                display: 'none',
                opacity: 0
            });
        TweenMax.set('.head_puzzle--gathered',
            {
                opacity: 1,
                onComplete: function () {
                    var tttttop = ($(window).height() - ($('.screen-page:visible').height() - $('.head-svg').offset().top - ($('.head-svg').height()) / 2)) / $(window).height() * 100;
                    var llllleft = ($('.head-svg').offset().left + $('.head-svg').width() / 2) / $('.screen-page:visible').width() * 100;
                    //console.log(llllleft, tttttop);
                    new TimelineMax().set('.head-svg',
                        {
                            position: 'fixed',
                            top: tttttop + '%',
                            left: llllleft + '%'
                        }).to('.head-svg', 1,
                        {
                            ease: Power1.easeInOut,
                            bezier: [{left: llllleft + '%', top: tttttop + '%'}, {
                                left: 28 + '%',
                                top: 75 + '%'
                            }, {left: 7 + '%', top: 20 + '%'}]
                        });
                    TweenMax.to('.head_puzzle--gathered', .9,
                        {
                            x: 0,
                            y: 0,
                            rotation: 360
                        });
                }
            });
        var goto = $(this).data('goto-page');
        console.log('headPuzzleCheckFromSermione 1');
        headPuzzleCheckFromSermione();
        //pagePuzzlesSwitcher(goto);
        //invisible code next:
        TweenMax.to('.screen-page:visible', 1,
            {
                ease: Power1.easeInOut,
                opacity: 0,
                display: 'none',
                onComplete: function () {
                    console.log('headPuzzleCheckFromSermione 2');
                    $(window).scrollTop(0);
                    console.log('headPuzzleCheckFromSermione 3');
                    new TimelineMax().set(goto,
                        {display: 'block'}).fromTo(goto, 1,
                        {ease: Power1.easeInOut, opacity: 0, y: $(window).height() + 'px'},
                        {
                            ease: Power1.easeInOut, opacity: 1, y: 0, onComplete: function () {
                            console.log('headPuzzleCheckFromSermione 4');
                            scrollHead();
                            scrolledToBottom = false;
                            $('.violet-1,.red-2,.yelloow-3,.blue-4').removeClass('shadow-puzzles');


                        }
                        });
                }
            });
    }

});


