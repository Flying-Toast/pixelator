var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  imageCanvas.width = window.innerWidth;
  imageCanvas.height = window.innerHeight;
  imageCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  imageCtx.drawImage(image, (window.innerWidth - image.width) / 2, (window.innerHeight - image.height) / 2);
  draw();
});

var image = new Image();
image.src = 'images/toast.png';

var imageCanvas = document.createElement('canvas');
imageCanvas.width = window.innerWidth;
imageCanvas.height = window.innerHeight;
var imageCtx = imageCanvas.getContext('2d');


function averageColor(x, y, width, height) {
  var ar = ag = ab = 0;
  var imageData = imageCtx.getImageData(x, y, width, height);

  for (var i = 0; i < imageData.data.length; i += 4) {
    ar += imageData.data[i];
    ag += imageData.data[i + 1];
    ab += imageData.data[i + 2];
  }

  ar /= imageData.data.length / 4;
  ag /= imageData.data.length / 4;
  ab /= imageData.data.length / 4;
  ar = Math.round(ar);
  ag = Math.round(ag);
  ab = Math.round(ab);

  return ('rgb(' + ar + ',' + ag + ',' + ab + ')');
}


var pixelSize = 50;

function draw() {
  ctx.fillStyle = '#c1c1c1';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  var imageData = imageCtx.getImageData((window.innerWidth - image.width) / 2, (window.innerHeight - image.height) / 2, image.width, image.height);

  for (var row = 0; row < imageData.width; row += pixelSize) {
    for (var column = 0; column < imageData.width; column += pixelSize) {
      ctx.fillStyle = averageColor((window.innerWidth - image.width) / 2 + column, (window.innerHeight - image.height) / 2 + row, pixelSize, pixelSize);
      ctx.fillRect((window.innerWidth - image.width) / 2 + column, (window.innerHeight - image.height) / 2 + row, pixelSize, pixelSize);
    }
  }

  window.requestAnimationFrame(draw);
}

image.addEventListener('load', function() {
  imageCtx.drawImage(image, (window.innerWidth - image.width) / 2, (window.innerHeight - image.height) / 2);

  window.requestAnimationFrame(draw);
});
