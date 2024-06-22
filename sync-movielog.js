#! /usr/bin/env node

const chokidar = require("chokidar");
const fs = require("fs");
const path = require("path");

chokidar
  .watch(["../movielog/reviews", "../movielog/export", "../movielog/viewings"])
  .on("all", (event, sourcePath) => {
    if (event === "add" || event === "change") {
      console.log(event, sourcePath); // eslint-disable-line no-console

      let dest;
      const name = sourcePath.replace(
        /..\/movielog\/(export|reviews|viewings)\//,
        "",
      );

      if (/\/reviews\//.test(sourcePath)) {
        dest = `${__dirname}/content/reviews/${name}`;
      }

      if (/\/viewings\//.test(sourcePath)) {
        dest = `${__dirname}/content/viewings/${name}`;
      }

      if (/\/export\//.test(sourcePath)) {
        dest = `${__dirname}/content/data/${name}`;

        const destPath = path.parse(dest).dir;

        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath);
        }
      }

      if (dest) {
        fs.copyFileSync(sourcePath, dest);
      }
    }
  });
