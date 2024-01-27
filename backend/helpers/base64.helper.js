const fs = require("fs").promises;
const path = require("path");

const handleBase64Image = async (base64Data) => {
  try {
    // Create 'images' directory if it doesn't exist
    const imagesPath = path.resolve(__dirname, "..", "images");

    try {
      // Check if the directory exists
      await fs.access(imagesPath, fs.constants.F_OK);
    } catch (err) {
      // If the directory doesn't exist, create it
      await fs.mkdir(imagesPath, { recursive: true });
    }

    // Extract the base64 image data (remove the data:image/jpeg;base64 header)
    const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");

    // Convert base64 string to buffer
    const imageBuffer = Buffer.from(base64Image, "base64");

    // Generate a unique filename or use a predefined one
    const filename = `image-${Date.now()}.png`; // Change the extension or format if needed

    // Specify the path to save the image
    const imagePath = path.resolve(imagesPath, filename);

    // Save the buffer data as an image file
    await fs.writeFile(imagePath, imageBuffer);

    console.log("Decoded image saved successfully at:", imagePath);
    return filename;
  } catch (err) {
    console.error("Error saving decoded image:", err);
    throw err;
  }
};

module.exports = { handleBase64Image };
