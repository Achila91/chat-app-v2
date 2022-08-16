import React from 'react'
import "../Css/nav.css"
import { NavLink, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

function NavBar() {
  const navigate=useNavigate();
  const logOutHandler = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <div
      style={{ width: "100%", display: "flex", backgroundColor: " #284b63" }}
    >
      <div style={{ width: "5%" }}></div>
      <div className="nav-main-container">
        <NavLink
          to="/teacher"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div>STUDENT</div>
        </NavLink>
        <NavLink to="/time" style={{ textDecoration: "none", color: "white" }}>
          <div>TIME</div>
        </NavLink>
        <NavLink
          to="/meeting"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div>MEETING</div>
        </NavLink>
      </div>
      <div style={{ width: "5%",paddingTop:"19px",color:"white" }}><LogoutIcon onClick={ logOutHandler} /></div>
    </div>
  );
}

export default NavBar