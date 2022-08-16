import React, { useState, useEffect } from "react";
import axios from "axios";

function StudentPage() {
  const name = localStorage.getItem("teacher");
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://chat-app-v2-node-backend.herokuapp.com/detail/meeting/${name}`
      )
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [name]);
  return (
    <div className="dash-main-container">
      <div className="dash-body-wrapper">
        <div className="dash-body-details-wrapper">
          <h3
            style={{
              marginTop: "20px",
              marginBottom: "10px",
              marginLeft: "10%",
            }}
          >
            Your Meeting Details...
          </h3>
          <hr />

          {details.map((detail, index) => (
            <Meeting
              date={detail.date}
              time={detail.time}
              des={detail.Description}
              key={index}
              link={detail.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default StudentPage;

function Meeting(props) {
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (time.toString() >= props.time) {
      setActive(true);
    }
  }, [time, props.time]);

  return (
    <div
      style={{
        width: "50%",
        paddingTop: "10px",
        paddingBottom: "10px",
        margin: "auto",
        backgroundColor: "rgb(228, 228, 228)",
        marginTop: "20px",
        display: "flex",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          width: "80%",
          backgroundColor: "rgb(228, 228, 228)",
          textAlign: "center",
        }}
      >
        <h5>{props.date}</h5>
        <p>{props.des}</p>
        <h2>{props.time}</h2>
      </div>
      <div
        style={{
          width: "20%",
          textAlign: "center",
          paddingRight: "10px",
        }}
      >
        {active ? (
          <a style={{ textDecoration: "none" }} href={props.link}>
            <div
              style={{
                marginTop: "10px",
                backgroundColor: "#284B63",
                paddingTop: "3px",
                paddingBottom: "7px",
                borderRadius: "5px",
                fontStyle: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Join
            </div>
          </a>
        ) : (
          <div
            style={{
              marginTop: "10px",
              backgroundColor: "#284b63de",
              paddingTop: "3px",
              paddingBottom: "7px",
              borderRadius: "5px",
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            Wait
          </div>
        )}
      </div>
    </div>
  );
}
