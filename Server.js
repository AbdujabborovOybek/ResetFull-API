const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 8080;
const router = require("./src/Router");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/img", express.static("./src/UserImages"));
app.use("/api", router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
