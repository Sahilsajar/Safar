import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import axios from "axios";
import { message } from "antd";

function AdminBus() {
  const [toggleValue, setToggleValue] = useState(false);
  const [busList, setBusList] = useState([]);
  const [currentType, setCurrentType] = useState("addBus");
  const [editID, seteditID] = useState("");

  let currentText = toggleValue ? "Cancel" : "Add Bus";
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3000/api/bus/allbus");
      setBusList(res.data.data);
    };
    fetchData();
  }, []);

  async function deleteBus(id) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/bus/deletebus/${id}`
      );
      window.location.reload();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function editBus(id) {
    seteditID(id);
  }

  return (
    <>
      <BusForm
        toggleValue={toggleValue}
        currentType={currentType}
        editID={editID}
      ></BusForm>
      <div className={toggleValue ? "bg-black" : ""}>
        <div className="d-flex justify-content-between">
          <PageTitle title="Busses" />
          <button
            className="secondary-btn"
            onClick={() => {
              setToggleValue(!toggleValue);
              setCurrentType("addBus");
            }}
          >
            {currentText}
          </button>
        </div>

        <section
          id="busList-parent"
          className="d-flex flex-column justify-content-between"
        >
          {busList.map((bus) => {
            return (
              <div
                key={bus._id}
                className="d-flex justify-content-between bus-detail-styling"
              >
                <div>
                  <h4>{bus.name}</h4>
                  <span className="d-flex gap1">
                    <p>{bus.type}</p>
                    <p>{bus.busNo}</p>
                  </span>
                </div>
                <div className="d-flex gap1 align-items-center">
                  <div></div>
                  <div>
                    <h5>Source</h5>
                    <h5>{bus.departure}</h5>
                    <p>{bus.source}</p>
                  </div>
                  <div>
                    <h5>Destination</h5>
                    <h5>{bus.arrival}</h5>
                    <p>{bus.destination}</p>
                  </div>
                </div>
                <div>
                  <span className="d-flex">
                    <p>INR</p>
                    <h4>{bus.price}</h4>
                  </span>
                  <p>Capacity:{bus.capacity}</p>
                </div>
                <div>
                  <i
                    className="ri-edit-2-line"
                    onClick={() => {
                      setToggleValue(!toggleValue);
                      editBus(bus._id);
                      setCurrentType("editBus");
                    }}
                  ></i>
                  <i
                    className="ri-delete-bin-2-line"
                    onClick={() => deleteBus(bus._id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default AdminBus;
