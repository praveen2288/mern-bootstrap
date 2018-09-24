const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const users = require("./routes/users");
const bodyParser = require("body-parser");
const app = express();

// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Mongoose
mongoose.connect("mongodb://localhost/appdb");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("DB Connected!!");
});

// Listen
app.listen(5001, () => {
  console.log("Server app running on port 5001!");
});

// Setup routes
app.use("/", express.static(path.resolve(__dirname, "..", "public")));

app.get("/api", function(req, res) {
  res.send("Hello world! Please call any API!");
});

app.use("/api/users", users);
