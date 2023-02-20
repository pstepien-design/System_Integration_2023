import express from "express";

const app = express();

app.get("/date", (req, res) => {
  res.send(new Date());
});

app.get("/hisimon", (req, res) => {
  res.send('{"name": "Circus", "location": "Copenhagen"}');
});

app.get("/datefromfastapi", (req, res) => {
  fetch("http://127.0.0.1:8000/date")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.get("/datafromsimon", (req, res) => {
  fetch("https://8b75-195-249-146-101.eu.ngrok.io/pawel")
    .then((response) => response.json())
    .then((data) => res.send(data));
});

const PORT = 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
