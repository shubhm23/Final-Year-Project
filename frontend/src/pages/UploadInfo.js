import { useState } from "react";
import { SideBar } from "../components/SideBar";
import styles from "./UploadInfo.module.css";

const UploadInfo = () => {
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [image_url, setImageUrl] = useState([]);
  const test = [1, 2, 3];

  const submitHander = (e) => {
    e.preventDefault();
    
  };
  return (
    <div className={styles.PageWrapper}>
      <SideBar active="upload-info" />
      <div className={styles.FormWrapper}>
        <h1>New Patient</h1>
        <form onSubmit={submitHander}>
          <div className={styles.Row1}>
            <label>Fullname</label>
            <input type="text" placeholder="Full Name" />
          </div>
          <div className={styles.Row2}>
            <div>
              <label>Date of Birth</label>
              <input
                type="date"
                placeholder="Date of Birth"
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <label>Gender</label>
              <span>Male</span>
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={(e) => setGender(e.target.value)}
              />
              <span>Female</span>
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.Row3}>
            <label>Email</label>
            <input type="text" placeholder="Email" />
          </div>
          <div className={styles.Row4}>
            <label>Address</label>
            <textarea
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={styles.Row5}>
            <label>Images</label>
            <input
              type="file"
              id="inputImg"
              onChange={(e) => {
                setImageUrl((image_url) => [...image_url, e.target.files[0]]);
              }}
            />
            <div>
              {image_url.length !== 0 &&
                image_url.map((url, i) => {
                  return <img src={URL.createObjectURL(url)} id="outputImg" />;
                })}
            </div>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default UploadInfo;
