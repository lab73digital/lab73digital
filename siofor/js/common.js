$(document).ready(function () {
    $( "#button-left" ).on('click', function() {
        $( "#biton-block_500" ).slideToggle();
        //$('.siofor-instruction__second-block_biton').toggleClass('siofor-instruction__second-block_biton_1000v');
    });
    $( "#button-right" ).on('click', function() {
        $(".siofor-instruction__second-block_biton_850").toggle(function () {
            $(".siofor-instruction__second-block_biton_1000").toggle(function () {
                $(".siofor-instruction__second-block_biton_500").toggle();
            })
        })
    });
    // $( "#biton-block_850_p" ).on('click', function() {
    //     $( "#biton-block_850" ).slideToggle();
    //     //$("#biton-block_850").toggleClass('.siofor-instruction__second-block_biton_850');
    // });
    // $( "#biton-block_500_p" ).on('click', function() {
    //     $( "#biton-block_500" ).slideToggle();
    //     //$('.siofor-instruction__second-block_biton').toggleClass('siofor-instruction__second-block_biton_1000v');
    // });

    $("#biton-block_500_p").click(function(){
        $("#biton-block_500_p").addClass("hovered-item-500");
        $(".siofor-instruction__second-block_biton_850").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
                $("#biton-block_1000_p").removeClass("hovered-item-1000");
                $("#biton-block_850_p").removeClass("hovered-item-850");
                $(".siofor-instruction__second-block_biton_500").show();
    });
    $("#biton-block_1000_p").click(function(){
        $("#biton-block_1000_p").addClass("hovered-item-1000");
        $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_850").hide();
                $("#biton-block_500_p").removeClass("hovered-item-500");
                $("#biton-block_850_p").removeClass("hovered-item-850");
                $(".siofor-instruction__second-block_biton_1000").show();
    });
    $("#biton-block_850_p").click(function(){
        $("#biton-block_850_p").addClass("hovered-item-850");
        $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
                $("#biton-block_500_p").removeClass("hovered-item-500");
                $("#biton-block_1000_p").removeClass("hovered-item-1000");
                $(".siofor-instruction__second-block_biton_850").show();
        });
});


// $(".siofor-instruction__second-block_packs-1000").css({"top": "59%", "left": "74%", "height": "9.3rem", "width": "9.3rem", "background-color": "white", "z-index": "2"});
// })