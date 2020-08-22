#! /usr/bin/env node

const chokidar = require("chokidar"); // eslint-disable-line import/no-extraneous-dependencies
const fs = require("fs");
const path = require("path");

chokidar
  .watch(["../movielog/reviews", "../movielog/export"])
  .on("all", (event, sourcePath) => {
    if (event === "add" || event === "change") {
      console.log(event, sourcePath); // eslint-disable-line no-console

      let dest;
      const name = path.basename(sourcePath);

      if (/\/reviews\//.test(sourcePath)) {
        dest = `${__dirname}/content/reviews/${name}`;
      }

      if (/\/export\//.test(sourcePath)) {
        dest = `${__dirname}/content/data/${name}`;
      }

      if (dest) {
        fs.copyFileSync(sourcePath, dest);
      }
    }
  });
