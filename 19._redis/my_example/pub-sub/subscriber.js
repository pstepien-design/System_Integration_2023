import redis from "redis";

const subscriber = redis.createClient();

await subscriber.connect();

await subscriber.subscribe("firstChannel", (message, channel) => {
  console.log(`Received the following message from ${channel}: ${message}`);
});
