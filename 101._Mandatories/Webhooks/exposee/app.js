import express from "express";
import paymentRouter from "./routers/payment.js";
import webhooksRouter from "./routers/webhooks.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(webhooksRouter);
app.use(paymentRouter);

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "OpenAPI API for the Webhooks",
    version: "1.0.0",
    description: "A webhooks Express API",
  },
};
const options = {
  swaggerDefinition,
  apis: ["./routers/webhooks.js"],
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

const PORT = 8080;
app.listen(PORT, () => console.log("Exposer server is running on port", PORT));
