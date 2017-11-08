var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize",
    screenApply,
    loaderLoad = true,
    screenHeight = screen.height,
    screenWidth = screen.width,
    windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;
if (_detectPhone()) {
    orientationChanger();
    window.addEventListener(orientationEvent, function () {
        orientationChanger();
    }, false);
} else {
    document.querySelector('.landing-container').style.display = 'block';
    document.querySelector('.preloader').style.opacity = 1;
    document.querySelector('.preloader').style.display = 'block';
    document.addEventListener("DOMContentLoaded", loader());
}
window.fbAsyncInit = function() {
    FB.init({
        appId      : '164521490807450',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.10' // use graph api version 2.8
    });

};
function orientationChanger(){
    screenHeight = screen.height;
    screenWidth = screen.width;
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    if (_detectApple()) {
        if(Math.abs(window.orientation) === 90 || Math.abs(window.orientation) === 180) {
            screenApply = true;
        } else {
            screenApply = false;
        }
        if (screenApply) {
            document.querySelector('.landing-container').style.display = 'none';
            if (screenWidth >= 320) {
                document.querySelector('.landing-container').style.display = 'none';
                document.querySelector('.rotate-block').style.display = 'block';
                if (loaderLoad) {
                    document.querySelector('.preloader').style.opacity = 1;
                    document.querySelector('.preloader').style.display = 'block';
                    document.addEventListener("DOMContentLoaded", loader());
                }
            } else {
                document.querySelector('.default-block').style.display = 'block';
            }
        } else {
            if (loaderLoad) {
                document.querySelector('.preloader').style.opacity = 1;
                document.querySelector('.preloader').style.display = 'block';
                document.querySelector('.preloader').classList.add('vertical');
                document.addEventListener("DOMContentLoaded", loader());
            }
            document.querySelector('.rotate-block').style.display = 'none';
            document.querySelector('.landing-container').style.display = 'block';
        }
    } else {
        screenApply = screenWidth > screenHeight;
        if (screenApply) {
            if (screenWidth >= 320) {
                document.querySelector('.landing-container').style.display = 'none';
                document.querySelector('.rotate-block').style.display = 'block';
                if (loaderLoad) {
                    document.querySelector('.preloader').style.opacity = 1;
                    document.querySelector('.preloader').style.display = 'block';
                    document.addEventListener("DOMContentLoaded", loader());
                }
            } else {
                document.querySelector('.default-block').style.display = 'block';
            }
        } else {
            if (loaderLoad) {
                document.querySelector('.preloader').style.opacity = 1;
                document.querySelector('.preloader').style.display = 'block';
                document.querySelector('.preloader').classList.add('vertical');
                document.addEventListener("DOMContentLoaded", loader());
            }
            document.querySelector('.rotate-block').style.display = 'none';
            document.querySelector('.landing-container').style.display = 'block';
        }
    }
}
function loader() {
    var body = document.querySelector('body');
    var preloader = document.querySelector('.preloader');
    var preloader__progress_percent = preloader.querySelector('.preloader__progress-percent');
    var preloader__progress_bar = preloader.querySelector('.preloader__progress-bar');
    window.onload = function () {
        setTimeout(function () {
            if (!preloader) {
                document.querySelector('html').classList.add('loaded');
            }
        }, 1500);
    };
    var loadingScreen = function (progress) {
        if (progress < 100) {
            preloader__progress_percent.textContent = progress + '%';
            preloader__progress_bar.style.width = progress + '%';
            if (progress === 10) {
                document.querySelector('.preloader__progress-bar__rad-grad').classList.add('active');
            }
        } else {
            app.init();
            preloader__progress_percent.textContent = '100%';
            preloader__progress_bar.style.width = '100%';
            document.querySelector('.preloader__progress-bar').classList.add('active-arrow');
            body.classList.add('preloader-off');
            document.querySelector('html').classList.add('loaded');
            setTimeout(function () {
                preloader.style.display = 'none';
            }, 1000);
        }
    };
    if (preloader) {
        var progress = 1;
        var progressST = 100;
        setTimeout(function () {
            loadingScreen(progress++);
            if (progress >= 16 && progress <= 56 || progress >= 61) {
                progressST = 200;
            } else {
                progressST = 100;
            }
            window.onload = function() {
                progress = 100;
            };
            progress <= 100 && setTimeout(arguments.callee, progressST);
        }, 100);
    } else {
        body.classList.add('activate-home-page');
    }
    loaderLoad = false;
}