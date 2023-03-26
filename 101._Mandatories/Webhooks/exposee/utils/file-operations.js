import * as fs from "fs";

export const addUrlToFile = (url, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./${filename}.txt`, (err, registeredUrls) => {
      if (err) {
        return reject(err);
      }
      const doesUrlExist = registeredUrls
        .toString()
        .split("\n")
        .filter(Boolean);
      if (doesUrlExist.includes(url)) {
        return resolve();
      }
      fs.appendFile(`./${filename}.txt`, `${url}\n`, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
};

export const removeUrlFromFile = (urlToDelete, filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./${filename}.txt`, "utf8", (err, registeredUrls) => {
      if (err) {
        return reject(err);
      }
      const splittedUrls = registeredUrls.split("\n");
      console.log(splittedUrls);
      const updatedUrls = splittedUrls.filter((url) => url !== urlToDelete);
      fs.writeFile(`./${filename}.txt`, updatedUrls.join("\n"), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
};

export const getAllRegisteredUrls = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(`./${filename}.txt`, "utf8", (err, registeredUrlsFromFile) => {
      if (err) {
        return reject(err);
      }
      const registeredUrls = registeredUrlsFromFile.split("\n").filter(Boolean);
      return resolve(registeredUrls);
    });
  });
};
