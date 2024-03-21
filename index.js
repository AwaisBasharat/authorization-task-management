const express = require("express");
const app = express();
const port = 8000;
const dbConnection = require("./config/DbConfig");
const AuthRoutes = require("./routes/AuthRoutes");
const crudRoutes = require("./routes/crudRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

require("dotenv").config();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", AuthRoutes);
app.use("/task", crudRoutes);

app.use("/", (req, res) => {
  res.send("CRUD APIS RUNNING!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

dbConnection();
