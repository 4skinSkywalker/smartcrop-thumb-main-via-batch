const sharp = require('sharp');
const smartcrop = require('smartcrop-sharp');

// finds the best crop of src and writes the cropped and resized image to dest.
function applySmartCrop(src, dest, width, height) {
  return smartcrop.crop(src, { width: width, height: height })
    .then(function(result) {
      const crop = result.topCrop;
      return sharp(src)
        .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
        .resize(width, height)
        .toFile(dest);
    })
}

applySmartCrop('./flower.jpg', './flower-thumb.jpg', 750, 750);
applySmartCrop('./flower.jpg', './flower-main.jpg', 2000, 750);