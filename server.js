const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workout',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

const db = require("./models")
// routes
app.use(require("./routes/routes-html.js"));
app.use(require("./routes/routes-api.js"));

// require("./routes/routes-html.js")(app, path)
// require("./routes/routes-api.js")(app)





app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
