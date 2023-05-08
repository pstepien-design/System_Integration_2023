import redis from "redis";

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

redisClient.on("connect", () => console.log("Connected to Redis..."));

await redisClient.connect();

redisClient.set("myKey", "myValue");

const value = await redisClient.get("myKey");
console.log(value);
