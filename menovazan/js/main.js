$(document).ready(function() {
    //this function triggers tooltip after hovering on specific element
    $('.tooltip').tooltipster({
        animation: 'fade',
        delay: 200,
        theme: 'tooltipster-light'
    });


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
        triggerElement: '#header-js',
        reverse: false
    });
    var ltHeader = new TimelineLite();
    ltHeader.fromTo(["header",".logo"], 1, {css: {autoAlpha: 0}}, {css: {autoAlpha: 1}})
         .to('.overview-wrapper', 0.5, {
            autoAlpha: 1
        })
        .to('.description', 0.3, {
            autoAlpha: 1,
            y: 0
        })
        .to('.overview__img img', 0.5, {
            autoAlpha: 1,
            delay: 0.3
        })
        .to('.overview-mob-prod', 0.3, {
            autoAlpha: 1,
            delay: 0.3
        }, "-=0.8")
        .to('h1', 0.3, {
            autoAlpha: 1
        })
        .to(".description-components", 0.5, {
            autoAlpha: 1
        })
        .to(".description--thing", 0.5, {
            autoAlpha: 1
        });

    scene.setTween(ltHeader).addTo(controller);


    ///////////////////////////////////////////////////
    ///Animation for section instruction starts here///
    ///////////////////////////////////////////////////

    var scene2 = new ScrollMagic.Scene({
        triggerElement: '.instruction h2',
        reverse: false
    });

    var tlInstruction = new TimelineLite();
    tlInstruction.to('.instruction-wrapper', 1, {
        autoAlpha: 1
    })
    .to('.instruction__form', 0.4, {
            autoAlpha: 1,
            y: 0
    })
    .to('.instruction__composition',  0.4, {
            autoAlpha: 1,
            y: 0
    })
    .to('.instruction__indication',  0.4, {
            autoAlpha: 1,
            y: 0
                })
    .to('.instruction img',  1, {
            autoAlpha: 1
    });
    scene2.setTween(tlInstruction).addTo(controller);

    ///////////////////////////////////////////////////
    //////Animation for section usage starts here//////
    ///////////////////////////////////////////////////
    var scene3 = new ScrollMagic.Scene({
        triggerElement: '.usage',
        reverse: false
    });

    var usage = new TimelineLite();
    usage.to('.usage h2', 0.3, {
        autoAlpha: 1,
        y: 0
    })
    .to('.usage-item--1',  0.5, {
            autoAlpha: 1,
            y: 0
    })
    .to('.usage-item--2',  0.5, {
            autoAlpha: 1,
            y: 0,
            delay: -0.2
    })
    .to('.usage-item--3',  0.5, {
            autoAlpha: 1,
            y: 0,
            delay: -0.2
    });
    scene3.setTween(usage).addTo(controller);
    ///////////////////////////////////////////////////
    //////Animation for section storage starts here////
    ///////////////////////////////////////////////////
    var scene4 = new ScrollMagic.Scene({
        triggerElement: '.storage',
        reverse: false,
        offset: -200
    });
    var tlStorage = new TimelineMax();

    tlStorage.to('.storage h2', 1, {
        autoAlpha: 1
    })
    .to('.storage p',  0.5, {
            autoAlpha: 1,
            y: 0
    })
    .to('.btn--instr',  0.3, {
            y: "0%",
            autoAlpha: 1
    })
    .to('.btn--drugstore',  0.3, {
            y: "0%",
            autoAlpha: 1
    })
    .add(TweenMax.to('.caution',  0.5, {
            autoAlpha: 1
    }), '.btn--drugstore')
    .add(TweenMax.to('footer p', 0.5, { autoAlpha: 1}), '.btn--drugstore');
    scene4.setTween(tlStorage).addTo(controller);


    ////////////////////////////////////////
    ////////////////////////////////////////
    /////////////END ANIMATION//////////////
    ////////////////////////////////////////
    ////////////////////////////////////////

    //burger menu trigger with menu animation
    $('.menu-slim').click(animateMenu);
    $('.nav-mobile a').click(function(){
        var tlMenuu = new TimelineMax();
        tlMenuu
            .staggerTo('.nav-mobile a', 0.5, {x:'-500%'}, 0.1)
            .to('.nav-mobile', 0.3, {
                bottom: '100%'
            }, "-=0.3");
        console.log('closed');
        $('.menu-slim').removeClass("menu-js-toggle");
    });

    function animateMenu(){
        $(this).toggleClass("menu-js-toggle");
        console.log($(this));
        var tlMenu = new TimelineMax();
        if ($(this).hasClass("menu-js-toggle")) {
            tlMenu
                .to('.nav-mobile', 0.3, {
                    bottom: '0%'
                })
                .staggerTo('.nav-mobile a', 0.5, {x:'0%'}, 0.1);
            console.log('opened');
        }
        else {
            tlMenu
                .staggerTo('.nav-mobile a', 0.5, {x:'-500%'}, 0.1)
                .to('.nav-mobile', 0.3, {
                    bottom: '100%'
                }, "-=0.3");
            console.log('closed');
        }
    }
});