import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const WEBHOOK_URL = "/test/webhook";
const PORT = 8081;

app.post(WEBHOOK_URL, (req, res) => {
  const message = req.body.message;
  console.log(message);
  res.send({ message: message });
});

app.get("/webhook/ping", (req, res) => {
  ping().then((response) => response.json().then((data) => res.send(data)));
});

app.get("/webhook/register", (req, res) => {
  registerWebhook()
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.get("/webhook/unregister", (req, res) => {
  unregisterWebhook()
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.listen(PORT, () =>
  console.log("Integrator server is running on port", PORT)
);

const ping = () => {
  const body = {
    urlToRegister: `https://86a9-85-24-120-250.eu.ngrok.io${WEBHOOK_URL}`,
  };

  return fetch("https://pstepien-webhooks-si2023.onrender.com/webhook/ping", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const registerWebhook = () => {
  const body = {
    urlToRegister: `http://127.0.0.1:${PORT}${WEBHOOK_URL}`,
  };

  return fetch("http://127.0.0.1:8080/webhook/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const unregisterWebhook = () => {
  const body = {
    urlToRegister: `http://127.0.0.1:${PORT}${WEBHOOK_URL}`,
  };

  return fetch("http://127.0.0.1:8080/webhook/unregister", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
