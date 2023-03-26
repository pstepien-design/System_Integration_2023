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
 * /webhook/payment-processed/register:
 *   post:
 *     tags:
 *        [Payment Processed Webhook]
 *     summary: Register URL for payment processed webhook
 *     description: Use this endpoint to register your url, so it is called whenever the payment processed
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
 *         description: Webhook registration for payment processed succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Webhook registration for payment processed failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/webhook/payment-processed/register", (req, res) => {
  const url = req.body.urlToRegister;
  if (url) {
    addUrlToFile(url, "paymentProcessedUrls")
      .then(() =>
        res.status(200).send({
          message: `Webhook registration for payment processed succeeded for url: ${url}`,
        })
      )
      .catch(() =>
        res.status(500).send({
          message: "Webhook registration for payment processed failed",
        })
      );
  } else {
    res.status(500).send({
      message:
        "Webhook registration for payment processed failed. You need to provide the url",
    });
  }
});

/**
 * @swagger
 * /webhook/payment-processed/unregister:
 *   post:
 *     tags:
 *       [Payment Processed Webhook]
 *     summary: Unregister URL for payment processed webhook
 *     description: Use this endpoint to unregister your url. The url will not be called if the payment is processed
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
 *         description: Webhook for payment processed has been successfully unregistered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Webhook for payment processed could not be unregistered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/webhook/payment-processed/unregister", (req, res) => {
  const url = req.body.urlToRegister;
  if (url) {
    removeUrlFromFile(url, "paymentProcessedUrls")
      .then(() =>
        res.status(200).send({
          message: `Webhook  for payment processed has been successfully unregistered for url: ${url}`,
        })
      )
      .catch(() =>
        res.status(500).send({
          message: "Webhook for payment processed could not be unregistered",
        })
      );
  } else {
    res.status(500).send({
      message:
        "Webhook for payment processed could not be unregistered. You need to provide the url",
    });
  }
});

/**
 * @swagger
 * /webhook/payment-processed/ping:
 *   post:
 *     tags:
 *      [Payment Processed Webhook]
 *     summary: Ping a payment processed webhook URL
 *     description: Use this endpoint to test whether your url is registered for payment processed or not. If it is registered, the url will be called with a message. If not, you will receive an error message.
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
 *         description: URL is registered for payment processed webhook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: URL is not registered for payment processed webhook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/webhook/payment-processed/ping", async (req, res) => {
  const allRegisteredUrls = await getAllRegisteredUrls("paymentProcessedUrls");
  const requestedUrl = req.body.urlToRegister;

  const isUrlRegistered = allRegisteredUrls.find(
    (registeredUrl) => registeredUrl === requestedUrl
  );

  if (isUrlRegistered) {
    try {
      const response = await fetch(requestedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `${requestedUrl} is registered for payment processed webhook`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send POST request to ${requestedUrl}`);
      }

      res.send({
        message: `${requestedUrl} is registered for payment processed and request has been sent`,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: `Failed to send POST request to ${requestedUrl}` });
    }
  } else {
    res.send({
      message: `${requestedUrl} is not registered for for payment processed webhook`,
    });
  }
});

/**
 * @swagger
 * /webhook/payment-completed/register:
 *   post:
 *     tags:
 *        [Payment Completed Webhook]
 *     summary: Register URL for payment completed webhook
 *     description: Use this endpoint to register your url, so it is called whenever the payment completed
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
 *         description: Webhook registration for payment completed succeeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Webhook registration for payment completed failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/webhook/payment-completed/register", (req, res) => {
  const url = req.body.urlToRegister;
  if (url) {
    addUrlToFile(url, "paymentCompletedUrls")
      .then(() =>
        res.status(200).send({
          message: `Webhook registration for payment completed succeeded for url: ${url}`,
        })
      )
      .catch(() =>
        res.status(500).send({
          message: "Webhook registration for payment completed failed",
        })
      );
  } else {
    res.status(500).send({
      message:
        "Webhook registration for payment completed failed. You need to provide the url",
    });
  }
});

/**
 * @swagger
 * /webhook/payment-completed/unregister:
 *   post:
 *     tags:
 *       [Payment Completed Webhook]
 *     summary: Unregister URL for payment completed webhook
 *     description: Use this endpoint to unregister your url. The url will not be called if the payment is completed
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
 *         description: Webhook for payment completed has been successfully unregistered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       500:
 *         description: Webhook for payment completed could not be unregistered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/webhook/payment-completed/unregister", (req, res) => {
  const url = req.body.urlToRegister;
  if (url) {
    removeUrlFromFile(url, "paymentCompletedUrls")
      .then(() =>
        res.status(200).send({
          message: `Webhook  for payment completed has been successfully unregistered for url: ${url}`,
        })
      )
      .catch(() =>
        res.status(500).send({
          message: "Webhook for payment completed could not be unregistered",
        })
      );
  } else {
    res.status(500).send({
      message:
        "Webhook for payment completed could not be unregistered. You need to provide the url",
    });
  }
});

/**
 * @swagger
 * /webhook/payment-completed/ping:
 *   post:
 *     tags:
 *      [Payment Completed Webhook]
 *     summary: Ping a payment completed webhook URL
 *     description: Use this endpoint to test whether your url is registered for payment completed or not. If it is registered, the url will be called with a message. If not, you will receive an error message.
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
 *         description: URL is registered for payment completed webhook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       400:
 *         description: URL is not registered for payment completed webhook
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post("/webhook/payment-completed/ping", async (req, res) => {
  const allRegisteredUrls = await getAllRegisteredUrls("paymentCompletedUrls");
  const requestedUrl = req.body.urlToRegister;

  const isUrlRegistered = allRegisteredUrls.find(
    (registeredUrl) => registeredUrl === requestedUrl
  );

  if (isUrlRegistered) {
    try {
      const response = await fetch(requestedUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `${requestedUrl} is registered for payment completed webhook`,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send POST request to ${requestedUrl}`);
      }

      res.send({
        message: `${requestedUrl} is registered for payment completed and request has been sent`,
      });
    } catch (error) {
      res
        .status(500)
        .send({ message: `Failed to send POST request to ${requestedUrl}` });
    }
  } else {
    res.send({
      message: `${requestedUrl} is not registered for for payment completed webhook`,
    });
  }
});

export default router;
