import { Router } from "express";
import fetch from "node-fetch";
import {
  addUrlToFile,
  removeUrlFromFile,
  getAllRegisteredUrls,
} from "../utils/file-operations.js";

const router = new Router();

router.post("/webhook/register", (req, res) => {
  const url = req.body.urlToRegister;
  addUrlToFile(url)
    .then(() =>
      res.status(200).send({
        message: `Webhook registration succeeded for url: ${url}`,
      })
    )
    .catch(() =>
      res.status(500).send({ message: "Webhook registration failed" })
    );
});

router.post("/webhook/unregister", (req, res) => {
  const url = req.body.urlToRegister;
  if (url) {
    removeUrlFromFile(url)
      .then(() =>
        res.status(200).send({
          message: `Webhook has been successfully unregistered for url: ${url}`,
        })
      )
      .catch(() =>
        res.status(500).send({ message: "Webhook could not be unregistered" })
      );
  }
});

router.post("/webhook/ping", async (req, res) => {
  const allRegisteredUrls = await getAllRegisteredUrls();
  const requestedUrl = req.body.urlToRegister;

  const isUrlRegistered = allRegisteredUrls.find(
    (registeredUrl) => registeredUrl === requestedUrl
  );

  if (isUrlRegistered) {
    fetch(requestedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `${requestedUrl} is registered for payment`,
      }),
    });
    res.send({});
  } else {
    res.send({ message: `${requestedUrl} is not registered for the webhooks` });
  }
});

export default router;
