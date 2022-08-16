import React, { useState } from "react";
import "../Css/student_detail.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function SudentDetail(props) {
  const [id] = useState(props.id);

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/detail/student/remove/${id}`)
      .then(() => {
        alert("Done");
        window.location.reload(false);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <div className="student-details-body-row">
      <div className="student-details-table-body-name">{props.name}</div>
      <div className="student-details-table-body-contact">{props.contact}</div>
      <div className="student-details-table-body-email">{props.email}</div>
      <div className="student-details-table-body-password">
        {props.password}
      </div>
      <div className="student-details-table-body-action">
        <DeleteIcon color="error" onClick={deleteHandler} />
      </div>
    </div>
  );
}

export default SudentDetail;
