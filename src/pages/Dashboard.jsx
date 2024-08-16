import React from "react";

function Dashboard() {
  return (
    <div className="space-y-4 p-4 flex flex-col justify-center min-h-screen">
      <div className="bg-yellow-400 text-black p-4 h-32 flex items-center justify-center shadow-lg rounded-lg">
        <span className="text-xl font-bold ">Total Appointments: 78</span>
      </div>
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-300 text-black p-4 h-32 flex items-center justify-center shadow-lg rounded-lg">
        <span className="text-xl font-bold">Total Doctors: 55</span>
      </div>
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-300 text-black p-4 h-32 flex items-center justify-center shadow-lg rounded-lg">
        <span className="text-xl font-bold">Happy Patients: 78</span>
      </div>
    </div>
  );
}

export default Dashboard;
