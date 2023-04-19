import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static("pages", { type: "text/css" }));

const PORT = 8080;

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "./pages/signup.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
