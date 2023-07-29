const sharp = require('sharp');
const PNG_QUALITY = 70; 
const JPEG_QUALITY = 60; 
async function compressItemImage(inputBuffer) {
  try {
    // Use Sharp to compress the image buffer
    const compressedImageBuffer = await sharp(inputBuffer)
      .jpeg({ quality: JPEG_QUALITY , progressive:true, force: false})
      .png({ quality: PNG_QUALITY , progressive:true, force: false})
      .toBuffer();

    return compressedImageBuffer;
  } catch (error) {
    console.error('Error while compressing the image:', error);
    throw error;
  }
}

module.exports = compressItemImage; 