
    $(function () {
        createSticky($("#header-js"));
    });

    function createSticky(sticky) {
        if (typeof sticky !== "undefined") {
            var pos = sticky.offset().top,
                win = $(window);
            win.on("scroll", function () {
                win.scrollTop() >= pos ? sticky.addClass("fixed") : sticky.removeClass("fixed");
                if ($('#header-js').hasClass('fixed') >= $('.overview-wrapper').addClass('overview-js'));
            });
        }
    }

    $("a[href^='#']").off().on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),

            top = $(id).offset().top;
            hig = $('#header-js').height();
            console.log(hig);
            console.log(top);
            top = top + hig;
            console.log(top);
        $('body,html').stop(true).animate({scrollTop: top}, 1000);
    });