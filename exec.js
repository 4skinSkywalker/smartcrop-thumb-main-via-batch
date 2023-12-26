const sharp = require("sharp");
const smartcrop = require("smartcrop-sharp");

const filepath = [ ...process.argv ].pop();
let filename = filepath.split("\\").pop();
const extension = filename.split(".").pop();
filename = filename.slice(0, filename.length - (extension.length + 1));

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

applySmartCrop(filepath, `./playground/${filename}-thumb.${extension}`, 750, 750);
applySmartCrop(filepath, `./playground/${filename}-main.${extension}`, 2000, 750);