import express from "express";
const app = express();

app.use(express.json());

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Pawel Items API example",
    version: "1.0.0",
    description: "Get the insight about how to get, post and delete items",
  },
};
const options = {
  swaggerDefinition,
  apis: ["./routers/*.js"],
};
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

import itemsRouter from "./routers/itemsRouter.js";
app.use(itemsRouter);

app.listen(8080, () => console.log("Server is running on port", 8080));
