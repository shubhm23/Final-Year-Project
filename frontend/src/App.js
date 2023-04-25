import { Routes, Route } from "react-router-dom";
import { RequireToken } from "./components/Auth";
import LoginRegister from "./components/LoginRegister";
import PatientList from "./pages/PatientList";
import UploadInfo from "./pages/UploadInfo";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireToken>
              <PatientList />
            </RequireToken>
          }
        />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/home/patient-list" element={<PatientList />} />
        <Route path="/home/upload-info" element={<UploadInfo />} />
      </Routes>
    </>
  );
};

export default App;
