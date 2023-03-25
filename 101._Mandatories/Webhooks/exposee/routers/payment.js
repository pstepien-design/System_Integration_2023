import { Router } from "express";
import fetch from "node-fetch";

import { getAllRegisteredUrls } from "../utils/file-operations.js";

const router = new Router();

router.get("/payment/complete", async (req, res) => {
  const allRegisteredUrls = await getAllRegisteredUrls();
  allRegisteredUrls.forEach((url) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Payment completed" }),
    });
  });
  res.send();
});

router.get("/payment/process", async (req, res) => {
  const allRegisteredUrls = await getAllRegisteredUrls();
  allRegisteredUrls.forEach((url) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "Payment processed" }),
    });
  });
  res.send();
});

export default router;
