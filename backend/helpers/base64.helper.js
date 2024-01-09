const fs = require("fs");
const path = require("path");

// Express route handler to handle the base64 data
const handleBase64Image = (base64Data) => {
  // Assuming you're receiving the base64 data in req.body.img
  // Extract the base64 image data (remove the data:image/jpeg;base64 header)
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, "");

  // Convert base64 string to buffer
  const imageBuffer = Buffer.from(base64Image, "base64");

  // Generate a unique filename or use a predefined one
  const filename = `image-${Date.now()}.png`; // Change the extension or format if needed

  // Specify the path to save the image
  const imagePath = path.join(
    path.resolve(path.join(__dirname, "..")),
    "images",
    filename
  );

  // Save the buffer data as an image file
  fs.writeFile(imagePath, imageBuffer, (err) => {
    if (err) {
      console.error("Error saving decoded image:", err);
    } else {
      console.log("Decoded image saved successfully");
    }
  });
  return imagePath;
};

module.exports = { handleBase64Image };
