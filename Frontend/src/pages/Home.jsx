import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.users);
  const [buses, setBuses] = useState([]);
  useEffect(() => {
    getBus();
  });

  async function getBus() {
    const res = await axios.get("http://localhost:3000/api/bus/allbus");
    setBuses(res.data.data);
  }

  return (
    <div>
      <div></div>
      <div className="d-flex flex-wrap">
        {buses.map((bus) => {
          return (
            <div className="home-bus-container" key={bus._id}>
              <h2>{bus.name}</h2>
              <hr></hr>
              <div className="d-flex gap5">
                <span>
                  <h4>From</h4>
                  <h5>{bus.source}</h5>
                </span>
                <span>
                  <h4>To</h4>
                  <h5>{bus.destination}</h5>
                </span>
                <span>
                  <h4>Fare</h4>
                  <h5>{bus.price}</h5>
                </span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Journey Date</span>
                <Link to={`/admin/bookings/${bus._id}`}>Book Now</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
