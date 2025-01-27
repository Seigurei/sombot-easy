import express from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const app = express();

const PORT = process.env.PORT;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const hash = crypto
      .createHash("md5")
      .update(file.originalname + Date.now())
      .digest("hex");
    const extension = path.extname(file.originalname);
    cb(null, `${hash}${extension}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.status(200).send({
    message: "File uploaded successfully",
    file: {
      name: req.file.filename,
      url: fileUrl,
    },
  });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Worlds" });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
