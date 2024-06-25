const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const port = process.env.PORT || 5000;
const port = 3001;
const host = "0.0.0.0";

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://cbernard817:CUUmgirVB2DmOKCW@chouchef.2fmbp28.mongodb.net/?retryWrites=true&w=majority&appName=Chouchef"
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  next();
});
app.options("*", (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.sendStatus(200);
});

app.use(express.urlencoded());
app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Portfolio API",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from a Secret Santa between friends.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

app;
const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve);

app.get("/api-docs", swaggerUi.setup(swaggerSpec));

const userRoute = require("./routes/userRoute");
const foodRoute = require("./routes/foodRoute");
const shopRoute = require("./routes/shopRoute");
const detectRoute = require("./routes/DetectRoute");

app.use("/users", userRoute);
app.use("/", foodRoute, shopRoute, detectRoute);

app.listen(port, host);
