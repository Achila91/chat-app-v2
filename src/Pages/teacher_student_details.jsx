import React, { useState, useEffect } from "react";
import "../Css/teacher_student_details.css";
import NavBar from "../Components/navBar";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SudentDetail from "../Components/sudent_detail";
import axios from "axios";

function TeacherStudentDetails() {
  const [active, isActive] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [found, setFound] = useState("");
  const teacherName = localStorage.getItem("username");
  const [details, setDetails] = useState([]);
  const type = "student";

  const info = {
    name,
    contact,
    email,
    teacherName,
    password,
    type,
  };

  console.log(teacherName);
  const regHandler = () => {
    isActive(!active);
  };

  const addHandler = () => {
    if (
      name === "" ||
      contact === "" ||
      email === "" ||
      password === "" ||
      password === " " ||
      password === "  "
    ) {
      alert("All feilds required!");
    } else {
      axios
        .post(
          "https://chat-app-v2-node-backend.herokuapp.com/detail/student/save",
          info
        )
        .then(() => {
          alert("Done");
          window.location.reload(false);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get("https://chat-app-v2-node-backend.herokuapp.com/detail/students")
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const students = details.filter((data) => {
    return (
      data.username.toLowerCase().includes(found.toLowerCase()) ||
      data.contact.toLowerCase().includes(found.toLowerCase()) ||
      data.email.toLowerCase().includes(found.toLowerCase())
    );
  });

  return (
    <div className="dash-main-container">
      <NavBar />
      <div className="dash-body-wrapper">
        <div className="dash-body-details-wrapper">
          <div className="dash-body-student-add-wrapper">
            <div
              style={{
                float: "left",
                width: "96%",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              Add Student...
            </div>
            <AddBoxIcon
              style={{ float: "right", color: "#284b63de", marginTop: "2px" }}
              onClick={regHandler}
            />
          </div>
          <hr />
          {active && (
            <div className="dash-body-student-add-form">
              <input
                type="text"
                placeholder="Student Name..."
                className="student-form-inputs"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Student Contact..."
                className="student-form-inputs"
                onChange={(e) => {
                  setContact(e.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Student Email..."
                className="student-form-inputs"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Password..."
                className="student-form-inputs"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button className="student-form-btn" onClick={addHandler}>
                Add
              </button>
            </div>
          )}
          <input
            type="search"
            placeholder="Search..."
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
          <div className="student-details-table-header">
            <div className="student-details-table-header-name">Name</div>
            <div className="student-details-table-header-contact">Contact</div>
            <div className="student-details-table-header-email">Email</div>
            <div className="student-details-table-header-password">
              Password
            </div>
            <div className="student-details-table-header-action">Action</div>
          </div>
          <div className="student-details-table-body">
            {students.map((student, index) => (
              <SudentDetail
                id={student._id}
                name={student.username}
                contact={student.contact}
                email={student.email}
                password={student.password}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherStudentDetails;
