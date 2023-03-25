import { Router } from "express";
import fetch from "node-fetch";
import {
  addUrlToFile,
  removeUrlFromFile,
  getAllRegisteredUrls,
} from "../utils/file-operations.js";

const router = new Router();

/**
 * @swagger
 * /webhook/register:
 *   post:
 *     summary: Register a webhook URL
 *     description: Use this endpoint to register your url, so it is called whenever the payment is completed or processed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urlToRegister:
 *                 type: string
 *     responses:
 *       200:
 *         description: Webhook registration succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Webhook registration failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/webhook/register", (req, res) => {
  const url = req.body.urlToRegister;
  if (url) {
    addUrlToFile(url)
      .then(() =>
        res.status(200).send({
          message: `Webhook registration succeeded for url: ${url}`,
        })
      )
      .catch(() =>
        res.status(500).send({ message: "Webhook registration failed" })
      );
  } else {
    res.status(500).send({ message: "Webhook registration failed" });
  }
});

/**
 * @swagger
 * /webhook/unregister:
 *   post:
 *     summary: Unregister a webhook URL
 *     description: Use this endpoint to unregister your url. The url will not be called if the payment is completed or processed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urlToRegister:
 *                 type: string
 *     responses:
 *       200:
 *         description: Webhook has been successfully unregistered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Webhook could not be unregistered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
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

/**
 * @swagger
 * /webhook/ping:
 *   post:
 *     summary: Ping a webhook URL
 *     description: Use this endpoint to test whether your url is registered or not. If it is registered, the url will be called with a message. If not, you will receive an error message.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               urlToRegister:
 *                 type: string
 *     responses:
 *       200:
 *         description: Webhook is registered for payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: URL is not registered for webhooks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
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
        message: `${requestedUrl} is registered for payment webhooks`,
      }),
    });
    res.send({});
  } else {
    res.send({ message: `${requestedUrl} is not registered for the webhooks` });
  }
});

export default router;
