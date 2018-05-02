$(document).ready(function () {
    var $window = $(window);		//Window object

    var scrollTime = 0.7;			//Scroll time
    var scrollDistance = 250;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

    $window.on("mousewheel DOMMouseScroll", function(event){

        event.preventDefault();

        var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta*scrollDistance);

        TweenMax.to($window, scrollTime, {
            scrollTo : { y: finalScroll, autoKill:true },
            ease: Power1.easeOut,	//For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
            autoKill: true,
            overwrite: 5
        });

    });

    $(window).on('scroll', pointMenuDot);
    //this function triggers tooltip after hovering on specific element
    $('.tooltip').tooltipster({
        theme: 'tooltipster-light',
        contentAsHTML: true,
        viewportAware: true,
        maxWidth: 320,
        trigger:"custom",
        triggerOpen: {
            mouseenter: true,  // For mouse
            tap: true    // For touch device
        },
        triggerClose: {
            mouseleave: true,  // For mouse
            tap: true,    // For touch device
            scroll: true  // For touch device
        }
    });

    var clipPathTopStart = 7.96875 * (window.innerWidth * 0.01) / $('.indication-after').height() * 100; // 153px === 7.96875vw(converted into vw(153 because of offset where clipPath zone started))
    var clipPathTopEnd = 100 - (($('.indication-after img').height() - 7.96875 * (window.innerWidth * 0.01)) / $('.indication-after').height() * 100) ;
    var imgTop = 100 - ($('.indication-after img').height() / $('.indication-after').height() * 100);// 100%(block)-ratio of img to all section == top of animated img(point where animation ends)

    $('.indication__clipPathBox').attr({
        'data-100-top': 'top: '+ clipPathTopStart + '%',
        'data-_indicationimg--0-top': 'top: '+ clipPathTopEnd + '%'
    });
    $('.indication-after__img').attr('data-_indicationimg--0-top', 'top: '+ imgTop + '%');
    if(window.innerWidth >= 768) {
        skrollr.init({
            edgeStrategy: 'set',
            easing: {
                WTF: Math.random,
                inverted: function (p) {
                    return 1 - p;
                }
            },
            constants: {
                indicationimg: $('#storage').offset().top - $('#indication').offset().top - 100 - $('.indication-after__img').height()
            }
        });
    }

    //burger menu trigger with menu animation
    $('.menu-slim').on("click", animateMenu);
    $(document).on("click", '.nav-mobile a, .button-box a, .logo a, .navigation__item', goToLink);

    pointMenuDot();
    clipThru();


    ////////////////////////////////////////
    ////////////////////////////////////////
    //////////////ANIMATION/////////////////
    ////////////////////////////////////////
    ////////////////////////////////////////


    ////////////////////////////////////////////////////////////
    ///Animation for header and overview section starts here///
    ///////////////////////////////////////////////////////////
    var controller = new ScrollMagic.Controller();
    //triggering animation when triggerElement is visible in window
    var scene = new ScrollMagic.Scene({
        triggerElement: '#header',
        reverse: false
    });
    var ltHeader = new TimelineLite();
    ltHeader
        .from('.overview-after img', 1 , {
            autoAlpha: 0,
            yPercent: -150,
            xPercent: 100,
            rotationZ: 60
        })
        .from('.overview .desktop-img', 0.6 , {
            autoAlpha: 0,
            xPercent: 45,
            yPercent: -15,
            delay: -0.4
        })
        .from('h1', 0.3, {
            autoAlpha: 0,
            yPercent: -20
        })
        .from('.overview p', 0.3, {
            autoAlpha: 0
        })
        .staggerFrom('.overview .button-box a', 0.5, {
            autoAlpha: 0
        }, 0.35)
        .from('nav', 0.5, {
            autoAlpha: 0
        })
        .from('.overview .mobile-img', 0.5, {
            autoAlpha: 0
        }, '-=1.8');


    scene.setTween(ltHeader).addTo(controller);


    ///////////////////////////////////////////////////
    ///Animation for section description starts here///
    ///////////////////////////////////////////////////

    var scene2 = new ScrollMagic.Scene({
        triggerElement: '.description-wrapper',
        reverse: false,
        offset: -200
    });

    var tlDescription = new TimelineLite();
    tlDescription
        .from('.description-before img', 1.5, {
            autoAlpha: 0,
            yPercent: -10,
            xPercent: -50,
            rotationZ: -60
        })
        .from('.description-wrapper h2', 0.3, {
            autoAlpha: 0
        })
        .staggerFrom('.description__list', 0.6, {
            autoAlpha: 0
        }, 0.3);


    scene2.setTween(tlDescription).addTo(controller);

    ///////////////////////////////////////////////////
    ///////Animation for div benefits starts here//////
    ///////////////////////////////////////////////////

    var scene3 = new ScrollMagic.Scene({
        triggerElement: '.benefits-wrapper',
        reverse: false,
        offset: -100
    });

    var tlBenefits = new TimelineLite();
    tlBenefits
        .from('.benefits-wrapper h2', 1, {
            autoAlpha: 0
        })
        .staggerFrom('.benefits__item img', 0.8, {
            autoAlpha: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            ease: Back.easeOut.config(3)
        }, 0.2)
        .staggerFrom('.benefits__item h3', 0.8, {
            autoAlpha: 0
        }, 0.2, '-=1')
        .from('.description-after img', 1, {
            autoAlpha: 0,
            xPercent: 50
        }, '-=0.5');
    scene3.setTween(tlBenefits).addTo(controller);

    ///////////////////////////////////////////////////
    //Animation for section instruction starts here////
    ///////////////////////////////////////////////////
    var scene4 = new ScrollMagic.Scene({
        triggerElement: '.instruction',
        reverse: false,
        offset: -100
    });

    var tlInstruction = new TimelineLite();
    if(window.innerWidth <= 756){
    tlInstruction
        .staggerFrom(['.instruction-wrapper h2', '.instruction__form', '.instruction__composition', '.instruction__supplementary'], 0.4, {
                autoAlpha: 0
            }, 0.4)
    }
    else {
        tlInstruction
            .from('.instruction-wrapper .right-part', 0.8, {
                autoAlpha: 0,
                xPercent: 30
            })
            .from('.instruction-wrapper img', 0.8, {
                autoAlpha: 0,
                xPercent: -30
            }, '-=0.8');
    }

    scene4.setTween(tlInstruction).addTo(controller);



    ///////////////////////////////////////////////////
    //Animation for section indication starts here////
    ///////////////////////////////////////////////////
    var scene5 = new ScrollMagic.Scene({
        triggerElement: '.indication',
        reverse: false,
        offset: -200
    });
    var tlIndication = new TimelineLite();
    tlIndication
        .from('.indication-content h2', 0.5, {
            autoAlpha: 0
        })
        .staggerFrom('.list__item', 0.5, {
        autoAlpha: 0
    }, 0.5, '+=0.2');
    scene5.setTween(tlIndication).addTo(controller);


    var scene55 = new ScrollMagic.Scene({
        triggerElement: '.indication-after img',
        reverse: false,
        offset: 200
    });
    var tlIndication55 = new TimelineLite();

    tlIndication55
        .from('.indication-after img', 1.3, {
            autoAlpha: 0
        });

    scene55.setTween(tlIndication55).addTo(controller);


    ///////////////////////////////////////////////////
    //Animation for section indication2 starts here////
    ///////////////////////////////////////////////////
    var scene6 = new ScrollMagic.Scene({
        triggerElement: '.indication-content2',
        reverse: false
    });

    var tlIndication2 = new TimelineLite();
    tlIndication2
        .from('.indication-content2 h2', 0.5, {
            autoAlpha: 0
        })
        .staggerFrom('.indication-content2__item', 0.8, {
            autoAlpha: 0
        }, 0.2)
        .from(' .notification', 0.5, {
            autoAlpha: 0
        });
    scene6.setTween(tlIndication2).addTo(controller);

    //////////////////////////////////////////////////
    ///Animation for section storage starts here//////
    //////////////////////////////////////////////////
    var scene7 = new ScrollMagic.Scene({
        triggerElement: '.storage',
        reverse: false,
        offset: -200
    });
    var tlStorage = new TimelineMax();

    tlStorage
        .staggerFrom(['.storage h2', '.storage p'], 0.5, {
            autoAlpha: 0
        }, 0.3)
        .staggerFrom('.btn-box a', 0.5, {
            autoAlpha: 0,
            yPercent: 50
        }, 0.3)
        .staggerFrom(['.caution', 'footer'], 0.2, {
            autoAlpha: 0
        }, 0.1);

    scene7.setTween(tlStorage).addTo(controller);

    ////////////////////////////////////////
    ////////////////////////////////////////
    /////////////END ANIMATION//////////////
    ////////////////////////////////////////
    ////////////////////////////////////////
});

