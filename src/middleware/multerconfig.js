import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/productImages");
  },
  filename: function (req, file, cb) {
    const uniqueName = "image-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage: storage });
