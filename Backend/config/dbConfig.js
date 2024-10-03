const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("database connected!");
});

db.on("error", () => {
  console.log("database connection failed!");
});
