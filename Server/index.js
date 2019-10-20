const express = require("express");
const app = express();
const winston = require("winston");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
// Add headers

// app.use(express.static(path.join(__dirname, 'src')));

// Middlewares
// app.set('views', path.join(__dirname, '../Chart-App-client/dist'));
// app.use(express.static(path.join(__dirname, '../Client/node_modules')));

// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

// Client Index.html
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, '../Client/src/index.html'));
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

require("./startups/logging");
require("./startups/db")();
require("./startups/validation")();
require("./startups/route")(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});
