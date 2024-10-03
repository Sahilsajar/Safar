const mongoose = require("mongoose");

const busSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    busNo: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    journeyDate: {
      type: String,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    arrival: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    seatsBooked: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "Yet to start",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("bus", busSchema);
