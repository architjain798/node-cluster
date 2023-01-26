const express = require("express");
const os = require("os");
const cluster = require("cluster");
const port = 5000;
const cpuNums = os.cpus().length;
console.log(cpuNums);

if (cluster.isPrimary) {
  for (let i = 0; i < cpuNums; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World! from Github");
  });

  app.get("/calculations", (req, res) => {
    let result = 0;
    for (let index = 0; index < 100000000; index++) {
      result += index;
    }
    return res.send({ processId: process.pid, result });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port} and PID ${process.pid}`);
  });
}
