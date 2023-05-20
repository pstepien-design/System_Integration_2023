import express from "express";
import multer from "multer";
import dayjs from "dayjs";

const app = express();

app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploadedFiles");
  },
  filename: (req, file, cb) => {
    const filenameParts = file.originalname.split(".");
    if (filenameParts.length <= 1) {
      cb(new error("File has no extension" + file.originalname));
    }
    const fileExtension = filenameParts.pop();
    const originalFileName = filenameParts.join(".");
    const prefix =
      dayjs(new Date()).format("DD-MM-YYYY") +
      "-" +
      Math.round(Math.random() * 1e9);
    const newFileName = prefix + "___" + originalFileName + "." + fileExtension;
    cb(null, newFileName);
  },
});

const upload = multer({ storage });

app.post("/postFile", upload.single("fileToPost"), (req, res) => {
  console.log(req);
  res.send({ data: req.file });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
