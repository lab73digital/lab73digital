var counter = 850;

$(document).ready(function () {
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
        $(this).toggleClass('fullheighted');
        $(".siofor-instruction__6-block_text-container_" + toHide).slideUp();
        $(".siofor-instruction__6-block_text-container_" + toShow).slideToggle();

    });
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