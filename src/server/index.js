const express = require("express");
const path = require("path");
const app = express();

app.use("/", express.static(path.resolve(__dirname, "..", "public")));

app.get("/api", function(req, res) {
  res.send("Hello world!");
});

app.listen(5001, () => {
  console.log("Server app running on port 5001!");
});
