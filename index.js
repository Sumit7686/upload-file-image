const express = require("express");
const app = express();
const multer = require("multer");
const PORT = 5000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});
// const upload = multer({ dest: "uploads/" });

app.post("/uploadSingle", upload.single("image"), (req, res) => {
  //   console.log("file info :", req.file);
  res.json({ message: "Image is upload successfully." });
});

app.listen(PORT, () => {
  console.log(`Server has been started on PORT ${PORT}.`);
});
