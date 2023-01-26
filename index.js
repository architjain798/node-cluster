const express = require("express");
const app = express();
const port = 3000;

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
  console.log(`Example app listening on port ${port}`);
});
