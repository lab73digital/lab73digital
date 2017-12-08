const assign = require('object-assign');
$(function () {
    $.getJSON("js/fairgametop.json", data => {
        let gameObj = data[0]
        headerRate(gameObj.away, gameObj.awayLogo, gameObj.home, gameObj.homeLogo, gameObj.kickoff, gameObj.league, gameObj.odd1, gameObj.odd2, gameObj.oddx);
    });
    $.getJSON("js/fairgame.json", data => {
        data.forEach((e, i) => {
            if (i > 3) {
                return false
            }
            let gameObj = e;
            matchesRate(gameObj.away, gameObj.awayLogo, gameObj.home, gameObj.homeLogo, gameObj.kickoff, gameObj.league, gameObj.odd1, gameObj.odd2, gameObj.oddx);
        });
    });
    const getJSON = function(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.onload = function() {
            let status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };
    // getJSON('https://www.leon.ru/rest/match_of_the_day/list/1x2/fairgame', data => {
    //     console.log(data)
    // });
    // $.ajax({
    //     url: 'http://localhost:8000/api/createUser',
    //     type: 'POST',
    //     data:  {
    //         "name": "Yoyoyo Yoyoyo",
    //         "fields": {
    //             "name": {
    //                 "first": "Yoyoyo",
    //                 "last": "Yoyoyo"
    //             },
    //             "email": "some@gmail.com",
    //             "phone": "+7 123 123 123 12 ",
    //             "status": false
    //         }
    //     },
    //     dataType: 'json',
    //     cache: false,
    //     success: response => {
    //         console.log(response);
    //         if (response.success === true) {
    //
    //         }
    //     }
    // });
    $('#registration__sign-up__form').submit(e=>{
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:8000/api/createUser',
            type: 'POST',
            data: $(e.currentTarget).serialize(),
            dataType: 'json',
            cache: false,
            success: response => {
                console.log(response);
                if (response.success === true) {

                }
            }
        });

        if (TweenMax.isTweening('.registration__sign-up')) {
            return
        }
        TweenMax.to('.registration__sign-up', .5, {
            autoAlpha: 0,
            display: 'none',
            onComplete: () => {
                TweenMax.to('.registration__success', .5, {
                    autoAlpha: 1,
                    display: 'flex'
                });
            }
        });
    });
    if ($(window).width() <= 768) {
        TweenMax.set('.registration__popup-container', {
            height: $(window).height()
        });
    }
    if ($(window).width() >= 768) {

    }
    if ($(window).width() >= 1360) {

    }
    if ($(window).width() >= 1600) {
        TweenMax.set($('.s-2__stages-svg'), {
            z: .1
        });
        TweenMax.set($('.s-2__stages-title, .s-2__stages-text'), {
            autoAlpha: 0,
            x: -100,
            z: .1
        });
        TweenMax.set($('.s-2__stages-svg path'), {
            drawSVG: '0%'
        });
        const moveAmbassadors = (right = 1, left = 1, percWinSTandSecST) => {
            let rightPos = right * percWinSTandSecST;
            let leftPos = left * percWinSTandSecST;
            TweenMax.to('.trainer-one', .3, {
                right: rightPos
            });
            TweenMax.to('.trainer-two', .3, {
                left: leftPos
            });
        };
        const ambassadors = () => {
            let winST = $(window).scrollTop();
            let secST = $('.main__s2').offset().top;
            let lastST = $('.s-3__title').offset().top - 85;
            let percWinSTandSecST = winST / secST;
            if (winST >= $(document).height() - $(window).height() - 100) {
                return
            }
            TweenMax.set('.main', {
                pointerEvents: 'none'
            });
            if (percWinSTandSecST >= 1) {
                percWinSTandSecST = 1;
            }
            if (percWinSTandSecST >= .45) {
                $('.trainer-one, .trainer-two').addClass('active-text');
            } else {
                $('.trainer-one, .trainer-two').removeClass('active-text');
            }
            moveAmbassadors(190, 250, percWinSTandSecST);
            TweenMax.to('.main__trainers', .3, {
                top: winST,
                onComplete: () => {
                    TweenMax.set('.main', {
                        pointerEvents: 'all'
                    });
                }
            });
        };
        const piantLines = () => {
            let winST = $(window).scrollTop();
            let secST = $('.main__s2').offset().top;
            if (winST >= secST - 500) {
                TweenMax.staggerTo($('.s-2__stages-svg path'), 1, {
                    drawSVG: '100%'
                }, .4);
                TweenMax.staggerTo($('.s-2__stages-title, .s-2__stages-text'), 1, {
                    autoAlpha: 1,
                    x: 0
                }, .4);
            }
        };
        ambassadors();
        piantLines();
        $(window).on('scroll', e => {
            ambassadors();
            piantLines();
        });
    }
    $("#registration__sign-up__phone").mask("+9 (999) 99 99 999");
    $("#registration__sign-up__phone").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    const tmArrows = new TimelineLite();
    tmArrows.staggerTo('.s-1__stages-arrows__svg--animation', .4, {
        opacity: .4,
        ease: Power3.easeInOut
    }, .2).staggerTo('.s-1__stages-arrows__svg--animation', .4, {
        opacity: .1,
        ease: Power3.easeInOut
    }, .2, .4, () => {
        tmArrows.restart();
    });
    const menuAnimation = () => {
        TweenMax.killTweensOf('.menu__buttons, .menu__content');
        TweenMax.fromTo('.menu__buttons', .6, {
            autoAlpha: 0,
            x: '50%'
        }, {
            autoAlpha: 1,
            x: '0%',
            delay: .5
        });
        TweenMax.fromTo('.menu__content', .6, {
            autoAlpha: 0,
            x: '50%'
        }, {
            autoAlpha: 1,
            x: '0%',
            delay: 1
        });
    };
    const menuBtnWatch = () => {
        const winST = $(window).scrollTop();
        const sectionsWatch = $('.main__section');
        const btns = $('.menu__buttons-item');
        sectionsWatch.each((i, e) => {
            let sectionsTop = $(e).offset().top;
            let sectionsBottom = sectionsTop + $(e).height();
            if (winST >= sectionsTop && winST <= sectionsBottom) {
                btns.removeClass('active');
                $('.menu__buttons-item[href="#' + $(e).attr('id') + '"]').addClass('active');
            }
        });
    };
    menuBtnWatch();
    $(window).on('scroll', e => {
        menuBtnWatch();
    });
    $(document).on('click', '.registration__overlay, .registration__information-item__second-change-team, .registration__close__container',() => {
        if($(window).width() <= 768) {
            $('.menu-lines').toggleClass('hide');
        }
        if($('.registration__success').is(':visible')) {
            TweenMax.to('.registration__popup-container', .5, {
                autoAlpha: 0,
                onComplete: () => {
                    TweenMax.set('.registration__success', {
                        autoAlpha: 0,
                        display: 'none'
                    });
                    TweenMax.set('.registration__choose', {
                        autoAlpha: 1,
                        display: 'flex'
                    });
                }
            });
        } else {
            TweenMax.to('.registration__popup-container', .5, {
                autoAlpha: 0
            });
        }
    });
    $(document).on('click', '.coeff--click', e => {
        TweenMax.to('.registration__popup-container', .5, {
            autoAlpha: 1
        });
        if($(window).width() <= 768) {
            $('.menu-lines').toggleClass('hide');
        }
        changeRegForm($(e.currentTarget));
    });
    const changeRegForm = (target) => {
        let data = target.parent().parent().data();
        let side = target.data('side');
        let date = new Date(data.kickoff);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let hours = date.getHours() + 1;
        let minutes = date.getMinutes();
        let country = data.league.split(' ')[0];
        let betPrice;
        let information_item;
        if(side === 'left') {
            betPrice = Math.round(data.odd1*200);
            information_item = `<div class="registration__information-item__second-title">Ставлю на выигрыш команды</div>
                                        <div class="registration__information-item__second-name">${data.away}</div>
                                        <img class="registration__information-item__second-image" src="https://${data.awayLogo}">`;
        }
        if(side === 'middle') {
            betPrice = Math.round(data.oddx*200);
            information_item = `<div class="registration__information-item__second-title">Ставлю на</div>
                                        <div class="registration__information-item__second-name">ничью</div>
                                        <div>
                                            <img class="registration__information-item__second-image" src="https://${data.awayLogo}">
                                            <img class="registration__information-item__second-image" src="https://${data.homeLogo}">
                                        </div>`;
        }
        if(side === 'right') {
            betPrice = Math.round(data.odd2*200);
            information_item = `<div class="registration__information-item__second-title">Ставлю на выигрыш команды</div>
                                        <div class="registration__information-item__second-name">${data.home}</div>
                                        <img class="registration__information-item__second-image" src="https://${data.homeLogo}">`;
        }
        let informationTemplate = `<div class="registration__information-item registration__information-item__first">
                                        <div class="registration__information-item__col">
                                            <div class="registration__information-item__row title">
                                                Команда
                                            </div>
                                            <div class="registration__information-item__row">
                                                <span class="medium">${data.away}</span>
                                                <span class="regular">(${country})</span>
                                            </div>
                                            <div class="registration__information-item__row">
                                                <span class="medium">${data.home}</span>
                                                <span class="regular">(${country})</span>
                                            </div>
                                            <div class="registration__information-item__row">
                                                <span class="regular">Начало матча:</span>
                                                <span class="medium">${hours + ':' + minutes} (${day + '.' + month})</span>
                                            </div>
                                        </div>
                                        <div class="registration__information-item__col">
                                            <div class="registration__information-item__row title">
                                                Коэф
                                            </div>
                                            <div class="registration__information-item__row">
                                                <span class="medium">П. ${data.odd1}</span>
                                            </div>
                                            <div class="registration__information-item__row">
                                                <span class="medium">П. ${data.oddx}</span>
                                            </div>
                                            <div class="registration__information-item__row">
                                                <span class="medium">Н. ${data.odd2}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="registration__information-item registration__information-item__second">
                                        ${information_item}
                                        <div class="registration__information-item__second-change-team">Изменить</div>
                                    </div>
                                    <div class="registration__information-item registration__information-item__third">
                                        <p class="registration__information-item__third-text">Возможный выигрыш:</p>
                                        <p class="registration__information-item__third-price">${betPrice}₽</p>
                                    </div>`;
        $('.registration__information').html(informationTemplate);
    };
    $('.registration__choose__sign-up').on('click', () => {
        if (TweenMax.isTweening('.registration__choose')) {
            return
        }
        TweenMax.to('.registration__choose', .5, {
            autoAlpha: 0,
            display: 'none',
            onComplete: () => {
                TweenMax.to('.registration__sign-up', .5, {
                    autoAlpha: 1,
                    display: 'flex'
                });
            }
        });
    });
    $('.registration__choose__sign-in').on('click', () => {
        if (TweenMax.isTweening('.registration__choose')) {
            return
        }
        TweenMax.to('.registration__choose', .5, {
            autoAlpha: 0,
            display: 'none',
            onComplete: () => {
                TweenMax.to('.registration__sign-in', .5, {
                    autoAlpha: 1,
                    display: 'flex'
                });
            }
        });
    });
    $('.registration__arrow-back__container').on('click', () => {
        if (TweenMax.isTweening('.registration__sign-up') || TweenMax.isTweening('.registration__sign-in')) {
            return
        }
        const signVisible = $('.registration__sign-up').is(':visible') ? $('.registration__sign-up') : $('.registration__sign-in')
        TweenMax.to(signVisible, .5, {
            autoAlpha: 0,
            display: 'none',
            onComplete: () => {
                TweenMax.to('.registration__choose', .5, {
                    autoAlpha: 1,
                    display: 'flex'
                });
            }
        });
    });
    $('.registration__sign-up__input, .registration__sign-in__input').keyup((e) => {
        if ($(e.currentTarget).val() === '') {
            $(e.currentTarget).removeClass('val');
        } else {
            $(e.currentTarget).addClass('val');
        }
    });
    $('.s-1__all-matches--click').on('click', () => {
        TweenMax.to(window, .6, {
            scrollTo: '#s2'
        });
    });
    $('.s-3__up-btn--click').on('click', () => {
        TweenMax.to(window, .6, {
            scrollTo: 0
        });
    });
    $('.s-3__show-more').on('click', () => {
        let itemsL = $('.s-3__daily-rate').length;
        $.getJSON("js/fairgame.json", function (data) {
            if (data.length > itemsL) {
                let heightDaily = parseInt(window.getComputedStyle($('.s-3__daily-rate').get(1), null).getPropertyValue('margin-top'), 10) + $('.s-3__daily-rate').height();
                TweenMax.to('.s-3__daily-rate__container', .6, {
                    height: '+=' + (heightDaily * 4),
                    onComplete: () => {
                        TweenMax.to('.s-3__daily-rate', .6, {
                            autoAlpha: 1,
                            display: 'flex',
                            x: '0%'
                        });
                    }
                });
            }
            data.forEach((e, i) => {
                if (i < itemsL) {
                    return
                }
                if (i > itemsL + 3) {
                    return false
                }
                let gameObj = e;
                matchesRate(gameObj.away, gameObj.awayLogo, gameObj.home, gameObj.homeLogo, gameObj.kickoff, gameObj.league, gameObj.odd1, gameObj.odd2, gameObj.oddx);
            });
        });
    });
    $('.menu-lines--click').on('click', e => {
        $(e.currentTarget).toggleClass('close');
        $('body').toggleClass('scroll-hidden');
        $('.menu').toggleClass('active');
        if ($('.menu').hasClass('active')) {
            menuAnimation();
            TweenMax.fromTo('.menu', .6, {
                autoAlpha: 0,
                x: '100%'
            }, {
                autoAlpha: 1,
                x: '0%'
            });
        } else {
            TweenMax.fromTo('.menu', .6, {
                autoAlpha: 1,
                x: '0%'
            }, {
                autoAlpha: 0,
                x: '100%'
            });
        }
    });
    $('.menu__buttons-item').on('click', e => {
        e.preventDefault();
        $('.menu-lines--click').toggleClass('close');
        $('body').toggleClass('scroll-hidden');
        $('.menu').toggleClass('active');
        if ($('.menu').hasClass('active')) {
            menuAnimation();
        } else {
            TweenMax.fromTo('.menu', .6, {
                autoAlpha: 1,
                x: '0%'
            }, {
                autoAlpha: 0,
                x: '100%'
            });
        }
        let hash = e.currentTarget.hash;
        let posTop = $(hash).offset().top + 1;
        TweenMax.to(window, .6, {
            scrollTo: posTop
        });
    });

});
const headerRate = (away, awayLogo, home, homeLogo, kickoff, league, odd1, odd2, oddx) => {
    let date = new Date(kickoff);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hours = date.getHours() + 1;
    let minutes = date.getMinutes();
    let country = league.split(' ')[0];
    let template = `<div class="s-1__matches">
                        <div class="s-1__team-left">
                            <div class="s-1__team-title text-right">
                                <div class="s-1__team-name">${away}</div>
                                <div class="s-1__team-from">${country}</div>
                            </div>
                            <div class="s-1__team-logo">
                                <img src="https://${awayLogo}" alt="${away}">
                            </div>
                        </div>
                        <div class="s-1__vs">
                            <div class="s-1__date"><b>Дата:</b> <span class="s-1__date--text">${day + '.' + month}</span></div>
                            <div class="s-1__time"><b>Время:</b> <span class="s-1__time--text">${hours + ':' + minutes}</span></div>
                        </div>
                        <div class="s-1__team-right">
                            <div class="s-1__team-logo">
                                <img src="https://${homeLogo}" alt="${home}">
                            </div>
                            <div class="s-1__team-title text-left">
                                <div class="s-1__team-name">${home}</div>
                                <div class="s-1__team-from">${country}</div>
                            </div>
                        </div>
                    </div>
                    <div class="s-1__coeff">
                        <div class="s-1__left-coeff coeff--click" data-side="left">
                            <div class="s-1__coeff-title">Победа</div>
                            <div class="s-1__coeff-num">коэф: <span class="coeff-number s-1__coeff-num--change">${odd1}</span></div>
                            <div class="s-1__left-coeff--hover">
                                <div class="s-1__left-coeff--move">
                                    <div class="s-1__left-coeff--skew"></div>
                                    <span class="s-1__left-coeff-title">Возможный выигрыш:</span>
                                    <span class="s-1__left-coeff-summ">${Math.round(odd1 * 200)}₽</span>
                                </div>
                            </div>
                        </div>
                        <div class="s-1__draw-coeff coeff--click" data-side="middle">
                            <div class="s-1__coeff-title">Ничья</div>
                            <div class="s-1__coeff-num">коэф: <span class="coeff-number s-1__coeff-num--change">${oddx}</span></div>
                            <div class="s-1__draw-coeff--hover">
                                <div class="s-1__draw-coeff--move">
                                    <div class="s-1__draw-coeff--skew"></div>
                                    <span class="s-1__draw-coeff-title">Возможный <br> выигрыш:</span>
                                    <span class="s-1__draw-coeff-summ">${Math.round(oddx * 200)}₽</span>
                                </div>
                            </div>
                        </div>
                        <div class="s-1__right-coeff coeff--click" data-side="right">
                            <div class="s-1__coeff-title">Победа</div>
                            <div class="s-1__coeff-num">коэф: <span class="coeff-number s-1__coeff-num--change">${odd2}</span></div>
                            <div class="s-1__right-coeff--hover">
                                <div class="s-1__right-coeff--move">
                                    <div class="s-1__right-coeff--skew"></div>
                                    <span class="s-1__right-coeff-title">Возможный выигрыш:</span>
                                    <span class="s-1__right-coeff-summ">${Math.round(odd2 * 200)}₽</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
    $('.s-1__daily-rate').data({away, awayLogo, home, homeLogo, kickoff, league, odd1, odd2, oddx}).append(template);
};
const matchesRate = (away, awayLogo, home, homeLogo, kickoff, league, odd1, odd2, oddx) => {
    let date = new Date(kickoff);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let hours = date.getHours() + 1;
    let minutes = date.getMinutes();
    let country = league.split(' ')[0];
    let template = `<div class="s-3__daily-rate">
            <div class="s-3__matches">
                <div class="s-3__team-left">
                    <div class="s-3__team-title text-right">
                        <div class="s-3__team-name">${away}</div>
                        <div class="s-3__team-from">${country}</div>
                    </div>
                    <div class="s-3__team-logo">
                        <img src="https://${awayLogo}" alt="${away}">
                    </div>
                </div>
                <div class="s-3__vs">
                    <div class="s-3__date"><b>Дата:</b> <span class="s-3__date--text">${day + '.' + month}</span></div>
                    <div class="s-3__time"><b>Время:</b> <span class="s-3__time--text">${hours + ':' + minutes}</span></div>
                </div>
                <div class="s-3__team-right">
                    <div class="s-3__team-logo">
                        <img src="https://${homeLogo}" alt="${home}">
                    </div>
                    <div class="s-3__team-title text-left">
                        <div class="s-3__team-name">${home}</div>
                        <div class="s-3__team-from">${country}</div>
                    </div>
                </div>
            </div>
            <div class="s-3__coeff">
                <div class="s-3__left-coeff coeff--click" data-side="left">
                    <div class="s-3__coeff-title">Победа</div>
                    <div class="s-3__coeff-num">коэф: <span class="coeff-number s-3__coeff-num--change">${odd1}</span></div>
                    <div class="s-3__left-coeff--hover">
                        <div class="s-3__left-coeff--move">
                            <div class="s-3__left-coeff--skew"></div>
                            <span class="s-3__left-coeff-title">Возможный выигрыш:</span>
                            <span class="s-3__left-coeff-summ">${Math.round(odd1 * 200)}₽</span>
                        </div>
                    </div>
                </div>
                <div class="s-3__draw-coeff coeff--click" data-side="middle">
                    <div class="s-3__coeff-title">Ничья</div>
                    <div class="s-3__coeff-num">коэф: <span class="coeff-number s-3__coeff-num--change">${oddx}</span></div>
                    <div class="s-3__draw-coeff--hover">
                        <div class="s-3__draw-coeff--move">
                            <div class="s-3__draw-coeff--skew"></div>
                            <span class="s-3__draw-coeff-title">Возможный <br> выигрыш:</span>
                            <span class="s-3__draw-coeff-summ">${Math.round(oddx * 200)}₽</span>
                        </div>
                    </div>
                </div>
                <div class="s-3__right-coeff coeff--click" data-side="right">
                    <div class="s-3__coeff-title">Победа</div>
                    <div class="s-3__coeff-num">коэф: <span class="coeff-number s-3__coeff-num--change">${odd2}</span></div>
                    <div class="s-3__right-coeff--hover">
                        <div class="s-3__right-coeff--move">
                            <div class="s-3__right-coeff--skew"></div>
                            <span class="s-3__right-coeff-title">Возможный выигрыш:</span>
                            <span class="s-3__right-coeff-summ">${Math.round(odd2 * 200)}₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    $('.s-3__daily-rate__container').append(template);
    $($('.s-3__daily-rate').get($('.s-3__daily-rate').length - 1)).data({away, awayLogo, home, homeLogo, kickoff, league, odd1, odd2, oddx});
    if($('.s-3__daily-rate').length <= 4) {
        TweenMax.to('.s-3__daily-rate', .4, {
            autoAlpha: 1,
            display: 'flex',
            x: '0%',
            onComplete: ()=> {
                TweenMax.set('.s-3__daily-rate__container', {
                    height: $('.s-3__daily-rate__container').height()
                })
            }
        });
    }
};
