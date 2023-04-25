import { SideBar } from "../components/SideBar";
import styles from "./PatientList.module.css";

const PatientList = () => {
  return (
    <div className={styles.wrapper}>
      <SideBar active="patient-list" />
      <div className={styles.test}>
        
      </div>
    </div>
  );
};

export default PatientList;
