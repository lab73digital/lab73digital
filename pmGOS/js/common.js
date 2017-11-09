var changeSectionQ = false;
var imgEditorQ = true;
var STs2T3Q;
var STs2T3G = false;
var photoNotReady = true;
var pShareSmall;
var mobile = false;
var loggedOn = false;
var mobileH;
var galleryCount;
var galleryItems;
var galleryOffset = 0;
var pchangeQ = false;
var winterPopup;
var webCamError = false;
var authFb = false;
var getCardsName;
var getCardsSname;
var fbId = '',
    vkId = '';
$(function () {
    _detectPhone(function () {
        galleryItems = 4;
        mobile = true;
        $('html').addClass('mobile');
        $('.s-2__section-overlay__text_4, ' +
            '.s-2__section-overlay__text_5, ' +
            '.s-3__section-overlay__text_1, ' +
            '.s-3__section-overlay__text_3, ' +
            '.s-3__section-overlay__text_4, ' +
            '.s-3__section-overlay__text_5, ' +
            '.s-3__section-overlay__text_6, ' +
            '.s-3__section-overlay__text_7, ' +
            '.s-3__section-overlay__text_8').removeClass('arrow-left').addClass('arrow-down');
        $('.s-3__section-overlay__text_9, ' +
            '.s-3__section-overlay__text_10, ' +
            '.s-3__section-overlay__text_11').removeClass('arrow-right').addClass('arrow-down');
        $('.s-3__section-overlay__text_2').removeClass('arrow-left').addClass('arrow-up');
        $('.s-3__right-two__next-button').text('Профиль').attr('data-letter', 'П');
        mobileH = window.innerHeight;
        document.querySelector('.main').style.height = window.innerHeight + 'px';
        $(window).on('resize', function () {
            if (window.innerHeight < mobileH - 60) {
                return
            }
            document.querySelector('.main').style.height = window.innerHeight + 'px';
        });
        $('.s-3__right-two__next-button').on('click', function () {
            TweenMax.to('.s-3__personal-area__left', .4, {
                display: 'flex',
                opacity: 1,
                delay: .4
            });
            TweenMax.to('.s-3__personal-area__right.active', .4, {
                display: 'none',
                opacity: 0
            })
        });
        if (_detectApple()) {
            $('.s1__video, .section-changer__video').remove();
        }
        Webcam.set({
            width: 380,
            height: 510,
            image_format: 'jpeg',
            jpeg_quality: 90,
            flip_horiz: true
        });
    }, function () {
        galleryItems = 8;
        $(window).on('resize', function () {
            videoResize($('.section-changer'), $('.section-changer__video'));
            videoResize($('.background-item.s1'), $('.background-item .s1__video'));
        });
        videoResize($('.section-changer'), $('.section-changer__video'));
        videoResize($('.background-item.s1'), $('.background-item .s1__video'));
        $('.s-3__right-two__next-button').on('click', function () {
            var target = $('#s4'),
                visibleScreen = $('.scroll-screen:visible');
            if (!loggedOn) {
                if (photoNotReady && target.hasClass('s-3')) {
                    return
                }
            }
            if (target.length) {
                sectionChanger(visibleScreen, target);
                return false;
            }
        });
        Webcam.set({
            width: 510,
            height: 380,
            image_format: 'jpeg',
            jpeg_quality: 90,
            flip_horiz: true
        });
    });
    if (_detectSafari()) {
        $('body').addClass('safari');
    }
    _detectiPad();
    _detectiPhone();
    var startSection = $('.s-1');
    startSection.removeClass('hidden');
    backgroundChanger(startSection);
    changeLiActive(startSection);
    backTracking(null, startSection);
    sectionMount(startSection);
    getProfile();
    $('.scroll-screen.hidden').css({
        'pointer-events': 'none'
    });
    $('.s-2__uploader').on('click', function () {
        imgEditor.inputClick;
    });
    TweenMax.set('.scroll-screen', {
        y: 0,
        z: .1
    });
    $('.s-2__quote-text').on('keyup', function () {
        $('.s-3__step-three__quote--change, .s-3__personal-area__quote--change').text($(this).val());
    });
    Webcam.on('error', function (err) {
        alert('Web-камера не обнаружена');
        $('.s-2__webcam-container').removeClass('get-photo');
        $('.s-2__camera-container').hide();
        webCamError = true;
    });
});
var s1Tutorial = new Tutorial('.s-1__player-on-throne__map, .s-1__kod-navigation__arrow', '.s-1__overlay', '.s-1__kod-navigation__arrow, .s-1__player-on-throne__player, .s-1__player-on-throne__map, .s-1__player-on-throne__throne, .s-1__player-on-throne__gradient');
var s2Tutorial1 = new Tutorial('.s-2__upload, .s-2__webcam', '.s-2__overlay-first', '.s-2__upload-webcam__container');
var s2Tutorial2 = new Tutorial('.s-2__rotate, .s-2__zoom__plus-minus, .s-2__flip', '.s-2__overlay-second', '.s-2__editor-items__container', function () {
    STs2T3G = true;
});
var s2Tutorial3 = new Tutorial('.s-2__quote-text__container, .s-2__button', '.s-2__overlay-third', '.s-2__quote-text__container, .s-2__button, .s-2__title2');
var s3Tutorial1 = new Tutorial('.s-3__step-one__login-btn', '.s-3__overlay-first', '.s-3__step-one__login-buttons');
var s3Tutorial2 = new Tutorial('.s-3__step-one__form-container, .s-3__step-one__next-button', '.s-3__overlay-second', '.s-3__step-one__form-container, .s-3__step-one__next-button', null, 1500);
var s3Tutorial3 = new Tutorial('.s-3__step-two__apps, .s-3__step-two__form-iphone, .s-3__step-two__rules-button', '.s-3__overlay-third', '.s-3__step-two__apps, .s-3__step-two__form-iphone, .s-3__step-two__rules-button');
var s3Tutorial4 = new Tutorial('.s-3__step-three__substitution, .s-3__step-three__rules-button, .s-3__step-three__next-btn', '.s-3__overlay-fourth', '.s-3__step-three__substitution, .s-3__step-three__rules-button, .s-3__step-three__next-btn');
var app = function () {
    var sliderQ = false,
        sliderQueueL = 0,
        sliderQueueR = 0;
    var _init = function () {
        $('.winter-coming__popup').on('click', function () {
            winterPopupHide();
        });
        $('.section__changer-anchor').on('click', function () {
            if (changeSectionQ) {
                return
            }
            if ($(this).hasClass('winter-coming__img')) {
                winterPopupHide();
            }
            var target = $($(this).data('href')),
                visibleScreen = $('.scroll-screen:visible');
            if (!loggedOn) {
                if (photoNotReady && target.hasClass('s-3')) {
                    return
                }
            }
            if (target.length) {
                sectionChanger(visibleScreen, target);
                return false;
            }
        });
        $('#s-3__AN, #s-3__AN-profile, #s-3__AN-right-two').mask('0000000');
        $('#s-3__BN, #s-3__BN-profile, #s-3__BN-right-two').mask('0#');
        $('#s-3__AN, #s-3__BN').on('keyup', function () {
            if ($('#s-3__AN').val().length >= 1 || $('#s-3__BN').val().length >= 1) {
                if ($('.s-3__step-two__next-button').is(':visible')) {
                    return
                }
                $('#s-3__AN, #s-3__BN').attr('required', true);
                TweenMax.fromTo('.s-3__step-two__rules-button', .4, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                }, {
                    y: '30%',
                    opacity: 0,
                    display: 'none'
                });
                TweenMax.fromTo('.s-3__step-two__next-button', .4, {
                    y: '-30%',
                    opacity: 0,
                    display: 'none'
                }, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                });
            } else {
                if ($('.s-3__step-two__rules-button').is(':visible')) {
                    return
                }
                $('#s-3__AN, #s-3__BN').attr('required', false);
                TweenMax.fromTo('.s-3__step-two__next-button', .4, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                }, {
                    y: '30%',
                    opacity: 0,
                    display: 'none'
                });
                TweenMax.fromTo('.s-3__step-two__rules-button', .4, {
                    y: '-30%',
                    opacity: 0,
                    display: 'none'
                }, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                });
            }
        });
        $('.login__popup_form__input').on('keyup', function () {
            if (authFb) {
                return
            }
            if ($('#login__popup__email').val().length >= 1 || $('#login__popup__password').val().length >= 1) {
                if ($('.login__popup__button').is(':visible')) {
                    return
                }
                TweenMax.fromTo('.login__popup__login-fb', .4, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                }, {
                    y: '30%',
                    opacity: 0,
                    display: 'none'
                });
                TweenMax.fromTo('.login__popup__button', .4, {
                    y: '-30%',
                    opacity: 0,
                    display: 'none'
                }, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                });
            } else {
                if ($('.login__popup__login-fb').is(':visible')) {
                    return
                }
                TweenMax.fromTo('.login__popup__button', .4, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                }, {
                    y: '30%',
                    opacity: 0,
                    display: 'none'
                });
                TweenMax.fromTo('.login__popup__login-fb', .4, {
                    y: '-30%',
                    opacity: 0,
                    display: 'none'
                }, {
                    y: '0%',
                    opacity: 1,
                    display: 'flex'
                });
            }
        });
        $('.login__menu__log-in--click').on('click', function () {
            TweenMax.fromTo('.login__popup-container', .6, {
                display: 'none',
                x: '100%',
                opacity: 0
            }, {
                display: 'flex',
                x: '0%',
                opacity: 1,
                ease: Power2.easeInOut
            })
        });
        $('.login__popup__login-fb--click').on('click', function () {
            _loggin('fb');
        });
        $('.login__popup__button').on('click', function () {
            if (_detectiPad() || _detectiPhone()) {
                if ($(".login__popup-form")[0].checkValidity()) {
                    if (authFb) {
                        authProfile($('#login__popup__email').val(), fbId);
                    } else {
                        authProfile($('#login__popup__email').val(), null, $('#login__popup__password').val())
                    }
                } else {
                    $(".login__popup-form")[0].checkValidity();
                }
            } else {
                if ($(".login__popup-form")[0].reportValidity()) {
                    if (authFb) {
                        authProfile($('#login__popup__email').val(), fbId);
                    } else {
                        authProfile($('#login__popup__email').val(), null, $('#login__popup__password').val())
                    }
                } else {
                    $(".login__popup-form")[0].reportValidity();
                }
            }
        });
        $('.login__popup__close').on('click', function () {
            TweenMax.to('.login__popup-container', .4, {
                display: 'none',
                x: '100%',
                opacity: 0
            })
        });
        document.addEventListener("keydown", function (event) {
            if (loggedOn) {
                return
            }
            if (event.which === 37) {
                sliderQueueR += 1;
                _sliderQueue('right');
            }
            if (event.which === 39) {
                sliderQueueL += 1;
                _sliderQueue('left');
            }
        });
        $('.s-1__kod-navigation__arrow-right--click').on('click', function () {
            sliderQueueL += 1;
            _sliderQueue();
        });
        $('.s-1__kod-navigation__arrow-left--click').on('click', function () {
            sliderQueueR += 1;
            _sliderQueue();
        });
        $('.s-1__player-on-throne__map').mouseenter(function () {
            $(this).parent().addClass('hover');
        }).mouseleave(function () {
            $(this).parent().removeClass('hover');
        });
        $('.s-1__player-on-throne__player--click').on('click', function () {
            if (changeSectionQ || loggedOn) {
                return
            }
            var visibleScreen = $('.scroll-screen:visible');
            sectionChanger(visibleScreen, $('.s-2'))
        });
        $('.login__menu-navigation--click').on('click', function () {
            var $headerMenu = $('.navigation__nav-menu');
            TweenMax.killChildTweensOf($('.navigation__nav-menu'));
            $('.login__menu-navigation').toggleClass('close');
            $headerMenu.toggleClass('hidden');
        });
        if (_detectPhone()) {
            $('.mobile .navigation__nav li .tm').on('click', function () {
                var $headerMenu = $('.navigation__nav-menu');
                TweenMax.killChildTweensOf($('.navigation__nav-menu'));
                $('.login__menu-navigation').toggleClass('close');
                $headerMenu.toggleClass('hidden');
            });
        }
        $('.s-3__step-one__login-email--click').on('click', function () {
            _registration('email');
        });
        $('.s-3__step-one__login-fb--click').on('click', function () {
            _registration('fb');
        });
        $('.s-3__step-one__next-button').on('click', function () {
            if (_detectiPad() || _detectiPhone()) {
                if ($(".s-3__steps-form")[0].checkValidity()) {
                    _registrationSteps('step-2');
                }
            } else {
                $('#s-3__email')[0].setCustomValidity('');
                if ($(".s-3__steps-form")[0].reportValidity()) {
                    _registrationSteps('step-2');
                } else {
                    $(".s-3__steps-form")[0].reportValidity();
                }
            }
        });
        $('.s-3__personal-area__btn').on('click', function () {
            TweenMax.to('.s-3__personal-area__left', .4, {
                display: 'none',
                opacity: 0
            });
            TweenMax.to('.s-3__personal-area__right.active', .4, {
                display: 'flex',
                opacity: 1,
                delay: .4
            })
        });
        $('.s-3__step-two__rules-button').on('click', function () {
            _registrationSteps('step-3');
        });
        $('.s-3__step-two__next-button').on('click', function () {
            if (_detectiPad() || _detectiPhone()) {
                if ($(".s-3__steps-form")[0].checkValidity()) {
                    _registrationSteps('step-3');
                }
            } else {
                if ($(".s-3__steps-form")[0].reportValidity()) {
                    _registrationSteps('step-3');
                } else {
                    $(".s-3__steps-form")[0].reportValidity();
                }
            }
        });
        $('.s-3__personal-area__next-button').on('click', function () {
            if (_detectiPad() || _detectiPhone()) {
                if ($(".s-3__personal-area__form")[0].checkValidity()) {
                    _registrationSteps('step-4');
                }
            } else {
                if ($(".s-3__personal-area__form")[0].reportValidity()) {
                    _registrationSteps('step-4');
                } else {
                    $(".s-3__personal-area__form")[0].reportValidity();
                }
            }
        });
        $('.s-3__right-two__rules-button').on('click', function () {
            _registrationSteps('step-5');
        });
        $('.s-3__step-three__next-btn').on('click', function () {
            sendProfile();
        });
        $('.s-6__info-list__item--click').on('click', function () {
            $('.s-6__info-list__item--click').removeClass('active');
            $(this).addClass('active');
            $('.s-6__mobile-iphone__bg-changer').attr('data-bg', $('.s-6__info-list__item--click').index($(this)) + 1);
        });
    };
    var _sliderQueue = function () {
        if (sliderQueueL >= 2) {
            sliderQueueL = 2;
        }
        if (sliderQueueR >= 2) {
            sliderQueueR = 2;
        }
        if (sliderQueueL) {
            _slider('left', function () {
                sliderQueueL -= 1;
                _sliderQueue('left');
            });
        }
        if (sliderQueueR) {
            _slider('right', null, function () {
                sliderQueueR -= 1;
                _sliderQueue('right');
            });
        }
    };
    var _slider = function (direction, callbackL, callbackR) {
        if (sliderQ) {
            return;
        }
        sliderQ = true;
        var standingActive = $('.s-1__slider-container__player.position-center');
        var standingInActive = $('.s-1__slider-container__player.position-none');
        var sittingActive = $('.s-1__player-on-throne__player.active');
        var left1 = $('.position-left_1');
        var left2 = $('.position-left_2');
        var right1 = $('.position-right_1');
        var right2 = $('.position-right_2');
        var nextSitting;
        if (direction === 'left') {
            if (standingActive.next().length && sittingActive.next('.s-1__player-on-throne__player').length) {
                nextSitting = sittingActive.next('.s-1__player-on-throne__player');
            } else {
                nextSitting = $('.s-1__player-on-throne__player').eq(0);
            }
            TweenMax.fromTo(sittingActive, .6, {
                left: '50%',
                height: '100%',
                top: '50%',
                opacity: 1
            }, {
                left: '27%',
                height: '90%',
                top: '45%',
                opacity: 0,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('active');
                    TweenMax.set(this.target, {
                        height: '',
                        top: ''
                    });
                }
            });
            standingActive.removeClass('position-center').addClass('position-left_1');
            TweenMax.fromTo(standingActive, .6, {
                opacity: 0,
                height: '100%',
                top: '55%',
                left: '50%'
            }, {
                left: '27%',
                height: '95%',
                top: '50%',
                opacity: .8,
                ease: Power3.easeInOut,
                onComplete: function () {
                    TweenMax.set(this.target, {
                        height: '',
                        top: ''
                    });
                }
            });
            TweenMax.fromTo(left1, .6, {
                left: '27%',
                height: '95%',
                opacity: .8
            }, {
                left: '10%',
                height: '75%',
                opacity: .15,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-left_1').addClass('position-left_2');
                    TweenMax.set(this.target, {
                        left: '',
                        height: ''
                    });
                }
            });
            TweenMax.fromTo(left2, .6, {
                left: '10%',
                opacity: .15
            }, {
                left: '0%',
                opacity: 0,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-left_2').addClass('position-none');
                }
            });
            standingInActive.removeClass('position-none').addClass('position-right_2');
            TweenMax.fromTo(standingInActive, .6, {
                left: '100%',
                opacity: 0
            }, {
                left: '90%',
                opacity: .15,
                ease: Power3.easeInOut
            });
            TweenMax.fromTo(right1, .6, {
                left: '73%',
                height: '95%',
                top: '50%',
                opacity: .8
            }, {
                left: '50%',
                height: '100%',
                top: '55%',
                opacity: 0,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-right_1').addClass('position-center');
                    TweenMax.set(this.target, {
                        left: '',
                        height: ''
                    });
                }
            });
            nextSitting.addClass('active');
            TweenMax.set(nextSitting, {
                left: ''
            });
            TweenMax.fromTo(nextSitting, .6, {
                opacity: 0,
                height: '95%',
                top: '45%',
                left: '73%'
            }, {
                left: '50%',
                height: '100%',
                top: '50%',
                opacity: 1,
                ease: Power3.easeInOut,
                onComplete: function () {
                    TweenMax.set(this.target, {
                        height: '',
                        top: ''
                    });
                }
            });
            TweenMax.fromTo(right2, .6, {
                left: '90%',
                height: '75%',
                opacity: .15
            }, {
                left: '73%',
                height: '95%',
                opacity: .8,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-right_2').addClass('position-right_1');
                    TweenMax.set(this.target, {
                        left: '',
                        height: ''
                    });
                    sliderQ = false;
                    callbackL();
                }
            });
        }
        if (direction === 'right') {
            if (standingActive.prev().length && sittingActive.prev('.s-1__player-on-throne__player').length) {
                nextSitting = sittingActive.prev('.s-1__player-on-throne__player');
            } else {
                nextSitting = $('.s-1__player-on-throne__player').eq(5);
            }
            TweenMax.fromTo(sittingActive, .6, {
                left: '50%',
                height: '100%',
                top: '50%',
                opacity: 1
            }, {
                left: '73%',
                height: '90%',
                top: '45%',
                opacity: 0,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('active');
                    TweenMax.set(this.target, {
                        height: '',
                        top: ''
                    });
                }
            });
            standingActive.removeClass('position-center').addClass('position-right_1');
            TweenMax.fromTo(standingActive, .6, {
                opacity: 0,
                height: '100%',
                top: '55%',
                left: '50%'
            }, {
                left: '73%',
                height: '95%',
                top: '50%',
                opacity: .8,
                ease: Power3.easeInOut,
                onComplete: function () {
                    TweenMax.set(this.target, {
                        height: '',
                        top: ''
                    });
                }
            });
            TweenMax.fromTo(right1, .6, {
                left: '73%',
                height: '95%',
                opacity: .8
            }, {
                left: '90%',
                height: '75%',
                opacity: .15,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-right_1').addClass('position-right_2');
                    TweenMax.set(this.target, {
                        left: '',
                        height: ''
                    });
                }
            });
            TweenMax.fromTo(right2, .6, {
                left: '90%',
                opacity: .15
            }, {
                left: '100%',
                opacity: 0,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-right_2').addClass('position-none');
                }
            });
            standingInActive.removeClass('position-none').addClass('position-left_2');
            TweenMax.fromTo(standingInActive, .6, {
                left: '0%',
                opacity: 0
            }, {
                left: '10%',
                opacity: .15,
                ease: Power3.easeInOut
            });
            TweenMax.fromTo(left1, .6, {
                left: '27%',
                height: '95%',
                top: '50%',
                opacity: .8
            }, {
                left: '50%',
                height: '100%',
                top: '55%',
                opacity: 0,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-left_1').addClass('position-center');
                    TweenMax.set(this.target, {
                        left: '',
                        height: ''
                    });
                }
            });
            nextSitting.addClass('active');
            TweenMax.set(nextSitting, {
                left: ''
            });
            TweenMax.fromTo(nextSitting, .6, {
                opacity: 0,
                height: '95%',
                top: '45%',
                left: '27%'
            }, {
                left: '50%',
                height: '100%',
                top: '50%',
                opacity: 1,
                ease: Power3.easeInOut,
                onComplete: function () {
                    TweenMax.set(this.target, {
                        height: '',
                        top: ''
                    });
                }
            });
            TweenMax.fromTo(left2, .6, {
                left: '10%',
                height: '75%',
                opacity: .15
            }, {
                left: '27%',
                height: '95%',
                opacity: .8,
                ease: Power3.easeInOut,
                onComplete: function () {
                    $(this.target).removeClass('position-left_2').addClass('position-left_1');
                    TweenMax.set(this.target, {
                        left: '',
                        height: ''
                    });
                    sliderQ = false;
                    callbackR();
                }
            });
        }
        $('.s-1__kod-title__item, .s-3__kod-title__item').removeClass('active');
        $('.s-1__kod-title__item.' + nextSitting.data('player')).addClass('active');
        $('.s-3__kod-title__item.' + nextSitting.data('player')).addClass('active');
    };
    var _registration = function (type) {
        if (type === 'email') {
            _registrationAnim();
        }
        if (type === 'fb') {
            FB.login(function (response) {
                if (response.authResponse) {
                    _registrationAnim();
                    FB.api("/" + response.authResponse.userID + '/?fields=first_name,last_name,email,id', function (response) {
                            if (response && !response.error) {
                                fbId = response.id;
                                $('#s-3__first-name').val(response.first_name);
                                $('#s-3__last-name').val(response.last_name);
                                if (response.email) {
                                    $('#s-3__email').val(response.email);
                                }
                            }
                        }
                    );
                } else {
                }
            });
        }
    };
    var _loggin = function (type) {
        if (type === 'email') {

        }
        if (type === 'fb') {
            FB.login(function (response) {
                if (response.authResponse) {
                    _registrationAnim();
                    FB.api("/" + response.authResponse.userID + '/?fields=first_name,last_name,email,id', function (response) {
                            if (response && !response.error) {
                                fbId = response.id;
                                if (response.email) {
                                    $('#s-3__email').val(response.email);
                                    authProfile(response.email, response.id);
                                } else {
                                    TweenMax.to('.login__popup_form__input-container--password', .3, {
                                        opacity: 0,
                                        visibility: 'hidden',
                                        pointerEvents: 'none'
                                    });
                                    TweenMax.to('.login__popup_form__input-container--email', .3, {
                                        marginTop: '2.60417vw'
                                    });

                                    TweenMax.fromTo('.login__popup__login-fb', .4, {
                                        y: '0%',
                                        opacity: 1,
                                        display: 'flex'
                                    }, {
                                        y: '30%',
                                        opacity: 0,
                                        display: 'none'
                                    });
                                    TweenMax.fromTo('.login__popup__button', .4, {
                                        y: '-30%',
                                        opacity: 0,
                                        display: 'none'
                                    }, {
                                        y: '0%',
                                        opacity: 1,
                                        display: 'flex'
                                    });
                                    $('#login__popup__password').attr('required', false);
                                    authFb = true;
                                }
                            }
                        }
                    );
                } else {
                }
            });
        }
    };
    var _registrationAnim = function () {
        var bottom;
        if (_detectPhone()) {
            if (_detectApple()) {
                if (_detectiPad()) {
                    bottom = '13.86408vw';
                }
                if (_detectiPhone()) {
                    bottom = '16.86408vw';
                }
            } else {
                bottom = '18.86408vw';
            }
        } else {
            bottom = '16.4271vh';
        }
        $('.s-3__step-one__title').addClass('active');
        $('.s-3__step-one__title-small').text('Введите свои данные ниже:');
        TweenMax.to('.s-3__step-one__login-buttons', .4, {
            opacity: 0,
            display: 'none',
            ease: Power1.easeInOut,
            onComplete: function () {
                TweenMax.to('.s-3__step-one__form-container', .4, {
                    opacity: 1,
                    display: 'block',
                    ease: Power1.easeInOut
                });
                TweenMax.to('.s-3__step-one__rules-button', .4, {
                    bottom: bottom,
                    ease: Power1.easeInOut,
                    onComplete: function () {
                        TweenMax.to('.s-3__step-one__next-button', .4, {
                            opacity: 1,
                            display: 'flex',
                            ease: Power1.easeInOut
                        });
                    }
                });
            }
        });
        s3Tutorial2.init();
    };
    var _registrationSteps = function (type) {
        var width = ($('.s-3__step').width() / ((1920 * 0.01)));
        if (type === 'step-2') {
            $('.s-3__step-one').removeClass('show');
            $('.s-3__step-two').addClass('show');
            $('.s-3__step-bg').removeClass('one').addClass('two');
            TweenMax.to('.s-3__step-bg', .8, {
                left: width + 'vw',
                ease: Back.easeInOut.config(1.7)
            });
            s3Tutorial3.init();
        }
        if (type === 'step-3') {
            $('.s-3__step-two').removeClass('show');
            $('.s-3__step-three').addClass('show');
            $('.s-3__step-bg').removeClass('two').addClass('three');
            TweenMax.to('.s-3__step-bg', .8, {
                left: width * 2 + 'vw',
                ease: Back.easeInOut.config(1.7),
                onComplete: function () {
                    s3Tutorial4.init();
                }
            });
        }
        if (type === 'step-4') {
            editBetAccNumbers($('#s-3__AN-profile').val(), $('#s-3__BN-profile').val());
            TweenMax.to($('.s-3__personal-area__right-one'), .4, {
                display: 'none',
                opacity: 0,
                onComplete: function () {
                    $('.s-3__personal-area__right-one').removeClass('active');
                }
            });
            TweenMax.to($('.s-3__personal-area__right-two'), .4, {
                display: 'flex',
                opacity: 1,
                delay: .4,
                onComplete: function () {
                    $('.s-3__personal-area__right-two').addClass('active');
                }
            });
        }
        if (type === 'step-5') {
            TweenMax.to($('.s-3__personal-area__right-two'), .4, {
                display: 'none',
                opacity: 0,
                onComplete: function () {
                    $('.s-3__personal-area__right-two').removeClass('active');
                }
            });
            TweenMax.to($('.s-3__personal-area__right-one'), .4, {
                display: 'flex',
                opacity: 1,
                delay: .4,
                onComplete: function () {
                    $('.s-3__personal-area__right-one').addClass('active');
                }
            });
        }
    };
    return {
        init: _init
    }
}();
function ImgEditor() {
    var self = {};
    this.init = function (items) {
        self.canvas = $(items.canvas).get(0);
        self.ctx = self.canvas.getContext('2d');
        self.$canvas = $(self.canvas);
        self.$overlay = $(items.overlay);
        self.$body = $('body');
        self.inputPhoto = $(items.inputPhoto).get(0);
        self.image = document.createElement('img');
        self.imageLoader = $(items.inputPhoto).get(0);
        self.player = items.player;

        self.canvasOffset = self.$canvas.offset();
        self.offsetX = self.canvasOffset.left;
        self.offsetY = self.canvasOffset.top;
        self.canvasWidth = 380;
        self.canvasHeight = 380;

        self.lcPopup = localStorage.getItem('pmMobilePopup');

        self.playerPhoto = items.playerPhoto;

        self.draggingImage = false;


        self.angleInDegrees = 0;
        self.scaleSize = 0;


        self.imageLoader.addEventListener('change', handleImage, false);

        self.refreshSizes = function (width, height) {
            self.imageWidth = width;
            self.imageHeight = height;
            self.imageWidthMin = width / 4;
            self.imageWidthMax = width * 4;
            self.imageHeightMin = height / 4;
            self.imageHeightMax = height * 4;
            self.firstImageX = self.canvasWidth / 2;
            self.firstImageY = self.canvasHeight / 2;
            self.imageX = self.firstImageX;
            self.imageY = self.firstImageY;
        };

        self.image.onload = function () {
            self.refreshSizes(self.image.width, self.image.height);
            resetOptions();
            refreshBorders();
            refreshImg();
            if (!self.lcPopup) {
                $('.s-2__accept-popup-container').removeClass('hidden');
                return
            }
        };

        refreshImg();
        var webcamCall = false;
        var uploadCall = false;
        $(items.webcamElement).on('click', function () {
            if (webCamError) {
                return
            }
            if (self.lcPopup) {
                if ($('.s-2__webcam-container').hasClass('get-photo')) {
                    take_snapshot();
                } else {
                    self.image.src = '';
                    $('.s-2__uploader').hide();
                    $('.s-2__camera-container').show();
                    self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
                    $('.s-2__webcam-container').addClass('get-photo');
                    setup();
                }
            } else {
                $('.s-2__accept-popup-container').removeClass('hidden');
                webcamCall = true;
            }
        });

        $(items.uploadElement).on('click', function () {
            Webcam.reset();
            $('.s-2__webcam-container').removeClass('get-photo');
            $('.s-2__camera-container').hide();
            if (self.lcPopup) {
                $('.s-2__file-photo').get(0).value = '';
                $('.s-2__camera-container').hide();
                $('.s-2__webcam-container').removeClass('get-photo');
                self.inputPhoto.click();
            } else {
                $('.s-2__accept-popup-container').removeClass('hidden');
                uploadCall = true;
            }
        });
        $('.s-2__accept-popup__buttons-button--accept').on('click', function () {
            localStorage.setItem('pmMobilePopup', true);
            self.lcPopup = true;
            $('.s-2__accept-popup-container').addClass('hidden');
            if (webcamCall) {
                if (webCamError) {
                    return
                }
                if ($('.s-2__webcam-container').hasClass('get-photo')) {
                    take_snapshot();
                    refreshImg();
                } else {
                    self.image.src = '';
                    $('.s-2__uploader').hide();
                    $('.s-2__camera-container').show();
                    self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
                    $('.s-2__webcam-container').addClass('get-photo');
                    setup();
                }
            }
            if (uploadCall) {
                $('.s-2__file-photo').get(0).value = '';
                $('.s-2__uploader').show();
                $('.s-2__camera-container').hide();
                $('.s-2__webcam-container').removeClass('get-photo');
                self.inputPhoto.click();
                refreshImg();
            }
        });
        $('.s-2__accept-popup__buttons-button--decline').on('click', function () {
            var target = $('.s-1'),
                visibleScreen = $('.scroll-screen:visible');
            sectionChanger(visibleScreen, target);
        });
        $(items.rotateLeft).on('click', function () {
            STs2Tutorial3();
            rotateLeft();
        });
        $(items.rotateRight).on('click', function () {
            STs2Tutorial3();
            rotateRight()
        });

        $(items.rotateLeft).on('mousedown touchstart', function () {
            self.rotateLeftInterval = setInterval(rotateLeft, 50);
        });
        $(items.rotateRight).on('mousedown touchstart', function () {
            self.rotateRightInterval = setInterval(rotateRight, 50);
        });
        $(items.scalePlus).on('click', function () {
            STs2Tutorial3();
            scalePlus()
        });
        $(items.scaleMinus).on('click', function () {
            STs2Tutorial3();
            scaleMinus()
        });

        $(items.scalePlus).on('mousedown touchstart', function () {
            self.scalePlusInterval = setInterval(scalePlus, 50);
        });
        $(items.scaleMinus).on('mousedown touchstart', function () {
            self.scaleMinusInterval = setInterval(scaleMinus, 50);
        });
        $(items.flip).on('click', function () {
            STs2Tutorial3();
            flip()
        });

        $(items.getImg).on('click', function () {
            if (loggedOn) {
                pchangeQ = true;
            }
            getImg()
        });

        self.$overlay.on('mousedown touchstart', function (e) {
            handleMouseDown(e);
        });
        self.$body.on('mousemove touchmove', function (e) {
            handleMouseMove(e);
        });
        self.$body.on('mouseup touchend', function (e) {
            handleMouseUp(e);
            clearInterval(self.scaleMinusInterval);
            clearInterval(self.scalePlusInterval);
            clearInterval(self.rotateLeftInterval);
            clearInterval(self.rotateRightInterval);
        });
        self.$overlay.on('mouseout', function (e) {
            handleMouseOut(e);
        });
    };
    this.refresh = function (params) {
        $('.s-2__button, .s-2__editor-items__container, .s-2__quote-text__container, .s-2__title2').addClass('inactive');
        photoNotReady = true;
        $('.s-2__file-photo').get(0).value = '';
        self.image.src = '';
        self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
        self.playerPhoto = params.playerPhoto;
        self.player = params.player;
        $('.s-2__uploader').show();
        $('.s-2__camera-container').hide();
        $('.s-2__webcam-container').removeClass('get-photo');
    };
    this.inputClick = function () {
        self.inputPhoto.click();
    };
    var setup = function () {
        Webcam.reset();
        Webcam.attach($('.s-2__camera-container').get(0));
    };
    var take_snapshot = function () {
        Webcam.snap(function (data_uri) {
            self.image.src = data_uri;
            self.refreshSizes(510, 380);
            refreshBorders();
            refreshImg();
            Webcam.reset();
            $('.s-2__webcam-container').removeClass('get-photo');
            $('.s-2__camera-container').hide();
        });
    };
    var resetOptions = function () {
        self.angleInDegrees = 0;
        self.scaleSize = 0;
        self.flipX = 1;
        self.flipY = 1;
        refreshScale();
        refreshBorders();
        refreshImgPosition();
        refreshImg();
    };
    var getImg = function () {
        refreshImg(true);
        $('.s-3__step-three__substitution-img, .s-3__personal-area__substitution-img').attr('src', self.canvas.toDataURL());
        $('.share-img-mid').removeClass('share-img--get');
        $('.share-img').removeClass('active');
        $('.share-img[data-player="' + self.player + '"]').addClass('active');
        $('.share-img-mid[data-player="' + self.player + '"]').addClass('share-img--get');
        self.playerPhoto = 'share-img--get';
        refreshImg(true);
        $('.share-img-mid-generation').attr('src', self.canvas.toDataURL());
        refreshImg(false);
    };
    var flip = function () {
        if (self.flipX === -1) {
            self.flipX = 1;
            self.flip = false;
        } else {
            self.flipX = -1;
            self.flip = true;
        }
        self.flipY = 1;
        refreshImg();
    };
    var scaleMinus = function () {
        if (self.imageWidth <= self.imageWidthMin) {
            return;
        }
        if (self.imageHeight <= self.imageHeightMin) {
            return;
        }
        self.scaleMinus = -.02;
        self.scaleSize = self.scaleSize + self.scaleMinus;
        STs2Tutorial3();
        refreshScale();
        refreshBorders();
        refreshImgPosition();
        refreshImg();
    };
    var scalePlus = function () {
        if (self.imageWidth >= self.imageWidthMax) {
            return;
        }
        if (self.imageHeight >= self.imageHeightMax) {
            return;
        }
        self.scalePlus = .02;
        self.scaleSize = self.scaleSize + self.scalePlus;
        STs2Tutorial3();
        refreshScale();
        refreshBorders();
        refreshImgPosition();
        refreshImg();
    };
    var rotateRight = function () {
        STs2Tutorial3();
        if (self.flip) {
            self.angleInDegrees -= 1;
        } else {
            self.angleInDegrees += 1;
        }
        refreshImgPosition(1);
        refreshImg();
    };
    var rotateLeft = function () {
        STs2Tutorial3();
        if (self.flip) {
            self.angleInDegrees += 1;
        } else {
            self.angleInDegrees -= 1;
        }
        refreshImgPosition(1);
        refreshImg();
    };
    var refreshScale = function () {
        self.imageWidth = self.image.width + (self.image.width * self.scaleSize);
        self.imageHeight = self.image.height + (self.image.height * self.scaleSize);
    };
    var refreshBorders = function () {
        self.minLeft = -(self.imageWidth * .5);
        self.minTop = -(self.imageHeight * .5);
        self.maxLeft = self.canvasWidth + (self.imageWidth * .5);
        self.maxTop = self.canvasHeight + (self.imageHeight * .5);
    };
    var refreshImgPosition = function () {
        if (self.imageX >= self.maxLeft) {
            self.imageX = self.maxLeft;
        }
        if (self.imageY >= self.maxTop) {
            self.imageY = self.maxTop;
        }
        if (self.imageX <= self.minLeft) {
            self.imageX = self.minLeft;
        }
        if (self.imageY <= self.minTop) {
            self.imageY = self.minTop;
        }
    };
    var refreshImg = function (getImg) {
        self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
        self.ctx.save();
        self.ctx.translate(self.imageX, self.imageY);
        self.ctx.scale(self.flipX, self.flipY);
        self.ctx.rotate(self.angleInDegrees * Math.PI / 180);
        if (self.image.src !== '' && photoNotReady && self.lcPopup) {
            s2Tutorial2.init();
            $('.s-2__button, .s-2__editor-items__container, .s-2__quote-text__container, .s-2__title2').removeClass('inactive');
            photoNotReady = false;
        }
        var color = '',
            blandMode;
        if (self.player === 'cybersport') {
            blandMode = 'multiply';
            color = 'rgba(75, 202, 110, 0.8)';
        } else {
            blandMode = 'hue';
            color = 'rgba(31, 59, 68, 0.2)';
        }
        if (getImg) {
            var img = document.getElementsByClassName(self.playerPhoto)[0];
            self.ctx.drawImage(self.image, -self.imageWidth / 2, -self.imageHeight / 2, self.imageWidth, self.imageHeight);
            self.ctx.globalCompositeOperation = blandMode;
            self.ctx.fillStyle = color;
            self.ctx.fillRect(-self.imageWidth / 2, -self.imageHeight / 2, self.imageWidth, self.imageHeight);
            self.ctx.restore();
            self.ctx.drawImage(img, 0, 0, 380, 380);
        } else {
            self.ctx.drawImage(self.image, -self.imageWidth / 2, -self.imageHeight / 2, self.imageWidth, self.imageHeight);
            self.ctx.globalCompositeOperation = blandMode;
            self.ctx.fillStyle = color;
            self.ctx.fillRect(-self.imageWidth / 2, -self.imageHeight / 2, self.imageWidth, self.imageHeight);
        }
        self.ctx.restore();
    };
    var handleImage = function (e) {
        self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
        self.image.src = '';
        var reader = new FileReader();
        reader.onload = function (event) {
            self.image.src = event.target.result;
            $('.s-2__uploader').hide();
        };
        if (e.target.files.length) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    var hitCanvas = function (x, y) {
        return (x > self.offsetX && x < self.offsetX + self.canvasWidth && y > self.offsetY && y < self.offsetY + self.canvasHeight);
    };

    var handleMouseDown = function (e) {
        var clientX;
        var clientY;
        if (e.handleObj.type === 'touchstart') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        self.startX = parseInt(clientX - self.offsetX);
        self.startY = parseInt(clientY - self.offsetY);
        self.draggingImage = hitCanvas(parseInt(clientX), parseInt(clientY));
    };

    var handleMouseUp = function (e) {
        self.draggingImage = false;
    };

    var handleMouseOut = function (e) {
        /*handleMouseUp(e);*/
    };

    var handleMouseMove = function (e) {
        var clientX;
        var clientY;
        if (e.handleObj.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        if (self.draggingImage) {
            self.mouseX = parseInt(clientX - self.offsetX);
            self.mouseY = parseInt(clientY - self.offsetY);

            self.dx = self.mouseX - self.startX;
            self.dy = self.mouseY - self.startY;
            self.imageX += self.dx;
            self.imageY += self.dy;
            if (self.imageX >= self.maxLeft) {
                self.imageX = self.maxLeft;
            }
            if (self.imageY >= self.maxTop) {
                self.imageY = self.maxTop;
            }
            if (self.imageX <= self.minLeft) {
                self.imageX = self.minLeft;
            }
            if (self.imageY <= self.minTop) {
                self.imageY = self.minTop;
            }
            self.startX = self.mouseX;
            self.startY = self.mouseY;
            refreshImg();

        }
    };
}
var imgEditor = new ImgEditor();

function sectionChanger(visibleScreen, element) {
    if (!element.length || changeSectionQ || (visibleScreen[0] == element[0])) {
        return
    }
    changeSectionQ = true;
    if (_detectApple()) {
        backTracking(visibleScreen, element);
        changeLiActive(element);
        visibleScreen.css({
            'pointer-events': 'none'
        });
        TweenMax.to('.section-changer', .4, {
            display: 'block',
            opacity: 1,
            onComplete: function () {
                backgroundChanger(element);
                visibleScreen.hide().addClass('hidden');
                TweenMax.set(visibleScreen, {
                    opacity: 1
                });
                element.removeClass('hidden').show().css({
                    'pointer-events': 'none'
                });
                element.css({
                    'pointer-events': ''
                });
                sectionMount(element);
                TweenMax.to(this.target, .4, {
                    delay: .8,
                    opacity: 0,
                    display: 'none',
                    onComplete: function () {
                        changeSectionQ = false;
                    }
                })
            }
        });
    } else {
        var video = $('.section-changer__video').get(0);
        video.currentTime = 0;
        video.play();
        backTracking(visibleScreen, element);
        $(video).on('play', function () {
            changeLiActive(element);
            visibleScreen.css({
                'pointer-events': 'none'
            });
            TweenMax.to('.section-changer', .4, {
                display: 'block',
                opacity: 1,
                onComplete: function () {
                    backgroundChanger(element);
                    visibleScreen.hide().addClass('hidden');
                    TweenMax.set(visibleScreen, {
                        opacity: 1
                    });
                    element.removeClass('hidden').show().css({
                        'pointer-events': 'none'
                    });
                    element.css({
                        'pointer-events': ''
                    });
                    sectionMount(element);
                    TweenMax.to(this.target, .4, {
                        delay: .8,
                        opacity: 0,
                        display: 'none',
                        onComplete: function () {
                            video.pause();
                            if (video.paused) {
                                changeSectionQ = false;
                            }
                        }
                    })
                }
            });
        });
    }
}
function sectionMount(element) {
    var baNum = Boolean(Number(localStorage.baNum));
    if ($(element).hasClass('s-1')) {
        s1Tutorial.hideOverlay();
        s1Tutorial.init();
    }
    if ($(element).hasClass('s-2')) {
        var player;
        if ($('.s-1__player-on-throne__player').hasClass('active')) {
            player = $('.s-1__player-on-throne__player.active').data('player');
        } else {
            player = $('.s-1__player-on-throne__player-hidden.active').data('player');
        }
        $('.background-item.s2').attr('class', 'background-item s2').addClass(player);
        $('.s-2__stub-img, .s-2__canvas-overlay__img, .s-3__step-three__substitution-throne, .s-2__kod-title__item, .s-2__quote-text_title, .s-3__quote-text_title').removeClass('active');
        $('.s-2__stub__' + player).addClass('active');
        $('.s-2__canvas-overlay__' + player).addClass('active');
        $('.s-3__step-three__substitution-throne.' + player).addClass('active');
        $('.s-2__kod-title__item.' + player).addClass('active');
        $('.s-2__quote-text_title.' + player).addClass('active');
        $('.s-3__quote-text_title.' + player).addClass('active');
        if (imgEditorQ) {
            imgEditor.init({
                canvas: '.s-2__canvas',
                overlay: '.s-2__canvas-overlay--position',
                inputPhoto: '.s-2__file-photo',
                uploadElement: '.s-2__upload',
                webcamElement: '.s-2__webcam',
                rotateLeft: '.s-2__rotate-left',
                rotateRight: '.s-2__rotate-right',
                scalePlus: '.s-2__zoom-plus',
                scaleMinus: '.s-2__zoom-minus',
                flip: '.s-2__flip',
                player: player,
                playerPhoto: 's-2__ava-' + player,
                getImg: '.s-2__button'
            });
            imgEditorQ = false;
        } else {
            imgEditor.refresh({
                player: player,
                playerPhoto: 's-2__ava-' + player
            });
        }
        s2Tutorial1.hideOverlay();
        s2Tutorial2.hideOverlay();
        s2Tutorial3.hideOverlay();
        s2Tutorial1.init();
    } else {
        $(function () {
            Webcam.reset();
        });
    }
    if ($(element).hasClass('s-3')) {
        $('.static-block__mobile-iphone, .static-block__bonus').addClass('hidden');
        s3Tutorial1.hideOverlay();
        s3Tutorial2.hideOverlay();
        s3Tutorial3.hideOverlay();
        s3Tutorial4.hideOverlay();
        s3Tutorial1.init();
        if (loggedOn && pchangeQ) {
            pchange();
            pchangeQ = false;
        }
    } else {
        $('.static-block__mobile-iphone, .static-block__bonus').removeClass('hidden');
    }
    if ($(element).hasClass('s-4')) {
        $('.static-block__mobile-iphone').removeClass('active');
        getCards();
    } else {
        $('.static-block__mobile-iphone').addClass('active');
    }
    if ($(element).hasClass('s-4') || $(element).hasClass('s-5') || $(element).hasClass('s-6')) {
        if (baNum) {
            winterPopupShow();
        }
    } else {
        if (baNum) {
            clearTimeout(winterPopup);
        }
    }
    if (_detectPhone()) {
        if ($(element).hasClass('s-2')) {
            $('.static-block__mobile-iphone').addClass('hidden');
        }
        if ($(element).hasClass('s-4')) {
            $('.static-block__mobile-iphone').addClass('hidden');
        }
        if ($(element).hasClass('s-5')) {
            $('.static-block__mobile-iphone').addClass('hidden');
        }
        if ($(element).hasClass('s-6')) {
            $('.static-block__mobile-iphone').addClass('hidden');
        }
    }
}
function backgroundChanger(el) {
    var elId = el.attr('id');
    TweenMax.set('.background-item', {
        opacity: 0
    });
    TweenMax.set('.background-item.' + elId, {
        opacity: 1
    });
}
function backTracking(visibleScreen, element) {
    var id,
        sectionName,
        firstLetter;
    if (visibleScreen === null) {
        element.find('.s__back').hide();
    } else {
        id = '#' + visibleScreen.get(0).id;
        sectionName = visibleScreen.data('section-name');
        firstLetter = sectionName.charAt(0);
        visibleScreen.find('.s__back').hide();
        element.find('.s__back').show().attr({
            'data-href': id,
            'data-letter': firstLetter
        }).data({
            'href': id,
            'letter': firstLetter
        }).html(sectionName);
    }
}
function changeLiActive(el) {
    if (el.hasClass('s-2') || el.hasClass('s-3')) {
        el = $('.s-1');
    }
    var nav = $('.navigation__nav'),
        liActive = nav.find('[data-href="#' + el.get(0).id + '"]').parent('li'),
        lineTopPos,
        lineH = $('.navigation-line').height();
    nav.find('[data-href]').parent('li').removeClass('active');
    liActive.addClass('active');
    lineTopPos = liActive.offset().top / lineH * 100 + 1;
    TweenMax.to('.navigation-line--move', .3, {
        top: lineTopPos + '%',
        ease: Power2.easeInOut
    })
}
function Tutorial(elements, tutorialItems, zIndexEls, callback, timeout) {
    var self = {};
    self.elements = elements;
    self.tutorialItems = tutorialItems;
    self.zIndexEls = zIndexEls;
    this.init = function () {
        var localObj = getTutorial();
        if (localObj) {
            if (localObj[self.tutorialItems]) {
                localObj = localObj[self.tutorialItems][0];
            }
        } else {
            localObj = ''
        }
        if (localObj === 'shown') {
            TweenMax.set($(self.tutorialItems), {
                display: 'none',
                opacity: 0
            });
            TweenMax.set($(self.tutorialItems + ' .section-overlay__text'), {
                x: '-50%',
                y: '-50%',
                z: .1
            });
            TweenMax.set($(self.zIndexEls), {
                zIndex: ''
            });
            if (callback) {
                callback();
            }
        } else {
            TweenMax.set($(self.zIndexEls), {
                zIndex: 2,
                z: .1
            });
            TweenMax.fromTo($(self.tutorialItems), .4, {
                opacity: 0,
                display: 'none'
            }, {
                opacity: 1,
                display: 'block'
            });
            TweenMax.fromTo($(self.tutorialItems + ' .section-overlay__text'), .4, {
                y: '-100%'
            }, {
                y: '-50%'
            });
            if (!timeout) {
                timeout = 0;
            }
            setTimeout(function () {
                $(self.elements).one('mouseenter', function () {
                    TweenMax.to($(self.tutorialItems), .4, {
                        opacity: 0,
                        display: 'none',
                        onComplete: function () {
                            if (callback) {
                                callback();
                            }
                            TweenMax.set($(self.zIndexEls), {
                                zIndex: ''
                            });
                        }
                    });
                    TweenMax.to($(self.tutorialItems + ' .section-overlay__text'), .4, {
                        y: '-100%'
                    });
                    setTutorial(getTutorial(), self.tutorialItems);
                });
            }, timeout);
        }
    };
    this.hideOverlay = function () {
        TweenMax.set($(self.tutorialItems), {
            opacity: 0,
            display: 'none'
        });
        TweenMax.set($(self.tutorialItems + ' .section-overlay__text'), {
            x: '-50%',
            y: '-50%',
            z: .1
        });
        TweenMax.set($(self.zIndexEls), {
            zIndex: ''
        });
    };
    this.animHideOverlay = function () {
        TweenMax.to($(self.tutorialItems), .4, {
            opacity: 0,
            display: 'none'
        });
        TweenMax.to($(self.tutorialItems + ' .section-overlay__text'), .4, {
            x: '-50%',
            y: '-50%',
            z: .1
        });
        TweenMax.set($(self.zIndexEls), {
            zIndex: ''
        });
    };
    var setTutorial = function (localItem, item) {
        var tutObj = {};
        if (localItem) {
            tutObj = localItem
        } else {
            tutObj = {};
        }
        tutObj[item] = ['shown'];
        localStorage.setItem('tutorial_mobile', JSON.stringify(tutObj));
    };
    var getTutorial = function () {
        if (localStorage.getItem('tutorial_mobile')) {
            return JSON.parse(localStorage.getItem('tutorial_mobile'))
        } else {
            return false
        }
    };
}
function STs2Tutorial3() {
    if (STs2T3G) {
        clearTimeout(STs2T3Q);
        STs2T3Q = setTimeout(function () {
            s2Tutorial3.init();
        }, 2000);
    }
}
function videoResize(wrapper, videoP) {
    var $wrapper = wrapper;
    var $video = videoP;
    var video = $video[0];

    var videoHeight = video.videoHeight;
    var videoWidth = video.videoWidth;

    var wrapperHeight = $wrapper.height() * 1.05;
    var wrapperWidth = $wrapper.width() * 1.05;

    if (wrapperWidth / videoWidth > wrapperHeight / videoHeight) {
        $video.css({

            width: wrapperWidth + 2,
            height: 'auto'
        });
    } else {
        $video.css({
            width: 'auto',
            height: wrapperHeight + 2
        });
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
        document.querySelector('html').classList.add('ios-mobile');
        return true
    } else {
        return false
    }
}
function _detectiPad() {
    if (/iPad/i.test(navigator.userAgent)) {
        document.querySelector('body').classList.add('ipad');
        return true
    } else {
        return false
    }
}
function _detectiPhone() {
    if (/iPhone/i.test(navigator.userAgent)) {
        document.querySelector('body').classList.add('iphone');
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
function shareImgGeneration() {
    var canvas = $('.share-canvas-generation').get(0);
    var canvasWidth = canvas.innerWidth;
    var canvasHeight = canvas.innerHeight;
    var ctx = canvas.getContext('2d');
    var share = $('.share-img.active').get(0);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.save();
    ctx.drawImage(share, 0, 0, share.width, share.height);
    ctx.restore();
    var img = document.getElementsByClassName('share-img-mid-generation')[0];
    ctx.drawImage(img, 150, 96, 180, 180);
    ctx.restore();
    $('.share-img-generation').attr('src', canvas.toDataURL());
    return canvas.toDataURL();
}
function webCamErrorF() {
    Webcam.on('error', function (err) {
        alert('Web-камера не обнаружена');
        webCamError = true;
    });
}
function winterPopupShow() {
    winterPopup = setTimeout(function () {
        TweenMax.to('.winter-coming__container', .4, {
            opacity: 1,
            display: 'block'
        });
    }, 3000);
}
function winterPopupHide() {
    TweenMax.to('.winter-coming__container', .4, {
        opacity: 0,
        display: 'none'
    });
}
function getProfile(callback) {
    if (!localStorage.pmId) {
        return
    }
    var data = {
        'id': localStorage.pmId
    };
    data = JSON.stringify(data);

    TweenMax.to('.loggin-popup__loader', 1, {
        rotation: 360,
        repeat: -1,
        ease: Power0.easeNone
    });
    TweenMax.to('.loggin-popup__container', .6, {
        opacity: 1,
        display: 'block',
        ease: Power1.easeInOut,
        onComplete: function () {
            $.ajax({
                url: 'http://mobile.timetowork.xyz/getcard.php',
                type: 'POST',
                data: {q: data},
                dataType: 'json',
                cache: false,
                success: function (response) {
                    if (response.success === true) {
                        if(callback){
                            callback();
                        }
                        var sportType = response.user.kog.toLowerCase();
                        var photoHref = response.user.photo;
                        var pshareHref = response.user.pshare;
                        loggedOn = true;
                        s1Tutorial.animHideOverlay();
                        s2Tutorial1.animHideOverlay();
                        s2Tutorial2.animHideOverlay();
                        s2Tutorial3.animHideOverlay();
                        s3Tutorial1.animHideOverlay();
                        s3Tutorial2.animHideOverlay();
                        s3Tutorial3.animHideOverlay();
                        s3Tutorial4.animHideOverlay();
                        localStorage.setItem('pmMobilePopup', 'true');
                        localStorage.setItem('tutorial_mobile', '{' +
                            '".s-1__overlay":["shown"],' +
                            '".s-2__overlay-first":["shown"],' +
                            '".s-2__overlay-second":["shown"],' +
                            '".s-2__overlay-third":["shown"],' +
                            '".s-3__overlay-first":["shown"],' +
                            '".s-3__overlay-second":["shown"],' +
                            '".s-3__overlay-third":["shown"],' +
                            '".s-3__overlay-fourth":["shown"]' +
                            '}');
                        if (response.user.betnum && response.user.accnum) {
                            $('.s-3__personal-area__right-one').removeClass('active');
                            $('.s-3__personal-area__right-two').addClass('active');
                            $('#s-3__AN-right-two').val(response.user.accnum);
                            $('#s-3__BN-right-two').val(response.user.betnum);
                            localStorage.setItem('baNum', 0);
                        } else {
                            localStorage.setItem('baNum', 1);
                        }
                        TweenMax.to('.login__menu__log-in', .3, {
                            display: 'none',
                            opacity: 0,
                            onComplete: function () {
                                TweenMax.to('.login__menu__logged-on', .3, {
                                    display: 'flex',
                                    opacity: 1
                                });
                            }
                        });
                        $('body').addClass('logged-on');
                        $('.login__menu__name').html(response.user.name + '<br><span>' + response.user.sname + '</span>');
                        $('.navigation__nav div[data-href="#s1"] .tm').text('Главная');
                        $('.s-1__kod-navigation__arrow').hide();
                        $('.s-1__button').data('href', '#s4').text('Галерея воинов');
                        $('.s-1__player-on-throne__player').removeClass('active');
                        $('.s-1__player-on-throne__player-hidden.' + sportType).addClass('active');
                        $('.s-1__player-on-throne').addClass('hover').css({
                            'pointer-events': 'none'
                        });
                        if (!$('.s-1__slider-container__player.' + sportType).hasClass('position-center')) {
                            var playerClass = $('.s-1__slider-container__player.' + sportType).get(0).className.split(' ');
                            $('.s-1__slider-container__player.position-center').removeClass('position-center').addClass(playerClass[2]);
                            $('.s-1__slider-container__player.' + sportType).removeClass(playerClass[2]).addClass('position-center');
                        }
                        $('.s-1__player-on-throne__player-small').show().attr('src', photoHref);
                        $('.s-2__button').attr('data-letter', 'Р').text('Редактировать');
                        $('.s-2__quote-text').val(response.user.text);
                        $('.s-3').data('section-name', 'Личный<br>кабинет');
                        $('.s-3__personal-area__name').text(response.user.name + ' ' + response.user.sname);
                        $('.s-3__personal-area__mail').text(response.user.mail);
                        $('.s-3__quote-text_title, .s-1__kod-title__item, .s-3__kod-title__item').removeClass('active');
                        $('.s-1__kod-title__item.' + sportType).addClass('active');
                        $('.s-3__quote-text_title.' + sportType).addClass('active');
                        $('.s-3__kod-title__item.' + sportType).addClass('active');
                        $('.s-3__personal-area__quote--change').text(response.user.text);
                        $('.login__menu__logged-on-icon img, .s-3__personal-area__substitution-img').attr('src', photoHref);
                        $('.s-3__personal-area__substitution-throne').removeClass('active');
                        $('.s-3__personal-area__substitution-throne.' + sportType).addClass('active');
                        $('.s-3__personal-area__option-download').attr('onclick', 'window.open("' + pshareHref + '", "_blank");');
                        shareFB(pshareHref, response.user.text, response.user.iPhone, sportType);
                        $('.s-3__personal-area__option-share').on('click', function () {
                        });
                        TweenMax.to('.loggin-popup__container', .6, {
                            opacity: 0,
                            display: 'none',
                            ease: Power1.easeInOut,
                            onComplete: function () {
                                TweenMax.set('.loggin-popup__loader', {
                                    rotation: 0
                                })
                            }
                        });
                    }
                }
            });
        }
    });

}
function getCards(page) {
    if (!page && getCardsName + ' ' + getCardsSname === $('.s-4__gallery-title-name').eq(0).text()) {
        return
    }
    var data = {
        'count': galleryItems,
        'offset': galleryOffset
    };
    TweenMax.to('.s-4__gallery__loader', .4, {
        opacity: 1,
        display: 'block',
        ease: Power1.easeInOut
    });
    TweenMax.to('.s-4__gallery__loader', 1, {
        rotation: 360,
        repeat: -1,
        ease: Power0.easeNone
    });
    data = JSON.stringify(data);
    TweenMax.to('.s-4__gallery-item', .4, {
        opacity: 0,
        display: 'none',
        ease: Power1.easeInOut,
        onComplete: function () {
            $.ajax({
                url: 'http://mobile.timetowork.xyz/getcards.php',
                type: 'POST',
                data: {q: data},
                dataType: 'json',
                cache: false,
                success: function (response) {
                    if (response.success === true) {
                        var gallery = '';
                        var iPhone;
                        var title;
                        var bigTitle;
                        var throneImg;
                        var imgPhoto;
                        galleryCount = Number(response.count);
                        getCardsName = response.cards[0].name;
                        getCardsSname = response.cards[0].sname;
                        var galleryPages = Math.ceil(galleryCount / galleryItems);
                        response.cards.forEach(function (e, i) {
                            imgPhoto = response.cards[i].photo;
                            if (Number(response.cards[i].iphone)) {
                                iPhone = 'iphone';
                            } else {
                                iPhone = '';
                            }
                            if (response.cards[i].kog === 'CYBERSPORT') {
                                title = 'Моя клавиатура, мышка и чит-коды заставят тебя молить о пощаде.';
                                bigTitle = 'Киберспорт';
                                throneImg = 'img/cybersport/body-block-cybersport.png';
                                if (!response.cards[i].photo.length) {
                                    imgPhoto = 'img/cybersport/face-block-mid-cybersport.png';
                                }
                            }
                            if (response.cards[i].kog === 'BOXING') {
                                title = 'Мой кулак быстр как молния, силен как молот и беспощаден как бог войны.';
                                throneImg = 'img/boxing/body-block-boxing.png';
                                bigTitle = 'Бокс';
                                if (!response.cards[i].photo.length) {
                                    imgPhoto = 'img/boxing/face-block-mid-boxing.png';
                                }
                            }
                            if (response.cards[i].kog === 'FOOTBALL') {
                                title = 'Я – самый зрелищный боец. Могу финтить, бить, отбирать и обмануть даже самого проницательного судью.';
                                throneImg = 'img/football/body-block-football.png';
                                bigTitle = 'Футбол';
                                if (!response.cards[i].photo.length) {
                                    imgPhoto = 'img/football/face-block-mid-football.png';
                                }
                            }
                            if (response.cards[i].kog === 'BASKETBALL') {
                                title = 'Я предугадаю любое твое действие, заблокирую любой удар и перепрыгну любое препятствие.';
                                throneImg = 'img/basketball/body-block-basketball.png';
                                bigTitle = 'Баскетбол';
                                if (!response.cards[i].photo.length) {
                                    imgPhoto = 'img/basketball/face-block-mid-basketball.png';
                                }
                            }
                            if (response.cards[i].kog === 'TENNIS') {
                                title = 'Мощь моей ракетки способна пробить любые укрепления, а мой воинственный клич оглушит всех в радиусе километра.';
                                throneImg = 'img/tennis/body-block-tennis.png';
                                bigTitle = 'Теннис';
                                if (!response.cards[i].photo.length) {
                                    imgPhoto = 'img/tennis/face-block-mid-tennis.png';
                                }
                            }
                            if (response.cards[i].kog === 'HOCKEY') {
                                title = 'Моя улыбка повергнет тебя в ужас, а если ты меня толкнешь, я закатаю тебя в землю.';
                                throneImg = 'img/hockey/body-block-hockey.png';
                                bigTitle = 'Хоккей';
                                if (!response.cards[i].photo.length) {
                                    imgPhoto = 'img/hockey/face-block-mid-hockey.png';
                                }
                            }
                            gallery += '<div class="s-4__gallery-item ' + iPhone + '">' +
                                '<div class="s-4__gallery-img-container">' +
                                '<img class="s-4__gallery-img" src="' + throneImg + '" alt="">' +
                                '<img class="s-4__gallery-img-small" src="' + imgPhoto + '" alt="">' +
                                '</div>' +
                                '<div class="s-4__gallery-img__hover-container">' +
                                '<div class="s-4__gallery-img__hover-padding">' +
                                '<img class="s-4__gallery-img-hover" src="' + throneImg + '" alt="">' +
                                '<img class="s-4__gallery-img-hover-small" src="' + imgPhoto + '" alt="">' +
                                '</div>' +
                                '</div>' +
                                '<div class="s-4__gallery-title-name"><span>' + response.cards[i].name + '</span> ' + response.cards[i].sname + '</div>' +
                                '<div class="s-4__gallery-title-kod">' + bigTitle + '</div>' +
                                '<div class="s-4__gallery-text">' +
                                '<div class="s-4__gallery-text-title">' + title + '</div>' +
                                '<div class="s-4__gallery-text-quote">' + response.cards[i].text +
                                '</div>' +
                                '</div>' +
                                '<div class="s-4__gallery-iphone">' +
                                '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 31 30.84">' +
                                '<defs>' +
                                '<radialGradient id="radial-gradient" cx="-2423.19" cy="285.35" r="50" gradientTransform="translate(766.79 -25.66) scale(0.31 0.12)" gradientUnits="userSpaceOnUse">' +
                                '<stop offset="0" stop-color="#ffd900"></stop>' +
                                '<stop offset="0.05" stop-color="#ffd900" stop-opacity="0.82"></stop>' +
                                '<stop offset="0.1" stop-color="#ffd900" stop-opacity="0.65"></stop>' +
                                '<stop offset="0.16" stop-color="#ffd900" stop-opacity="0.5"></stop>' +
                                '<stop offset="0.22" stop-color="#ffd900" stop-opacity="0.36"></stop>' +
                                '<stop offset="0.29" stop-color="#ffd900" stop-opacity="0.25"></stop>' +
                                '<stop offset="0.36" stop-color="#ffd900" stop-opacity="0.16"></stop>' +
                                '<stop offset="0.45" stop-color="#ffd900" stop-opacity="0.09"></stop>' +
                                '<stop offset="0.55" stop-color="#ffd900" stop-opacity="0.04"></stop>' +
                                '<stop offset="0.69" stop-color="#ffd900" stop-opacity="0.01"></stop>' +
                                '<stop offset="1" stop-color="#ffd900" stop-opacity="0"></stop>' +
                                '</radialGradient>' +
                                '</defs>' +
                                '<g id="svg-iphone" data-name="iphone">' +
                                '<g id="apple-ic">' +
                                '<path id="cc-m" class="cls-1" d="M27.57,22.25a1.85,1.85,0,0,0-.2.7,18.37,18.37,0,0,1-3.2,5.4l-.9.9a4,4,0,0,1-2.2.9,5.66,5.66,0,0,1-1.8-.3,5,5,0,0,0-1.3-.5,5.8,5.8,0,0,0-4.1.1l-1.5.6a3.72,3.72,0,0,1-1.8.2,2.67,2.67,0,0,1-1.4-.7,9.27,9.27,0,0,1-1.4-1.4,19.65,19.65,0,0,1-4-8.2,13.52,13.52,0,0,1-.3-4A10.43,10.43,0,0,1,5,11.25a7.55,7.55,0,0,1,4.6-3.4,5.26,5.26,0,0,1,3.5.3c.6.2,1.2.5,1.8.7a2.48,2.48,0,0,0,1.7,0c.6-.2,1.2-.5,1.9-.7a11.7,11.7,0,0,1,2-.5,6.25,6.25,0,0,1,3,.4,6.78,6.78,0,0,1,3.3,2.4h0a6.86,6.86,0,0,0-3.1,6.2,6.62,6.62,0,0,0,3.9,5.6ZM15.67,7.35a5.66,5.66,0,0,0,1.8-.3,6.75,6.75,0,0,0,4-6V.55c-.3,0-.5.1-.8.1A7,7,0,0,0,16.27,4a5.42,5.42,0,0,0-.8,3.3c.1,0,.1.1.2.1Z"></path>' +
                                '<ellipse id="anim-shit" class="cls-2" cx="15.5" cy="9" rx="15.5" ry="6.07"></ellipse>' +
                                '</g>' +
                                '</g>' +
                                '</svg>' +
                                '</div>' +
                                '</div>';
                        });
                        $('.s-4__gallery').html(gallery);
                        TweenMax.to('.s-4__gallery__loader', .4, {
                            opacity: 0,
                            display: 'none',
                            ease: Power1.easeInOut,
                            onComplete: function () {
                                TweenMax.set(this.target, {
                                    rotation: 0
                                })
                            }
                        });
                        TweenMax.to('.s-4__gallery-item', .4, {
                            opacity: 1,
                            display: 'block',
                            ease: Power1.easeInOut
                        });
                        if (!$('.s-4__pagination__number').length) {
                            for (var i = 1; i <= galleryPages; i++) {
                                var paginationNumbers;
                                if (i === 1) {
                                    paginationNumbers = '<div class="s-4__pagination__number active">' + i + '</div>';
                                } else {
                                    paginationNumbers = '<div class="s-4__pagination__number">' + i + '</div>';
                                }
                                $('.s-4__pagination__numbers').append(paginationNumbers);
                            }
                            $('.s-4__pagination__number').on('click', function () {
                                var pagNum = Number($(this).text());
                                $('.s-4__pagination__number').removeClass('active');
                                $(this).addClass('active');
                                galleryOffset = pagNum * galleryItems - galleryItems;
                                getCards(true);
                            });
                            $('.s-4__pagination__arrow-left').on('click', function () {
                                if (galleryOffset - galleryItems < 0) {
                                    return
                                } else {
                                    galleryOffset -= galleryItems;
                                    $('.s-4__pagination__number.active').removeClass('active').prev('.s-4__pagination__number').addClass('active');
                                }

                                getCards(true);
                            });
                            $('.s-4__pagination__arrow-right').on('click', function () {
                                if (galleryOffset + galleryItems >= galleryCount) {
                                    return
                                } else {
                                    galleryOffset += galleryItems;
                                    $('.s-4__pagination__number.active').removeClass('active').next('.s-4__pagination__number').addClass('active');
                                }
                                getCards(true);
                            });
                        }
                    }
                }
            });
        }
    });
}
function sendProfile() {
    var name = $('#s-3__first-name').val(),
        sname = $('#s-3__last-name').val(),
        mail = $('#s-3__email').val(),
        accnum = $('#s-3__AN').val(),
        betnum = $('#s-3__BN').val(),
        text = $('#s-2__quote-text').val(),
        photo = $('.s-3__step-three__substitution-img').get(0).src,
        iPhone = 0,
        kog = $('.s-1__player-on-throne__player.active').data('player').toUpperCase(),
        pshare = shareImgGeneration();
    if (accnum.length && betnum.length) {
        iPhone = 1;
    }
    var data = {
        'name': name,
        'sname': sname,
        'mail': mail,
        'accnum': accnum,
        'betnum': betnum,
        'text': text,
        'photo': photo,
        'fbid': fbId,
        'vkid': vkId,
        'iPhone': iPhone,
        'kog': kog,
        'pshare': pshare
    };
    data = JSON.stringify(data);
    TweenMax.to('.loggin-popup__loader', 1, {
        rotation: 360,
        repeat: -1,
        ease: Power0.easeNone
    });
    TweenMax.to('.loggin-popup__container', .6, {
        opacity: 1,
        display: 'block',
        ease: Power1.easeInOut,
        onComplete: function () {
            $.ajax({
                url: 'http://mobile.timetowork.xyz/reg.php',
                type: 'POST',
                data: {q: data},
                dataType: 'json',
                cache: false,
                success: function (response) {
                    if (response.success === true) {
                        localStorage.setItem('pmId', response.id);
                        localStorage.setItem('pmMail', mail);
                        TweenMax.to($('.reg__popup'), .4, {
                            display: 'flex',
                            opacity: 1,
                            onComplete: function () {
                                TweenMax.to($('.reg__popup'), .4, {
                                    display: 'none',
                                    opacity: 0,
                                    delay: 4
                                });

                                var target = $('#s4'),
                                    visibleScreen = $('.scroll-screen:visible');
                                if (target.length) {
                                    sectionChanger(visibleScreen, target);
                                }
                                getProfile();
                            }
                        });
                    }
                    if (response.success === false && response.error === 'Already registered.') {
                        $('#s-3__email').val('');
                        if (_detectiPad() || _detectiPhone()) {
                            $('#s-3__email')[0].checkValidity();
                        } else {
                            $('#s-3__email')[0].setCustomValidity("This E-mail is already registered");
                            $('#s-3__email')[0].reportValidity();
                        }
                        var width = $('.s-3__step').width();
                        $('.s-3__step-three').removeClass('show');
                        $('.s-3__step-one').addClass('show');
                        $('.s-3__step-bg').removeClass('three').addClass('one');
                        TweenMax.to('.s-3__step-bg', .8, {
                            left: 0,
                            ease: Back.easeInOut.config(1.7)
                        });
                        TweenMax.to('.loggin-popup__container', .6, {
                            opacity: 0,
                            display: 'none',
                            ease: Power1.easeInOut,
                            onComplete: function () {
                                TweenMax.set('.loggin-popup__loader', {
                                    rotation: 0
                                })
                            }
                        });
                    }
                }
            });
        }
    });
}
function authProfile(email, socId, password) {
    var data;
    if (email && password) {
        data = {
            'mail': email,
            'pass': password
        };
    }
    if (email && socId) {
        data = {
            'mail': email,
            'fbid': socId
        };
    }
    data = JSON.stringify(data);
    $.ajax({
        url: 'http://mobile.timetowork.xyz/auth.php',
        type: 'POST',
        data: {q: data},
        dataType: 'json',
        cache: false,
        success: function (response) {
            if (response.success === true) {
                localStorage.setItem('pmId', response.id);
                localStorage.setItem('pmMail', email);
                TweenMax.to('.login__popup-container', .4, {
                    display: 'none',
                    x: '100%',
                    opacity: 0
                });
                getProfile();
            }
        }
    });

}
function editBetAccNumbers(accnum, betnum) {
    if (!accnum && !betnum) {
        return
    }
    var id = localStorage.pmId,
        mail = localStorage.pmMail;
    var data = {
        'mail': mail,
        'id': id,
        'accnum': accnum,
        'betnum': betnum
    };
    $('#s-3__AN-right-two').val(accnum);
    $('#s-3__BN-right-two').val(betnum);
    data = JSON.stringify(data);
    $.ajax({
        url: 'http://mobile.timetowork.xyz/edit.php',
        type: 'POST',
        data: {q: data},
        dataType: 'json',
        cache: false,
        success: function (response) {
            if (response.success === true) {
                localStorage.setItem('baNum', 0);
                getProfile(function () {
                    getCards(true);
                });
            }
        }
    });
}
function pchange() {
    var id = localStorage.pmId,
        mail = localStorage.pmMail,
        photo = $('.s-3__personal-area__substitution-img').get(0).src,
        pshare = shareImgGeneration();
    var data = {
        'mail': mail,
        'id': id,
        'photo': photo,
        'pshare': pshare,
    };
    data = JSON.stringify(data);
    $.ajax({
        url: 'http://mobile.timetowork.xyz/pchange.php',
        type: 'POST',
        data: {q: data},
        dataType: 'json',
        cache: false,
        success: function (response) {
            if (response.success === true) {
                ptext();
            }
        }
    });
}
function ptext() {
    var id = localStorage.pmId,
        mail = localStorage.pmMail,
        text = $('#s-2__quote-text').val();
    var data = {
        'mail': mail,
        'id': id,
        'text': text
    };
    data = JSON.stringify(data);
    $.ajax({
        url: 'http://mobile.timetowork.xyz/pchange.php',
        type: 'POST',
        data: {q: data},
        dataType: 'json',
        cache: false,
        success: function (response) {
            if (response.success === true) {
                getProfile(function () {
                    getCards(true);
                });
                pchangeQ = false;
            }
        }
    });
}
function shareFB(shareImg, shareText, iphone, sportType) {
    var shareButton = document.querySelector('.s-3__personal-area__option-share');
    var iphoneText = '';
    var titleText = '';
    if (Number(iphone) === 1) {
        iphoneText = 'iPhone 8 Plus будет моим! ';
    }
    if (sportType === 'cybersport') {
        titleText = 'Game of Sports: Я сражаюсь на стороне Киберспорта в Game of Sports.';
    }
    if (sportType === 'boxing') {
        titleText = 'Game of Sports: Я сражаюсь на стороне Бокса в Game of Sports.';
    }
    if (sportType === 'football') {
        titleText = 'Game of Sports: Я сражаюсь на стороне Футбола в Game of Sports.';
    }
    if (sportType === 'basketball') {
        titleText = 'Game of Sports: Я сражаюсь на стороне Баскетбола в Game of Sports.';
    }
    if (sportType === 'tennis') {
        titleText = 'Game of Sports: Я сражаюсь на стороне Тенниса в Game of Sports.';
    }
    if (sportType === 'hockey') {
        titleText = 'Game of Sports: Я сражаюсь на стороне Хоккея в Game of Sports.';
    }
    var playerText = $('.s-3__quote-text_title.active').eq(0).text();
    var fbUrl = location.href + '?img=' + location.origin + location.pathname + shareImg + '&title=' + titleText + '&description=' + iphoneText + playerText + shareText;
    shareButton.onclick = function () {
        window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(fbUrl), '_blank');
    }
}