var App = function () {
    var self = {};
    this._init = function () {
        self.canvas = document.getElementById('canvas');
        self.ctx = self.canvas.getContext('2d');
        self.$canvas = $(self.canvas);
        self.$body = $('body');
        self.inputPhoto = document.getElementById('filePhoto');
        self.image = document.createElement('img');
        self.imageLoader = document.getElementById('filePhoto');

        self.canvasOffset = self.$canvas.offset();
        self.offsetX = self.canvasOffset.left;
        self.offsetY = self.canvasOffset.top;
        self.canvasWidth = self.$canvas.width();
        self.canvasHeight = self.$canvas.height();


        self.draggingImage = false;


        self.angleInDegrees = 0;
        self.scaleSize = 0;




        self.imageLoader.addEventListener('change', handleImage, false);

        self.image.onload = function () {
            self.imageWidth = self.image.width;
            self.imageHeight = self.image.height;
            self.imageRight = self.imageX + self.imageWidth;
            self.imageBottom = self.imageY + self.imageHeight;
            self.firstImageX = self.imageWidth / 2;
            self.firstImageY = self.imageHeight / 2;
            self.imageX = -self.firstImageX;
            self.imageY = -self.firstImageY;

            refreshBorders();

            refreshImg();
        };

        document.getElementById('clockwise').onclick = function () {
            self.angleInDegrees += 15;
            refreshImg();
        };

        document.getElementById('counterclockwise').onclick = function () {
            self.angleInDegrees -= 15;
            refreshImg();
        };


        document.getElementById('scalePlus').onclick = function () {
            scalePlus();
        };
        document.getElementById('scalePlus').onmousedown = function () {
            self.scalePlusInterval = setInterval(scalePlus, 50);
        };
        document.getElementById('scaleMinus').onclick = function () {
            scaleMinus();
        };
        document.getElementById('scaleMinus').onmousedown = function () {
            self.scaleMinusInterval = setInterval(scaleMinus, 50);
        };
        self.$canvas.mousedown(function (e) {
            handleMouseDown(e);
        });
        self.$body.mousemove(function (e) {
            handleMouseMove(e);
        });
        self.$body.mouseup(function (e) {
            handleMouseUp(e);
            clearInterval(self.scaleMinusInterval);
            clearInterval(self.scalePlusInterval);
        });
        self.$canvas.mouseout(function (e) {
            handleMouseOut(e);
        });
    };
    this.inputClick = function () {
        self.inputPhoto.click();
    };
    var scaleMinus = function () {
        self.scaleMinus = -.01;
        self.scaleSize = self.scaleSize + self.scaleMinus;
        refreshScale();
        refreshBorders();
        refreshImgPosition(self.scaleMinus);
        refreshImg();
    };
    var scalePlus = function () {
        self.scalePlus = .01;
        self.scaleSize = self.scaleSize + self.scalePlus;
        refreshScale();
        refreshBorders();
        refreshImgPosition(self.scalePlus);
        refreshImg();
    };
    var refreshScale = function () {
        self.imageWidth = self.image.width + (self.image.width * self.scaleSize);
        self.imageHeight = self.image.height + (self.image.height * self.scaleSize);
    };
    var refreshBorders = function () {
        self.minLeft = 0 - (self.canvasWidth / 2) - (self.imageWidth / 2);
        self.minTop = 0 - (self.canvasHeight / 2) - (self.imageHeight / 2);
        self.maxLeft = (self.canvasWidth / 2) - (self.imageWidth / 2);
        self.maxTop = (self.canvasHeight / 2) - (self.imageHeight / 2);
    };
    var refreshImgPosition = function (scale) {
        self.imageX = self.imageX - ((self.image.width * scale) / 2);
        self.imageY = self.imageY - ((self.image.height * scale) / 2);
        if(self.imageX >= self.maxLeft){
            self.imageX = self.maxLeft;
        }
        if(self.imageY >= self.maxTop){
            self.imageY = self.maxTop;
        }
        if(self.imageX <= self.minLeft){
            self.imageX = self.minLeft;
        }
        if(self.imageY <= self.minTop){
            self.imageY = self.minTop;
        }
    };
    var refreshImg = function () {
        self.ctx.clearRect(0, 0, self.canvasWidth, self.canvasHeight);
        self.ctx.save();
        self.ctx.translate(self.canvasWidth / 2, self.canvasHeight / 2);
        self.ctx.rotate(self.angleInDegrees * Math.PI / 180);
        self.ctx.drawImage(self.image, 0, 0, self.image.width, self.image.height, self.imageX, self.imageY, self.imageWidth, self.imageHeight);
        self.ctx.restore();
    };
    var handleImage = function (e) {
        var reader = new FileReader();
        reader.onload = function (event) {
            self.image.src = event.target.result;
            $('.uploader').hide();
        };
        if(e.target.files.length) {
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    var hitCanvas = function(x, y) {
        return (x > self.offsetX && x < self.offsetX + self.canvasWidth && y > self.offsetY && y < self.offsetY + self.canvasHeight);
    };

    var handleMouseDown = function(e){
        self.startX = parseInt(e.clientX - self.offsetX);
        self.startY = parseInt(e.clientY - self.offsetY);
        self.draggingImage = hitCanvas(parseInt(e.clientX), parseInt(e.clientY));
    };

    var handleMouseUp = function(e){
        self.draggingImage = false;
    };

    var handleMouseOut = function(e){
        /*handleMouseUp(e);*/
    };

    var handleMouseMove = function(e){
        if (self.draggingImage) {

            self.mouseX = parseInt(e.clientX - self.offsetX);
            self.mouseY = parseInt(e.clientY - self.offsetY);

            // move the image by the amount of the latest drag
            self.dx = self.mouseX - self.startX;
            self.dy = self.mouseY - self.startY;
            self.imageX += self.dx;
            self.imageY += self.dy;
            if(self.imageX >= self.maxLeft){
                self.imageX = self.maxLeft;
            }
            if(self.imageY >= self.maxTop){
                self.imageY = self.maxTop;
            }
            if(self.imageX <= self.minLeft){
                self.imageX = self.minLeft;
            }
            if(self.imageY <= self.minTop){
                self.imageY = self.minTop;
            }
            self.imageRight += self.dx;
            self.imageBottom += self.dy;
            // reset the startXY for next time
            self.startX = self.mouseX;
            self.startY = self.mouseY;

            refreshImg();

        }
    };

};
var app = new App();
$(function () {
    app._init();
});