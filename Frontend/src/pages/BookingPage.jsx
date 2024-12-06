import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";

function BookingPage() {
  const params = useParams();
  const [oneBus, setOneBus] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  useEffect(() => {
    getBusId();
  }, []);
  async function getBusId() {
    const res = await axios.get(
      `http://localhost:3000/api/bus/getbus/${params.id}`
    );
    setOneBus(res.data.body);
  }
  return (
    <section className="d-flex justify-content-between">
      <div className="w400-container m-3">
        <h3>{oneBus.name}</h3>
        <p>
          {oneBus.source} - {oneBus.destination}
        </p>
        <hr></hr>
        <div>
          <p>Date: {oneBus.journneyDate}</p>
          <p>Departure: {oneBus.departure}</p>
          <p>Arrival: {oneBus.arrival}</p>
          <p>Price: {oneBus.price}/-</p>
        </div>
        <div>
          <p>
            Selected Seats:{" "}
            {selectedSeats.map((seat) => {
              return <span>{seat}, </span>;
            })}
          </p>
          <p>
            <b>Price: {selectedSeats.length * oneBus.price}</b>
          </p>
        </div>
      </div>
      <div>
        <SeatSelection
          selectedSeats={selectedSeats}
          setSelectedSeats={setSelectedSeats}
          bus={oneBus}
        ></SeatSelection>
      </div>
    </section>
  );
}

export default BookingPage;
