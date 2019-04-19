var isDone = [0, 0, 0, 0];

function drawRandImage (canvas, context, x, y, width, height, index) {
    var pic = new Image();
    pic.setAttribute('crossOrigin', 'anonymous');
    pic.onload = function () {
        context.drawImage(pic, x, y, width, height);
        isDone[index] = 1;
        getQuote(canvas, context, 30);
    }
    pic.src = `https://source.unsplash.com/collection/1127160/${width}x${height}`;
}

function drawImages (canvas, context) {
    var widths = [canvas.width/4, canvas.width/4, canvas.width - canvas.width/4, canvas.width - canvas.width/4];
    var heights = [canvas.height/4, canvas.height - canvas.height/4, canvas.height/4, canvas.height - canvas.height/4];
    var XStartPoints = [0, 0, canvas.width/4, canvas.width/4];
    var YStartPoints = [0, canvas.height/4, 0, canvas.height/4];
    for (var i=0; i<4; i++) {
        drawRandImage(canvas, context, XStartPoints[i], YStartPoints[i], widths[i], heights[i], i);
    }

}
function getQuote(canvas, context, lineHeight ) {
    if (!(isDone[0] && isDone[1] && isDone[2] && isDone[3])) {
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) {
            return;
        }
        if (xhr.status == 200) {

            context.fillStyle = 'rgba(0, 0, 0, 0.7)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font ='bold 26px Arial';
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            drawText(context, canvas, JSON.parse(xhr.responseText)['quoteText'], lineHeight);
        }

    };
    xhr.send();
}
function linesForCanvas (context, text, maxWidth) {
    var words = text.split(' ');
    var lines = [];

    var currentLine = '';

    words.forEach(function (value) {
        var newLine = currentLine + value + ' ';
        var newLineWidth = context.measureText(newLine).width;

        if (newLineWidth > maxWidth) {
            lines.push(currentLine);
            currentLine = value + ' ';
        } else {
            currentLine = newLine;
        }
    });

    lines.push(currentLine);

    return lines;
}

function drawText (context, canvas, text, lineHeight) {
    var maxWidth = canvas.width - 40;
    var maxHeight = canvas.height - 40;

    var centerX = canvas.width / 2;

    var lines = linesForCanvas(context, text, maxWidth);
    var listHeight = lines.length * lineHeight;

    if (listHeight > maxHeight) {
        context.fillText('Text is too big', canvas.height / 2, canvas.width / 2);
        return;
    }

    var marginTop = (maxHeight - listHeight) / 2;

    lines.forEach(function (value){
        context.fillText(value, centerX, marginTop);
        marginTop += lineHeight;
    });
}
function download () {
    var canvas = document.getElementById("canvasD");
    var data = canvas.toDataURL('image/jpeg');
    this.href = data;
}
function createCanvas(width, height) {
    var canvas = document.createElement('canvas');
    canvas.id = "canvasD";
    var context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    drawImages(canvas, context);
    return canvas;
}
function addCanvasToBody (width, height) {
    var button = document.createElement('a');
    button.id = 'downloadButton';
    button.setAttribute('download', 'lab3.jpg');
    button.innerHTML = "Тыкать тут";

    document.body.appendChild(createCanvas(width, height));
    document.body.appendChild(button);
    downloadButton.addEventListener('click', download, true);
}
