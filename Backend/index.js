const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
const userRoute = require("./routes/userRoute");
const busRoute = require("./routes/busRoute");

app.use("/api/users", userRoute);
app.use("/api/bus", busRoute);

app.listen(port, () => {
  console.log(`Server is running at port no: ${port}.`);
});
