require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const path = require("path");

// for accessing hbs file
const index = path.join(__dirname, "./public/views");

// passing data throuh server
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.set("views", index);
app.use(require("./src/routes/routes"));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
