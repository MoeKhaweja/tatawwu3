const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    //this is storing the file in the images folder
    if (file.fieldname == "private") {
      callback(null, path.join(__dirname, "private"));
    } else {
      callback(null, path.join(__dirname, "images"));
    }
  },

  filename: (req, file, callback) => {
    //this is just setting a unique filename
    let temp = file.originalname.split(".");
    const filename =
      temp[0] + "-" + crypto.randomBytes(16).toString("hex") + "." + temp[1];
    callback(null, filename);
  },
});

const fields = [
  {
    name: "image",
    maxCount: 1,
  },
  {
    name: "private",
    maxCount: 1,
  },
];

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = { fileStorage, fileFilter, fields };