function pointMenuDot(){
    var winOffTop = $(window).scrollTop();
    $('.sectionSpy').each(function (i, e) {
       var elOffTop = $(e).offset().top;
       if(elOffTop <= winOffTop+1){
           $('.navigation__item').removeClass('active');
           $('.navigation__item[data-name="' + $(e).attr('id') + '"]').addClass('active');
       } else if(winOffTop + $(window).height() === $(document).height()){
           $('.navigation__item').removeClass('active');
           $('.navigation__item:last-child').addClass('active');
       }
    });
}

function goToLink(e) {
    e.preventDefault();
    var id  = $(this).attr('href');
    var h = $('header').height();
    var top;
    if(window.innerWidth <= 768){
        top = $(id).offset().top - h;
    } else {
        top = $(id).offset().top;
    }
    $('body,html').stop(true).animate({scrollTop: top}, 1000);

    var tlMenu = new TimelineMax();
    tlMenu
        .staggerTo('.nav-mobile a', 0.5, {x: '-500%'}, 0.1)
        .to('.nav-mobile', 0.3, {
            bottom: '100%'
        }, "-=0.3");
    $('.menu-slim').removeClass("menu-js-toggle");
}

function animateMenu() {
    $(this).toggleClass("menu-js-toggle");
    var tlMenu = new TimelineMax();
    if ($(this).hasClass("menu-js-toggle")) {
        tlMenu
            .to('.nav-mobile', 0.3, {
                bottom: '0%',
                ease: Power3.easeOut
            })
            .staggerTo('.nav-mobile a', 0.5, {x: '0%'}, 0.1);
    }
    else {
        tlMenu
            .staggerTo('.nav-mobile a', 0.5, {x: '-500%'}, 0.1)
            .to('.nav-mobile', 0.3, {
                bottom: '100%',
                ease: Power3.easeOut
            }, "-=0.3");
    }
}

function clipThru() {
    $('#navigation').clipthru();
}