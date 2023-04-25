import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import PatientList from "../pages/PatientList";
import UploadInfo from "../pages/UploadInfo";
import styles from "./SideBar.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "./Auth";

export const SideBar = ({ active }) => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    let token = getToken();
    axios
      .post("http://0.0.0.0:8000/user/me", { token: token })
      .then((response) => {
        setUsername(response.data.username);
        setFullname(response.data.fullname);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className={styles.SideBarWrapper}>
      <div className={styles.SideBarUsername}>{fullname}</div>
      <div className={styles.SideBarFullname}>{username}</div>
      <div className={styles.SideBarEmail}>{email}</div>
      <ul>
        <li className={active == "patient-list" ? styles.active : ""}>
          <NavLink to="/home/patient-list">Patient Information</NavLink>
        </li>
        <li className={active == "upload-info" ? styles.active : ""}>
          <NavLink to="/home/upload-info">New Patient</NavLink>
        </li>
      </ul>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export const SideBarRoutes = () => {
  return (
    <Routes>
      <Route path="/home/patient-list" element={<PatientList />} />
      <Route path="/home/upload-info" element={<UploadInfo />} />
    </Routes>
  );
};
