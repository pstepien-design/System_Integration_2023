import redis from "redis";

const publisher = redis.createClient();

publisher.on("connect", () => {
  console.log("Publisher connected to Redis");
});

await publisher.connect();

setInterval(async () => {
  await publisher.publish("firstChannel", "Hello subscriber!");
}, 1000);
