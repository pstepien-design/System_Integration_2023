import * as fs from "fs";

export const addUrlToFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./registeredUrls.txt", (err, registeredUrls) => {
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
      fs.appendFile("./registeredUrls.txt", `${url}\n`, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
};

export const removeUrlFromFile = (urlToDelete) => {
  return new Promise((resolve, reject) => {
    fs.readFile("./registeredUrls.txt", "utf8", (err, registeredUrls) => {
      if (err) {
        return reject(err);
      }
      const splittedUrls = registeredUrls.split("\n");
      console.log(splittedUrls);
      const updatedUrls = splittedUrls.filter((url) => url !== urlToDelete);
      fs.writeFile("registeredUrls.txt", updatedUrls.join("\n"), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
};

export const getAllRegisteredUrls = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      "./registeredUrls.txt",
      "utf8",
      (err, registeredUrlsFromFile) => {
        if (err) {
          return reject(err);
        }
        const registeredUrls = registeredUrlsFromFile
          .split("\n")
          .filter(Boolean);
        return resolve(registeredUrls);
      }
    );
  });
};
