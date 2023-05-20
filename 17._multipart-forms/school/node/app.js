import express from "express";
import cors from "cors";
import multer from "multer";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors());

// const upload = multer({ dest: "./uploads" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const filenameParts = file.originalname.split(".");
    if (filenameParts.length <= 1) {
      cb(new error("File has no extension" + file.originalname));
    }

    const extension = filenameParts.pop();
    const originalFileName = filenameParts.join(".");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    const newFileName =
      uniqueSuffix + "___" + originalFileName + "." + extension;

    cb(null, newFileName);
  },
});

const upload = multer({ storage });

app.post("/form", (req, res) => {
  console.log(req.body);
  delete req.body.password;
  res.send({ data: req.body });
});

app.post("/fileform", upload.single("file"), (req, res) => {
  res.send({ data: req.file });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
