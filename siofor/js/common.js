var counter = 850;

$(document).ready(function () {
    $( "#button-left" ).on('click', function() {
        if (counter === 850) {
            $("#biton-block_500_p").addClass("hovered-item-500");
            counter = 500;
            $(".siofor-instruction__second-block_biton_850").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
            $("#biton-block_1000_p").removeClass("hovered-item-1000");
            $("#biton-block_850_p").removeClass("hovered-item-850");
            $(".siofor-instruction__second-block_biton_500").show();
        } else if (counter === 1000) {
            $("#biton-block_850_p").addClass("hovered-item-850");
            counter = 850;
            $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
            $("#biton-block_500_p").removeClass("hovered-item-500");
            $("#biton-block_1000_p").removeClass("hovered-item-1000");
            $(".siofor-instruction__second-block_biton_850").show();
        } else {
            $("#biton-block_1000_p").addClass("hovered-item-1000");
            counter = 1000;
            $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_850").hide();
            $("#biton-block_500_p").removeClass("hovered-item-500");
            $("#biton-block_850_p").removeClass("hovered-item-850");
            $(".siofor-instruction__second-block_biton_1000").show();
        }

    });

    $( "#button-right" ).on('click', function() {
        if (counter === 850) {
            $("#biton-block_1000_p").addClass("hovered-item-1000");
            counter = 1000;
            $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_850").hide();
            $("#biton-block_500_p").removeClass("hovered-item-500");
            $("#biton-block_850_p").removeClass("hovered-item-850");
            $(".siofor-instruction__second-block_biton_1000").show();
        } else if (counter === 1000) {
            $("#biton-block_500_p").addClass("hovered-item-500");
            counter = 500;
            $(".siofor-instruction__second-block_biton_850").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
            $("#biton-block_1000_p").removeClass("hovered-item-1000");
            $("#biton-block_850_p").removeClass("hovered-item-850");
            $(".siofor-instruction__second-block_biton_500").show();
        } else {
            $("#biton-block_850_p").addClass("hovered-item-850");
            counter = 850;
            $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
            $("#biton-block_500_p").removeClass("hovered-item-500");
            $("#biton-block_1000_p").removeClass("hovered-item-1000");
            $(".siofor-instruction__second-block_biton_850").show();
        }

    });


    $("#biton-block_500_p").click(function(){
        $("#biton-block_500_p").addClass("hovered-item-500");
        counter = 500;
        $(".siofor-instruction__second-block_biton_850").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
                $("#biton-block_1000_p").removeClass("hovered-item-1000");
                $("#biton-block_850_p").removeClass("hovered-item-850");
                $(".siofor-instruction__second-block_biton_500").show();
    });
    $("#biton-block_1000_p").click(function(){
        $("#biton-block_1000_p").addClass("hovered-item-1000");
        counter = 1000;
        $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_850").hide();
                $("#biton-block_500_p").removeClass("hovered-item-500");
                $("#biton-block_850_p").removeClass("hovered-item-850");
                $(".siofor-instruction__second-block_biton_1000").show();
    });
    $("#biton-block_850_p").click(function(){
        $("#biton-block_850_p").addClass("hovered-item-850");
        counter = 850;
        $(".siofor-instruction__second-block_biton_500").hide();
            $(".siofor-instruction__second-block_biton_1000").hide();
                $("#biton-block_500_p").removeClass("hovered-item-500");
                $("#biton-block_1000_p").removeClass("hovered-item-1000");
                $(".siofor-instruction__second-block_biton_850").show();
        });
});