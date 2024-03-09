const { createClient } = require("redis");

const redis_client = createClient({
    password: 'aXqmgBXKOkrnettBViUN3pTmFO5LE5z8',
    socket: {
        host: 'redis-10202.c10.us-east-1-4.ec2.cloud.redislabs.com',
        port: 10202
    }
});

redis_client.connect();

redis_client.on("error", (err) => {
  console.error(`Redis Error 💥 ${err}`);
});

redis_client.on("ready", (message) => {
  console.log(`Redis Ready 💚`);
});

redis_client.on("connect", (message) => {
  console.log(`Redis Connected 💚 `);
});

redis_client.on("reconnecting", (message) => {
  console.log(`Redis Reconnecting 💚`);
});

const checkCacheMiddleware = async (req, res, next) => {
  try {
    console.log("in middleware");
    let {
      query: { taskId: key },
    } = req;

    const redisResp = await redis_client.ping();
    if (!redisResp === "PONG") return next();

    let data = await redis_client.get(`${key}`);
    console.log(
      `Response data from redis for path - ${key} - ${JSON.stringify(data)}`
    );
    if (!data) {
      return next();
    }
    let returnObj = {
      code: 200,
      success: true,
      data: JSON.parse(data),
      message: "Data fetched successfully from redis",
    };
    return res.status(200).json(returnObj);
  } catch (err) {
    console.log(err);
    return next();
  }
};

const storeCache = async (key, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const time = 60 * 60 * 2;
      let cachedData = await redis_client.setEx(key, time, data);
      cachedData ? resolve(true) : reject(false);
    } catch (err) {
      console.error(`Failed to save cache - ${JSON.parse(err)}`);
      reject(err);
    }
  });
};

const clearCache = async (key) => {
  console.log(`clearing cache for - ${key}`);
  return new Promise(async (resolve, reject) => {
    try {
      const data = await redis_client.del(key);
      console.log(`cleared cache for ${key} with data - ${data}`);
      const newObj = {
        data,
        success: true,
      };
      resolve(newObj);
    } catch (err) {
      console.error(
        `Failed to clear cache for key ${key} error - ${JSON.stringify(e)}`
      );
      const newObj = {
        error: e,
        success: false,
      };
      reject(newObj);
    }
  });
};

module.exports = {
  checkCacheMiddleware,
  storeCache,
  clearCache,
};
