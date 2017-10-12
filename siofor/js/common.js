$(document).ready(function () {
    var controller = new ScrollMagic.Controller();
    var tween1 = new TimelineMax().fromTo('.siofor-instruction', .9, {
        opacity: 0
    }, {
        opacity: 1,
        delay: 1
    }).fromTo('.animation_1-1', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).fromTo('.animation_1-2', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).fromTo('.animation_1-3', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).fromTo('.animation_1-4', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_1-5', 0, {
        opacity: 1
    }).from('.animation_1-5', .6, {
        height: "0px"
    }).to('.animation_1-6', 0, {
        opacity: 1
    }).from('.animation_1-6', .6, {
        width: "0px"
    }).to('.animation_1-7', 0, {
        opacity: 1
    }).from('.animation_1-7', .6, {
        height: "0px"
    }).fromTo('.animation_1-8', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).fromTo('.second-background', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_1-9', 0, {
        opacity: 1
    }).from('.animation_1-9', .6, {
        height: "0px"
    }).to('.animation_1-10', 0, {
        opacity: 1
    }).from('.animation_1-10', .6, {
        width: "0px"
    }).fromTo('.animation_1-11', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_1-12', 0, {
        opacity: 1
    }).from('.animation_1-12', .6, {
        height: "0px"
    }).fromTo('.animation_1-13', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_1-14', 0, {
        opacity: 1
    }).from('.animation_1-14', .6, {
        height: "0px"
    }).to('.animation_1-15', 0, {
        opacity: 1
    }).from('.animation_1-15', .6, {
        width: "0px"
    }).fromTo('.animation_1-16', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_1-17', 0, {
        opacity: 1
    }).from('.animation_1-17', .6, {
        height: "0px"
    }).to('.animation_1-18', 0, {
        opacity: 1
    }).from('.animation_1-18', .6, {
        width: "0px", onComplete: function () {
            $('[class *= "animation_1"]').attr('style', '');
        }
    });

    var tween2 = new TimelineMax().fromTo('.animation_2-1', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).fromTo('.animation_2-2', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_2-3', 0, {
        opacity: 1
    }).from('.animation_2-3', .6, {
        width: "0px"
    }).fromTo('.animation_2-5', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_2-4', 0, {
        opacity: 1
    }).from('.animation_2-4', .6, {
        height: "0px"
    }).to('.animation_2-45', 0, {
        opacity: 1
    }).from('.animation_2-45', .6, {
        width: "0px"
    }).staggerFromTo('.animation_2-6', .1, {
        opacity: 0,
        y: -50
    }, {
        opacity: 1,
        y: 0
    }, .6).fromTo('.animation_2-7', .6, {
        opacity: 0
    }, {
        opacity: 1, onComplete: function () {
            $('[class *= "animation_2"]').attr('style', '');
        }
        // onComplete: function () {
        //     $('.animation_2-6').attr('style', 'opacity:1')
        // }
    });

    var tween3 = new TimelineMax().fromTo('.animation_3-1', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_3-2', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_3-3', .6, { opacity: 0}, {opacity:1})
        .staggerFromTo('.animation_3-4', .3, { opacity: 0, y: -30}, {opacity:1, y:0}, .6)
        .fromTo('.animation_3-5', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_3-6', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_3-7', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_3-8', .6, { opacity: 0, width: '0px'}, {opacity:1, width: '900px'})
        .fromTo('.animation_3-9', .6, { opacity: 0}, {opacity:1});

    var tween4 = new TimelineMax().fromTo('.animation_4-1', .6, { opacity: 0, y: -30}, {opacity:1, y: 0})
        .fromTo('.animation_4-2', .6, { opacity: 0, x: 30}, {opacity:1, x: 0})
        .fromTo('.animation_4-3', .6, { opacity: 0, x: -30}, {opacity:0.5, x: 0, onComplete: function () {
            $('[class ^= "animation_4"]').attr('style', '');
        }});

    var tween5 = new TimelineMax().fromTo('.animation_5-1', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_5-2', .6, { opacity: 0}, {opacity:1});
        // .fromTo('.animation_5-3', .6, { opacity: 0}, {opacity:1})
        // .fromTo('.animation_5-4', .6, { opacity: 0, width: '0px'}, {opacity:1, width: '100%'});

    var tween6 = new TimelineMax().fromTo('.animation_6-3', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_6-4', .6, { opacity: 0, width: '0px'}, {opacity:1, width: '100%'})
        .fromTo('.animation_6-51', .6, { opacity: 0, y: -30}, {opacity:1, y:0})
        .fromTo('.animation_6-52', .6, { opacity: 0, y: -30}, {opacity:1, y:0});

    var tween7 = new TimelineMax().fromTo('.animation_7-1', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).fromTo('.animation_7-2', .6, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_7-3', 0, {
        opacity: 1
    }).from('.animation_7-3', .6, {
        width: "0px"
    }).to('.animation_7-4', 0, {
        opacity: 1
    }).from('.animation_7-4', .6, {
        height: "0px"
    }).fromTo('.animation_7-5', .8, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_7-6', 0, {
        opacity: 1
    }).from('.animation_7-6', .6, {
        height: "0px"
    }).to('.animation_7-7', 0, {
        opacity: 1
    }).from('.animation_7-7', .6, {
        width: "0px"
    }).fromTo('.animation_7-8', .8, {
        opacity: 0
    }, {
        opacity: 1
    }).to('.animation_7-9', 0, {
        opacity: 1
    }).from('.animation_7-9', .6, {
        height: "0px", onComplete: function () {
            $('[class ^= "animation_7"]').attr('style', '');
        }
    });

    var tween8 = new TimelineMax().fromTo('.animation_8-1', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_8-2', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_8-3', .6, { opacity: 0}, {opacity:1});

    var tween9 = new TimelineMax().fromTo('.animation_9-1', .6, { opacity: 0}, {opacity:1})
        .fromTo('.animation_9-2', .6, { opacity: 0, width: '0px'}, {opacity:1, width: '100%'})
        .fromTo('.animation_9-3', .6, { opacity: 0}, {opacity:1});

    new ScrollMagic.Scene({
        triggerElement: ".animation_1-1",
        reverse: false
    }).setTween(tween1).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_2-1",
        reverse: false
    }).setTween(tween2).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_3-1",
        reverse: false
    }).setTween(tween3).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_4-1",
        reverse: false
    }).setTween(tween4).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_5-1",
        reverse: false
    }).setTween(tween5).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_6-3",
        reverse: false
    }).setTween(tween6).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_7-1",
        reverse: false
    }).setTween(tween7).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_8-1",
        reverse: false
    }).setTween(tween8).addTo(controller);
    new ScrollMagic.Scene({
        triggerElement: ".animation_8-3",
        reverse: false
    }).setTween(tween9).addTo(controller);

    // $( "#button-left" ).on('click', function() {
    //     if (counter === 850) {
    //         $("#biton-block_500_p").addClass("hovered-item-500");
    //         counter = 500;
    //         $(".siofor-instruction__second-block_biton_850").hide();
    //         $(".siofor-instruction__second-block_biton_1000").hide();
    //         $("#biton-block_1000_p").removeClass("hovered-item-1000");
    //         $("#biton-block_850_p").removeClass("hovered-item-850");
    //         $(".siofor-instruction__second-block_biton_500").show();
    //     } else if (counter === 1000) {
    //         $("#biton-block_850_p").addClass("hovered-item-850");
    //         counter = 850;
    //         $(".siofor-instruction__second-block_biton_500").hide();
    //         $(".siofor-instruction__second-block_biton_1000").hide();
    //         $("#biton-block_500_p").removeClass("hovered-item-500");
    //         $("#biton-block_1000_p").removeClass("hovered-item-1000");
    //         $(".siofor-instruction__second-block_biton_850").show();
    //     } else {
    //         $("#biton-block_1000_p").addClass("hovered-item-1000");
    //         counter = 1000;
    //         $(".siofor-instruction__second-block_biton_500").hide();
    //         $(".siofor-instruction__second-block_biton_850").hide();
    //         $("#biton-block_500_p").removeClass("hovered-item-500");
    //         $("#biton-block_850_p").removeClass("hovered-item-850");
    //         $(".siofor-instruction__second-block_biton_1000").show();
    //     }
    //
    // });

    // $( "#button-right" ).on('click', function() {
    //     if (counter === 850) {
    //         $("#biton-block_1000_p").addClass("hovered-item-1000");
    //         counter = 1000;
    //         $(".siofor-instruction__second-block_biton_500").hide();
    //         $(".siofor-instruction__second-block_biton_850").hide();
    //         $("#biton-block_500_p").removeClass("hovered-item-500");
    //         $("#biton-block_850_p").removeClass("hovered-item-850");
    //         $(".siofor-instruction__second-block_biton_1000").show();
    //     } else if (counter === 1000) {
    //         $("#biton-block_500_p").addClass("hovered-item-500");
    //         counter = 500;
    //         $(".siofor-instruction__second-block_biton_850").hide();
    //         $(".siofor-instruction__second-block_biton_1000").hide();
    //         $("#biton-block_1000_p").removeClass("hovered-item-1000");
    //         $("#biton-block_850_p").removeClass("hovered-item-850");
    //         $(".siofor-instruction__second-block_biton_500").show();
    //     } else {
    //         $("#biton-block_850_p").addClass("hovered-item-850");
    //         counter = 850;
    //         $(".siofor-instruction__second-block_biton_500").hide();
    //         $(".siofor-instruction__second-block_biton_1000").hide();
    //         $("#biton-block_500_p").removeClass("hovered-item-500");
    //         $("#biton-block_1000_p").removeClass("hovered-item-1000");
    //         $(".siofor-instruction__second-block_biton_850").show();
    //     }
    //
    // });


    // $("#biton-block_500_p").click(function(){
    //     $("#biton-block_500_p").addClass("hovered-item-500");
    //     counter = 500;
    //     $(".siofor-instruction__second-block_biton_850").hide();
    //         $(".siofor-instruction__second-block_biton_1000").hide();
    //             $("#biton-block_1000_p").removeClass("hovered-item-1000");
    //             $("#biton-block_850_p").removeClass("hovered-item-850");
    //             $(".siofor-instruction__second-block_biton_500").show();
    // });
    // $("#biton-block_1000_p").click(function(){
    //     $("#biton-block_1000_p").addClass("hovered-item-1000");
    //     counter = 1000;
    //     $(".siofor-instruction__second-block_biton_500").hide();
    //         $(".siofor-instruction__second-block_biton_850").hide();
    //             $("#biton-block_500_p").removeClass("hovered-item-500");
    //             $("#biton-block_850_p").removeClass("hovered-item-850");
    //             $(".siofor-instruction__second-block_biton_1000").show();
    // });
    // $("#biton-block_850_p").click(function(){
    //     $("#biton-block_850_p").addClass("hovered-item-850");
    //     counter = 850;
    //     $(".siofor-instruction__second-block_biton_500").hide();
    //         $(".siofor-instruction__second-block_biton_1000").hide();
    //             $("#biton-block_500_p").removeClass("hovered-item-500");
    //             $("#biton-block_1000_p").removeClass("hovered-item-1000");
    //             $(".siofor-instruction__second-block_biton_850").show();
    //     });
    $('.siofor-instruction__second-block_packs--click').on('click', function () {
        var count = $(this).data('slide-count');
        $('.siofor-instruction__second-block_packs--click').removeClass('hovered-item');
        $('.siofor-instruction__second-block_biton-text').removeClass('active');
        $(this).addClass('hovered-item');
        $('.siofor-instruction__second-block_biton_' + count).addClass('active');
    });

    $( "#button-left" ).on('click', function () {
        var el = $('.siofor-instruction__second-block_packs--click.hovered-item');
        if(el.prev('.siofor-instruction__second-block_packs--click').length){
            el.prev('.siofor-instruction__second-block_packs--click').click();
        } else {
            $('.siofor-instruction__second-block_packs--click:last-child').click();
        }
    });

    $( "#button-right" ).on('click', function () {
        var el = $('.siofor-instruction__second-block_packs--click.hovered-item');
        if(el.next('.siofor-instruction__second-block_packs--click').length){
            el.next('.siofor-instruction__second-block_packs--click').click();
        } else {
            $('.siofor-instruction__second-block_packs--click:first-child').click();
        }
    });

    // $( ".siofor-instruction__4-block-left_hole, .siofor-instruction__4-block-right_hole" ).on('click', function () {
    //     var hole1 = $(this).data('hole-toggler-1'), hole2 = $(this).data('hole-toggler-2');
    //     if ($(".siofor-instruction__4-block-" + hole1).css("z-index","0")) {
    //     $(".siofor-instruction__4-block-" + hole1).removeClass('opacity-maker').css("z-index","1").css("cursor","auto");
    //     $(".siofor-instruction__4-block-" + hole2).css("z-index","0").css("cursor","pointer").addClass("opacity-maker");
    //     }
    // });

    // $( ".siofor-instruction__4-block-right, .siofor-instruction__4-block-left" ).on('click', function () {
    //     var checker = $(this).data('biton-toggler');
    //     if ($(this).css("z-index","0")) {
    //     $(this).removeClass('opacity-maker');
    //     $(this).css("z-index","1").css("cursor","auto");
    //     $('.siofor-instruction__4-block-' + checker).css("z-index","0").css("cursor","pointer").addClass('opacity-maker');
    //     }
    // });
    $('.siofor-instruction__4-block--click').on('click', function () {
        $('.siofor-instruction__4-block--click').removeClass('active');
        $(this).addClass('active');
    });
    $('.siofor-instruction__4-block-hole--click').on('click', function () {
       var blockSide = $(this).data('hole-toggler');
       $('.siofor-instruction__4-block--click').removeClass('active');
       $('.siofor-instruction__4-block-' + blockSide).addClass('active');
    });

    $(".siofor-instruction__6-block_buttons--click").on('click', function () {
        var toShow = $(this).data('slide-toggle-1');
        var toHide = $(this).data('slide-toggle-2');
        var toToggle = $(this).data('slide-toggle-3');
        $(".siofor-instruction__6-block_buttons-" + toToggle).removeClass('fullheighted');
        $(".line-toggle-left-dot,.line-toggle-right-dot").css("opacity","0");
        $(this).toggleClass('fullheighted');
        $(".siofor-instruction__6-block_text-container_" + toHide).hide();
        $(".siofor-instruction__6-block_text-container_" + toShow).slideToggle();
        TweenMax.fromTo('.line-toggle-left', 1.5, {height: 0},{height: 257, onComplete: function () {
            TweenMax.to('.line-toggle-left-dot', 1, {opacity: 1});
        }});
        TweenMax.fromTo('.line-toggle-right', 2, {height: 0},{height: 557, onComplete: function () {
            TweenMax.to('.line-toggle-right-dot', 1, {opacity: 1});
        }});

    });
    //TweenMax.to('.line-toggle-left', 1, {color: 'red'});


    // $(".siofor-instruction__6-block_buttons-right").on('click', function () {
    //     $(".siofor-instruction__6-block_text-container_left-text").hide();
    //     $(".siofor-instruction__6-block_text-container_right-text").slideToggle();
    // });


    // $( ".siofor-instruction__4-block-left" ).on('click', function () {
    //     var checker = $(this).data('biton-toggler');
    //     if ($(this).css("z-index","0")) {
    //         $(this).removeClass('opacity-maker');
    //         $(this).css("z-index","1");
    //         $('.siofor-instruction__4-block-' + checker).css("z-index","0").addClass('opacity-maker');
    //     }
    // });
    // $( ".siofor-instruction__4-block" ).on('click', function () {
    //
    //     $(this).removeClass('opacity-maker');
    //     $(this).css("z-index","1");
    //     $(".siofor-instruction__4-block-left").css("z-index","0").addClass('opacity-maker');
    // })
});