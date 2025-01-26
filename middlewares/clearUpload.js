const fs = require("fs");

const clearSingleFile = (req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode === 201 || res.statusCode === 200) {
      fs.unlinkSync(req.file.path);
    }
  });
  next();
};

const clearMultipleFiles = (req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode === 201 || res.statusCode === 200) {
      req.files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
    }
  });
  next();
};

module.exports = { clearSingleFile, clearMultipleFiles };
