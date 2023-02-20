import express from "express";

const app = express();

app.get("/date", (req, res) => {
  res.send(new Date());
});

app.get("/datefromfastapi", (req, res) => {
  fetch("http://127.0.0.1:8000/date")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
