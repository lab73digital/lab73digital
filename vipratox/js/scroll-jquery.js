$("a[href^='#']").off().on("click", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href');
    var h = $('header').height();

    var top = $(id).offset().top - h;

    $('body,html').stop(true).animate({scrollTop: top}, 1000);
});