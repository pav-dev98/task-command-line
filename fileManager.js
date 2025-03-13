import fs from "node:fs";

export function readFilePromise(file) {
  return new Promise((response, reject) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      return response(data);
    });
  });
}
export function writeFilePromise(file, message) {
  return new Promise((response, reject) => {
    fs.writeFile(file, message, (err) => {
      if (err) {
        return reject(err);
      }
      return response({ message: "succesfully write" });
    });
  });
}

export function ensureFileExist(path) {
  return new Promise((resolve, reject) => {
    fs.access(path, fs.constants.F_OK, (err1) => {
      if (err1) {
        fs.writeFile(path, "[]", (err) => {
          if (err) {
            return reject(err);
          }
          return resolve();
        });
      }
      else{
        return resolve();
      }
    });
  });
}
