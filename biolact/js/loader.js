var hellopreloader = document.getElementById("hellopreloader_preload");

function fadeOutnojquery(el) {
    el.style.opacity = 1;
    var interhellopreloader = setInterval(function () {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interhellopreloader);
            hellopreloader.style.display = "none";
        }
    }, 16);
}

window.onload = function () {
    setTimeout(function () {
        fadeOutnojquery(hellopreloader);
        new TimelineMax().staggerTo('.jal-item', .6, {
            ease: Power2.easeInOut,
            opacity: 1,
            delay: 0.5
        }, .1).to('.header-container h1', .5, {
            ease: Power2.easeInOut,
            opacity: 1
        }).to('.header-container h3', .5, {
            ease: Power2.easeInOut,
            opacity: 1
        }).fromTo('.btn-blue--1', 1, {
            ease: Power2.easeInOut,
            y: 200,
            opacity: 0
        },{
            ease: Power2.easeInOut,
            y: 0,
            opacity: 1
        });
    }, 1000);
};