import { Routes, Route, Navigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import Home from "../pages/Home";

const DashboardLayout = () => {
  return (
    <>
      {/* //Protected Routes */}
      <div>
        <div>
          <DashboardHeader />

          <Routes>
            <Route path="/home" element={<Home />} />

            <Route path="*" element={<Navigate replace to="/home" />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
