
const express = require("express");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");

const mongodb = require("./server/mongo/config");

const api = require("./server/routes/api");
const productApi = require("./server/routes/productApi");
const ShippingDetailApi = require("./server/routes/shippingDetailApi");
const authApi = require("./server/routes/authApi");

const app = express();


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Create link to Angular build directory
var distDir = __dirname + "/dist";
app.use(express.static(distDir));

/* Access Control Allow Origin */
app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );


  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(history({ index: "/index.html" }));

app.use("/api", [api, productApi, authApi, ShippingDetailApi]);

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
