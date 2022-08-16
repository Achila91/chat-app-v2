import React, { useState, useEffect } from "react";
import "../Css/teacher_time_details.css";
import NavBar from "../Components/navBar";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Timedetails from "../Components/time_details";
import axios from "axios";

function TeacherTimeDetails() {
  const [active, isActive] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [found, setFound] = useState("");
  const [teacher] = useState("Udari");
  const [details, setDetails] = useState([]);

  const info = {
    teacher,
    time,
    date,
    description,
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/detail/times")
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const regHandler = () => {
    isActive(!active);
  };
  const sheduleHandler = () => {
    if (
      time === "" ||
      date === "" ||
      description === "" ||
      description === " " ||
      description === "  "
    ) {
      alert("All feilds required!");
    } else {
      axios
        .post("http://localhost:8000/detail/time/save", info)
        .then(() => {
          alert("Done");
          window.location.reload(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const classTime = details.filter((data) => {
    return data.date.toLowerCase().includes(found.toLowerCase());
  });
  return (
    <div className="dash-main-container">
      <NavBar />
      <div className="dash-body-wrapper">
        <div className="dash-body-details-wrapper">
          <div className="dash-body-time-add-wrapper">
            <div
              style={{
                float: "left",
                width: "96%",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Add Time...
            </div>
            <AddBoxIcon
              style={{ float: "right", color: "#284b63de", marginTop: "2px" }}
              onClick={regHandler}
            />
          </div>
          <hr />
          {active && (
            <div className="dash-body-time-add-form">
              <input
                type="date"
                placeholder="Date..."
                className="time-form-inputs"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <input
                type="time"
                placeholder="Time..."
                className="time-form-inputs"
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Meeting Discription..."
                className="time-form-inputs"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <button onClick={sheduleHandler} className="time-form-btn">
                Shedule
              </button>
            </div>
          )}
          <input
            type="date"
            style={{
              width: "25%",
              height: "30px",
              borderRadius: "5px",
              border: "1px solid gray",
              paddingRight: "5px",
              paddingLeft: "5px",
              outline: "none",
              marginTop: "20px",
              marginLeft: "5%",
            }}
            onChange={(e) => {
              setFound(e.target.value);
            }}
          />
          <div className="time-details-table-header">
            <div className="time-details-table-header-date">Date</div>
            <div className="time-details-table-header-time">Time</div>
            <div className="time-details-table-header-link">Discription</div>
            <div className="time-details-table-header-action">Action</div>
          </div>
          <div className="time-details-table-body">
            {classTime.map((detail, index) => (
              <Timedetails
                id={detail._id}
                date={detail.date}
                time={detail.time}
                des={detail.Description}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherTimeDetails;
