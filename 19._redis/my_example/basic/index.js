import redis from "redis";

const redisClient = redis.createClient();

redisClient.on("error", (err) => {
  console.log("Error " + err);
});

redisClient.on("connect", () => console.log("Connected to Redis..."));

await redisClient.connect();

redisClient.set("firstKey", "firstValue");

const value = await redisClient.get("firstKey");

console.log(value);

// expiring
redisClient.setEx("secondKey", 5, "expiringValue");

const expiringValueInterval = setInterval(async function () {
  const expiringValue = await redisClient.get("secondKey");
  const timeLeft = await redisClient.ttl("secondKey");

  const object = {
    value: expiringValue,
    timeLeft: timeLeft,
  };
  console.log(object);

  if (timeLeft === -2) {
    clearInterval(expiringValueInterval);
  }
}, 1000);

// expiring but keeping alive

redisClient.setEx("thirdKey", 10, "persistingValue");

const persistingValueInterval = setInterval(async function () {
  const expiringValue = await redisClient.get("thirdKey");
  const timeLeft = await redisClient.ttl("thirdKey");

  const object = {
    value: expiringValue,
    timeLeft: timeLeft,
  };
  console.log(object);

  if (timeLeft === 5) {
    await redisClient.persist("thirdKey");
  } else if (timeLeft === -1) {
    clearInterval(persistingValueInterval);
  }
}, 1000);
