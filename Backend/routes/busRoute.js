const router = require("express").Router();

const bus = require("../model/busModel");

//Add a bus route
router.post("/add", async (req, res) => {
  try {
    const existingBus = await bus.findOne({ busNo: req.body.busNo });
    if (existingBus) {
      return res.send({
        message: "Bus Already Exist",
        success: false,
      });
    }

    const newBus = new bus(req.body);
    await newBus.save();

    return res.send({
      message: "Bus addes successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error 500",
      success: false,
    });
  }
});

//Get all bus route
router.get("/allbus", async (req, res) => {
  try {
    const buses = await bus.find();
    return res.send({
      message: "All busses",
      success: true,
      data: buses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error 500",
      success: false,
    });
  }
});

//delete a bus
router.delete("/deletebus/:id", async (req, res) => {
  try {
    const existBus = await bus.findByIdAndDelete(req.params.id);
    if (!existBus) {
      return res.send({
        message: "Bus does not exist",
        success: false,
      });
    }

    return res.send({
      message: "Bus Deleted successfully",
      success: true,
      data: existBus,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error 500",
      success: false,
    });
  }
});

//edit

router.put("/editbus/:id", async (req, res) => {
  try {
    const busId = req.params.id;
    const existBus = await bus.findByIdAndUpdate(busId, req.body);
    if (!existBus) {
      return res.send({
        message: "Bus not found",
        success: false,
      });
    }

    return res.send({
      message: "Bus details updated successfully",
      success: true,
      data: existBus,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error 500",
      success: false,
    });
  }
});

module.exports = router;
