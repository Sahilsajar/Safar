import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

function BusForm({ toggleValue, currentType, editID }) {
  const [busname, setBusName] = useState("");
  const [busNo, setbusNo] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [journeyDate, setJourneyDate] = useState("");
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [seatsBooked, setSeatsBooked] = useState([]);
  const [busStatus, setBusStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    let busData = {
      name: busname,
      busNo,
      capacity,
      source,
      destination,
      journeyDate,
      type,
      departure,
      arrival,
      price,
      seatsBooked,
      status: busStatus,
    };

    try {
      let res;
      if (currentType === "addBus") {
        res = await axios.post("http://localhost:3000/api/bus/add", busData);
      } else {
        res = await axios.put(
          `http://localhost:3000/api/bus/editbus/${editID}`,
          busData
        );
      }
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  let displayStatus = toggleValue ? "showForm" : "display-none";

  return (
    <div className={`${displayStatus}`}>
      <form
        className="border border-secondary rounded form-style"
        onSubmit={handleSubmit}
      >
        <label className="d-flex label-w">
          Name
          <input
            type="text"
            className="bus-input"
            value={busname}
            onChange={(e) => setBusName(e.target.value)}
            placeholder="Enter bus name"
            required
          />
        </label>
        <label className="d-flex label-w">
          bus No.
          <input
            type="number" // Changed to number input
            className="bus-input"
            value={busNo || ""}
            onChange={(e) => setbusNo(Number(e.target.value))} // Convert to number
            placeholder="Enter bus number"
            required
          />
        </label>
        <label className="d-flex label-w">
          Capacity
          <input
            type="number" // Changed to number input
            className="bus-input"
            value={capacity || ""}
            onChange={(e) => setCapacity(Number(e.target.value))} // Convert to number
            placeholder="Capacity of Bus"
            required
          />
        </label>
        <label className="d-flex label-w">
          Source
          <input
            type="text"
            className="bus-input"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source city"
            required
          />
        </label>
        <label className="d-flex label-w">
          Destination
          <input
            type="text"
            className="bus-input"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination city"
            required
          />
        </label>
        <label className="d-flex label-w">
          Journey Date
          <input
            type="date"
            className="bus-input"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
            placeholder="DDMMYYYY"
            required
          />
        </label>
        <label className="d-flex label-w">
          Departure
          <input
            type="text"
            className="bus-input"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            placeholder="HH:MM"
            required
          />
        </label>
        <label className="d-flex label-w">
          Arrival
          <input
            type="text"
            className="bus-input"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            placeholder="HH:MM"
            required
          />
        </label>
        <label className="d-flex label-w">
          Type of Bus
          <input
            type="text"
            className="bus-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Select"
            required
          />
        </label>

        <label className="d-flex label-w">
          Price
          <input
            type="number" // Changed to number input
            className="bus-input"
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))} // Convert to number
            placeholder="Amount"
            required
          />
        </label>
        {/* <label className="d-flex label-w">
          seatsBooked
          <input
            type="text"
            className="bus-input"
            value={seatsBooked}
            onChange={(e) => setSeatsBooked(e.target.value)}
            placeholder="Booked seat"
          />
        </label>
        <label className="d-flex label-w">
          Status
          <input
            type="text"
            className="bus-input"
            value={busStatus}
            onChange={(e) => setBusStatus(e.target.value)}
            placeholder="Select"
          />
        </label> */}
        <div className="form-btn">
          <button type="submit" className="secondary-btn">
            Submit
          </button>{" "}
          {/* Added type="submit" */}
        </div>
      </form>
    </div>
  );
}

export default BusForm;
