import express from "express";
import paymentRouter from "./routers/payment.js";
import webhooksRouter from "./routers/webhooks.js";

const app = express();

app.use(express.json());

app.use(webhooksRouter);
app.use(paymentRouter);

const PORT = 8080;
app.listen(PORT, () => console.log("Exposer server is running on port", PORT));
