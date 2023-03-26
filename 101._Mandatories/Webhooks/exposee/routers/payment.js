import { Router } from "express";
import fetch from "node-fetch";

import { getAllRegisteredUrls } from "../utils/file-operations.js";

const router = new Router();

router.get("/payment/complete", async (req, res) => {
  const allRegisteredUrls = await getAllRegisteredUrls("paymentCompletedUrls");
  allRegisteredUrls.forEach(async (url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Payment completed" }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send POST request to ${url}`);
      }
    } catch (error) {
      return error;
    }
  });
  res.send({ message: "Payment completed webhook has been triggered" });
});

router.get("/payment/process", async (req, res) => {
  const allRegisteredUrls = await getAllRegisteredUrls("paymentProcessedUrls");
  allRegisteredUrls.forEach(async (url) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: "Payment processed" }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send POST request to ${url}`);
      }
    } catch (error) {
      return error;
    }
  });

  res.send({ message: "Payment processed webhook has been triggered" });
});

export default router;
