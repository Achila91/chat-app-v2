import React, { useState } from "react";
import "../Css/time_details.css";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

function Timedetails(props) {
  const [id] = useState(props.id);

  const deleteHandler = () => {
    axios
      .delete(
        `https://achila-chat-app-v2.herokuapp.com/detail/time/remove/${id}`
      )
      .then(() => {
        alert("Done");
        window.location.reload(false);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <div className="time-details-body-row">
      <div className="time-details-table-body-date">{props.date}</div>
      <div className="time-details-table-body-time">{props.time}</div>
      <div className="time-details-table-body-link">{props.des}</div>
      <div className="time-details-table-body-action">
        <DeleteIcon color="error" onClick={deleteHandler} />
      </div>
    </div>
  );
}

export default Timedetails;
