function randomSize (min, max) {
    return Math.floor(min+ + Math.random() * (max + 1 - min));
}

function generateSizesForCanvas(canvas) {
    return { x: randomSize(50, canvas.width - 50), y: randomSize(50, canvas.height - 50)};
}
function drawRandImage (canvas, context, x, y, width, height) {
    var pic = new Image();
    pic.setAttribute('crossOrigin', 'anonymous');
    pic.onload = function () {
        context.drawImage(pic, x, y, width, height);
    }
    pic.src = `https://source.unsplash.com/collection/1127163/${width}x${height}`;
}

function drawImages (canvas, context) {
    var sizes = generateSizesForCanvas(canvas);
    var widths = [sizes.x, sizes.x, canvas.width - sizes.x, canvas.width - sizes.x];
    var heights = [sizes.y, canvas.height - sizes.y, sizes.y, canvas.height - sizes.y];
    var XStartPoints = [0, 0, sizes.x, sizes.x];
    var YStartPoints = [0, sizes.y, 0, sizes.y];
    for (var i=0; i<4; i++) {
        drawRandImage(canvas, context, XStartPoints[i], YStartPoints[i], widths[i], heights[i]);

    }
}
function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.id = 'canvasD';
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    drawImages(canvas, context);
    return canvas;
}
function addCanvasToBody (width, height) {
    document.body.appendChild(createCanvas(width, height));
}