import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SideNav from "./components/SideNav";
import Dashboard from "./pages/Dashboard";
import AddDoctor from "./pages/AddDoctor";
import Categories from "./pages/Categories";
import AdminProfile from "./pages/AdminProfile";
import AllAppointments from "./pages/AllAppointments";
import Specialists from "./components/Specialists";
import DoctorInfo from "./components/DoctorInfo";
import EditDoctor from "./components/EditDoctor";
import Login from "./pages/Login";
import AllDoctors from "./pages/AllDoctors";

function App() {
  const currentPath = window.location.pathname;

  return (
    <BrowserRouter>
      <div className="flex justify-between">
        {currentPath !== "/" && <SideNav />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adddoc" element={<AddDoctor />} />
            <Route path="/cat" element={<Categories />} />
            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/allapp" element={<AllAppointments />} />
            <Route path="/cat/:name" element={<Specialists />} />
            <Route path="/docinfo/:id" element={<DoctorInfo />} />
            <Route path="/edit-doctor/:id" element={<EditDoctor />} />
            <Route path="/alldoc" element={<AllDoctors />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
