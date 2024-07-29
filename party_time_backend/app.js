const express = require("express");
const cors = require("cors");

const app = express();
// DB
const conn = require("./db/conn");
//ROUTES
const routes = require("./routes/router");

app.use(cors());
app.use(express.json());

conn();

app.use("/api", routes);

app.listen(3000, function () {
  console.log("http://localhost:3000");
  console.log("Servidor Online!");
});
