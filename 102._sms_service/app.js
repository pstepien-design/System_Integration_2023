import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/send_sms", async (req, res) => {
  const API_KEY = process.env.SERVICE_API_KEY;
  const phoneNumber = req.body.phone_number;
  const message = req.body.message;

  if (phoneNumber && message) {
    const smsFormData = new FormData();

    smsFormData.append("sms_to_phone", phoneNumber);
    smsFormData.append("sms_message", message);
    smsFormData.append("user_api_key", API_KEY);

    try {
      fetch("https://fiotext.com/send-sms", {
        method: "POST",
        body: smsFormData,
      })
        .then((res) => res.json())
        .then((data) => res.send(data));
    } catch (error) {
      console.log(error);
      res.status(500).send("Error sending SMS");
    }
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
