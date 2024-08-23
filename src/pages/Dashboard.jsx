import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../firebase.config"; // Adjust path if needed
import { collection, getDocs } from "firebase/firestore";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Dashboard() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [notApprovedCount, setNotApprovedCount] = useState(0);

  useEffect(() => {
    // Fetch total number of doctors
    const fetchDoctorCount = async () => {
      try {
        const doctorsCollection = collection(FIRESTORE_DB, "doctors");
        const doctorSnapshot = await getDocs(doctorsCollection);
        setDoctorCount(doctorSnapshot.size);
      } catch (error) {
        console.error("Error fetching doctor count: ", error);
      }
    };

    // Fetch total number of approved and not approved appointments
    const fetchAppointmentData = async () => {
      try {
        const appointmentsCollection = collection(
          FIRESTORE_DB,
          "docslot_users"
        );
        const appointmentSnapshot = await getDocs(appointmentsCollection);

        let totalAppointments = 0;
        let totalApproved = 0;
        let totalNotApproved = 0;

        appointmentSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const appointments = data.appointments || [];
          totalAppointments += appointments.length;
          totalApproved += appointments.filter((a) => a.approved).length;
          totalNotApproved += appointments.filter((a) => !a.approved).length;
        });

        setAppointmentCount(totalAppointments);
        setApprovedCount(totalApproved);
        setNotApprovedCount(totalNotApproved);
      } catch (error) {
        console.error("Error fetching appointment data: ", error);
      }
    };

    fetchDoctorCount();
    fetchAppointmentData();
  }, []);

  // Data for pie charts
  const appointmentData = {
    labels: ["Approved", "Not Approved"],
    datasets: [
      {
        data: [approvedCount, notApprovedCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const totalAppointmentsData = {
    labels: ["Total Appointments"],
    datasets: [
      {
        data: [appointmentCount],
        backgroundColor: ["#FFCE56"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const totalDoctorsData = {
    labels: ["Total Doctors"],
    datasets: [
      {
        data: [doctorCount],
        backgroundColor: ["#4BC0C0"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="space-x-8 p-6 flex flex-wrap justify-center items-center min-h-screen bg-gray-100">
      <div className="w-80 h-80 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <Pie data={totalAppointmentsData} />
        <span className="text-xl font-bold mt-4">Total Appointments</span>
      </div>
      <div className="w-80 h-80 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <Pie data={totalDoctorsData} />
        <span className="text-xl font-bold mt-4">Total Doctors</span>
      </div>
      <div className="w-80 h-80 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <Pie data={appointmentData} />
        <span className="text-xl font-bold mt-4">Appointments Status</span>
      </div>
    </div>
  );
}

export default Dashboard;
