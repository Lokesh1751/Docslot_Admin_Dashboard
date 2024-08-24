import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Bar, Line, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  Title,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PolarAreaController,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PolarAreaController
);

const categories = [
  { id: 1, name: "Cardiology", color: "#0046C0" },
  { id: 2, name: "Dermatology", color: "#0046C0" },
  { id: 3, name: "Gastroenterology", color: "#0046C0" },
  { id: 4, name: "Neurology", color: "#0046C0" },
  { id: 5, name: "Oncology", color: "#0046C0" },
  { id: 6, name: "Pediatrics", color: "#0046C0" },
  { id: 7, name: "Orthopedics", color: "#0046C0" },
  { id: 8, name: "Ophthalmology", color: "#0046C0" },
  { id: 9, name: "Psychiatry", color: "#0046C0" },
];

function Dashboard() {
  const [doctorCount, setDoctorCount] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [doctorCategoryCount, setDoctorCategoryCount] = useState({});
  const [experienceData, setExperienceData] = useState({
    lessThan7Years: 0,
    moreThan7Years: 0,
  });
  const [approvedAppointmentsData, setApprovedAppointmentsData] = useState({
    approved: 0,
    unapproved: 0,
  });
  const [genderData, setGenderData] = useState({
    male: 0,
    female: 0,
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorsCollection = collection(FIRESTORE_DB, "doctors");
        const doctorSnapshot = await getDocs(doctorsCollection);

        let categoryCounts = {};
        let lessThan7Years = 0;
        let moreThan7Years = 0;
        let maleCount = 0;
        let femaleCount = 0;

        doctorSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const category = data.category;
          const experience = data.experience;
          const gender = data.gender;

          if (categoryCounts[category]) {
            categoryCounts[category]++;
          } else {
            categoryCounts[category] = 1;
          }

          if (experience >= 7) {
            moreThan7Years++;
          } else {
            lessThan7Years++;
          }

          if (gender === "Male") {
            maleCount++;
          } else if (gender === "Female") {
            femaleCount++;
          }
        });

        setDoctorCount(doctorSnapshot.size);
        setDoctorCategoryCount(categoryCounts);
        setExperienceData({ lessThan7Years, moreThan7Years });
        setGenderData({ male: maleCount, female: femaleCount });
      } catch (error) {
        console.error("Error fetching doctor data: ", error);
      }
    };

    const fetchAppointmentData = async () => {
      try {
        const appointmentsCollection = collection(
          FIRESTORE_DB,
          "docslot_users"
        );
        const appointmentsSnapshot = await getDocs(appointmentsCollection);

        let approved = 0;
        let unapproved = 0;
        let totalAppointmentsCount = 0;

        appointmentsSnapshot.docs.forEach((doc) => {
          const data = doc.data();

          if (data.appointments && Array.isArray(data.appointments)) {
            totalAppointmentsCount += data.appointments.length;
            data.appointments.forEach((appointment) => {
              if (appointment.approved) {
                approved++;
              } else {
                unapproved++;
              }
            });
          }
        });

        setTotalAppointments(totalAppointmentsCount);
        setApprovedAppointmentsData({ approved, unapproved });
      } catch (error) {
        console.error("Error fetching appointment data: ", error);
      }
    };

    fetchDoctorData();
    fetchAppointmentData();
  }, []);

  const categoryData = {
    labels: Object.keys(doctorCategoryCount),
    datasets: [
      {
        label: "Doctors by Category",
        data: Object.values(doctorCategoryCount),
        backgroundColor: categories.map((category) => category.color),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const experienceDataChart = {
    labels: ["Less than 7 years", "More than 7 years"],
    datasets: [
      {
        label: "Doctor Experience",
        data: [experienceData.lessThan7Years, experienceData.moreThan7Years],
        backgroundColor: ["#0046C0", "#0066CC"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const approvedAppointmentsChart = {
    labels: ["Approved", "Unapproved"],
    datasets: [
      {
        label: "Appointments Status",
        data: [
          approvedAppointmentsData.approved,
          approvedAppointmentsData.unapproved,
        ],
        backgroundColor: ["#0046C0", "#0066CC"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const genderDataChart = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [genderData.male, genderData.female],
        backgroundColor: ["#0046C0", "#0066CC"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const totalDoctorsChart = {
    labels: ["Total Doctors"],
    datasets: [
      {
        label: "Total Doctors",
        data: [doctorCount],
        backgroundColor: ["#0046C0"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  const totalAppointmentsChart = {
    labels: ["Total Appointments"],
    datasets: [
      {
        label: "Total Appointments",
        data: [totalAppointments],
        backgroundColor: ["#0046C0"],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-wrap items-center h-screen justify-center gap-6 p-6 bg-white">
      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-[#fbf9f9]  text-blue-800">
        <h2 className="text-lg font-semibold text-center mb-4">
          Total Doctors
        </h2>
        <PolarArea data={totalDoctorsChart} />
      </div>

      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-[#fbf9f9]  text-blue-800">
        <h2 className="text-lg font-semibold text-center mb-4">
          Doctor Experience
        </h2>
        <Line data={experienceDataChart} />
      </div>
      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-[#fbf9f9]  text-blue-800">
        <h2 className="text-lg font-semibold text-center mb-4">
          Doctor Categories
        </h2>
        <Bar data={categoryData} />
      </div>
      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-[#fbf9f9]  text-blue-800">
        <h2 className="text-lg font-semibold text-center mb-4">
          Approved Appointments
        </h2>
        <Doughnut data={approvedAppointmentsChart} />
      </div>

      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-[#fbf9f9]  text-white">
        <h2 className="text-lg font-semibold text-center mb-4">
          Total Appointments
        </h2>
        <PolarArea data={totalAppointmentsChart} />
      </div>

      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-[#fbf9f9]  text-white">
        <h2 className="text-lg font-semibold text-center mb-4">
          Doctor Gender Distribution
        </h2>
        <Radar data={genderDataChart} />
      </div>
    </div>
  );
}

export default Dashboard;
