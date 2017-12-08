let supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize",
    screenApply,
    loaderLoad = true,
    screenHeight = screen.height,
    screenWidth = screen.width,
    windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;

document.addEventListener("DOMContentLoaded", loader());

function loader() {
    let body = document.querySelector('body');
    let preloader = document.querySelector('.preloader');
    let preloader__progress_bar = preloader.querySelector('.preloader__progress-bar');
    window.onload = function () {
        setTimeout(function () {
            if (!preloader) {
                document.querySelector('html').classList.add('loaded');
            }
        }, 1500);
    };
    let loadingScreen = function (progress) {
        if (progress < 100) {
            preloader__progress_bar.style.width = progress + '%';
        } else {
            // app.init();
            preloader__progress_bar.style.width = '100%';
            body.classList.add('preloader-off');
            document.querySelector('html').classList.add('loaded');
            setTimeout(function () {
                preloader.style.display = 'none';
                body.classList.remove('scroll-hidden');
            }, 2300);
        }
    };
    if (preloader) {
        let progress = 1;
        let progressST = 100;
        window.onload = function () {
            document.querySelector('.preloader__progress-bar').classList.add('animate');
            progress = 100;
            progressST = 500;
        };
        setTimeout(function () {
            loadingScreen(progress++);
            progress <= 100 && setTimeout(arguments.callee, progressST);
        }, 100);
    } else {
        body.classList.add('activate-home-page');
    }
    loaderLoad = false;
}