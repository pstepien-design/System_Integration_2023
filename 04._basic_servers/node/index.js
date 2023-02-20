import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Our first Express route" });
});

app.get("/newroute", (req, res) => {
  res.send({ message: "Our second route" });
});

app.listen(8080, () => console.log("Server is running on port", 8080));
