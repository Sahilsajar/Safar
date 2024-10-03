import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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
      <div>
        {buses.map((bus) => {
          return (
            <div key={bus._id}>
              <h2>{bus.name}</h2>
              <hr></hr>
              <div>
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
              <div>
                <span>Journey Date</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
