const express = require("express");
var fs = require("fs");
const bodyParser = require("body-parser");
var path = require("path");
const cors = require("cors");
const morganBody = require("morgan-body");
const db = require("./models");
const app = express();

app.use(cors());
db.sequelize.sync();
// db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// create a write stream
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

//error logger
function errHandler(err, req, res, next) {
  console.log(err, "err");
}
app.use(errHandler);

// setup the logger
app.use((req, res, next) => {
  morganBody(app, { noColors: true, stream: accessLogStream });
  next();
});
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Demo application." });
});

require("./routes/user.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
