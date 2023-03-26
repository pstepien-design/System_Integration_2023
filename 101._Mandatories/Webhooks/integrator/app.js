import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const WEBHOOK_URL = "http://127.0.0.1:8081/webhooks";
const WEBHOOK_SERVER = "https://pstepien-webhooks-si2023.onrender.com";
const PORT = 8081;

app.post(WEBHOOK_URL, (req, res) => {
  const message = req.body.message;
  console.log(message);
  res.send({ message: message });
});

app.get("/webhook/payment-processed/ping", (req, res) => {
  pingPaymentProcessed().then((response) =>
    response.json().then((data) => res.send(data))
  );
});

app.get("/webhook/payment-processed/register", (req, res) => {
  registerWebhookPaymentProcessed()
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.get("/webhook/payment-processed/unregister", (req, res) => {
  unregisterWebhookPaymentProcessed()
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.get("/webhook/payment-completed/ping", (req, res) => {
  pingPaymentCompleted().then((response) =>
    response.json().then((data) => res.send(data))
  );
});

app.get("/webhook/payment-completed/register", (req, res) => {
  registerWebhookPaymentCompleted()
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.get("/webhook/payment-completed/unregister", (req, res) => {
  unregisterWebhookPaymentCompleted()
    .then((response) => response.json())
    .then((data) => res.send(data));
});

app.listen(PORT, () =>
  console.log("Integrator server is running on port", PORT)
);

const pingPaymentProcessed = () => {
  const body = {
    urlToRegister: WEBHOOK_URL,
  };

  return fetch(`${WEBHOOK_SERVER}/webhook/payment-processed/ping`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const pingPaymentCompleted = () => {
  const body = {
    urlToRegister: WEBHOOK_URL,
  };

  return fetch(`${WEBHOOK_SERVER}/webhook/payment-completed/ping`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const registerWebhookPaymentProcessed = () => {
  const body = {
    urlToRegister: WEBHOOK_URL,
  };

  console.log(body);

  return fetch(`${WEBHOOK_SERVER}/webhook/payment-processed/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const registerWebhookPaymentCompleted = () => {
  const body = {
    urlToRegister: WEBHOOK_URL,
  };

  console.log(body);

  return fetch(`${WEBHOOK_SERVER}/webhook/payment-completed/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const unregisterWebhookPaymentProcessed = () => {
  const body = {
    urlToRegister: WEBHOOK_URL,
  };

  return fetch(`${WEBHOOK_SERVER}/webhook/payment-processed/unregister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

const unregisterWebhookPaymentCompleted = () => {
  const body = {
    urlToRegister: WEBHOOK_URL,
  };

  return fetch(`${WEBHOOK_SERVER}/webhook/payment-completed/unregister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
