import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const categories = [
  { id: 1, name: "Cardiology", color: "#FF6F61" },
  { id: 2, name: "Dermatology", color: "#6A1B9A" },
  { id: 3, name: "Gastroenterology", color: "#FFB74D" },
  { id: 4, name: "Neurology", color: "#4CAF50" },
  { id: 5, name: "Oncology", color: "#00BCD4" },
  { id: 6, name: "Pediatrics", color: "#E91E63" },
  { id: 7, name: "Orthopedics", color: "#FFC107" },
  { id: 8, name: "Ophthalmology", color: "#3F51B5" },
  { id: 9, name: "Psychiatry", color: "#FF5722" },
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

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctorsCollection = collection(FIRESTORE_DB, "doctors");
        const doctorSnapshot = await getDocs(doctorsCollection);

        let categoryCounts = {};
        let lessThan7Years = 0;
        let moreThan7Years = 0;

        doctorSnapshot.docs.forEach((doc) => {
          const data = doc.data();
          const category = data.category;
          const experience = data.experience;

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
        });

        setDoctorCount(doctorSnapshot.size);
        setDoctorCategoryCount(categoryCounts);
        setExperienceData({ lessThan7Years, moreThan7Years });
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

          // Check if the appointments array exists
          if (data.appointments && Array.isArray(data.appointments)) {
            totalAppointmentsCount += data.appointments.length;
            // Loop through each appointment in the appointments array
            data.appointments.forEach((appointment) => {
              if (appointment.approved) {
                approved++;
              } else {
                unapproved++;
              }
            });
          }
        });

        console.log("Approved Appointments:", approved); // Debugging line
        console.log("Unapproved Appointments:", unapproved); // Debugging line

        setTotalAppointments(totalAppointmentsCount);
        setApprovedAppointmentsData({ approved, unapproved });
      } catch (error) {
        console.error("Error fetching appointment data: ", error);
      }
    };

    fetchDoctorData();
    fetchAppointmentData();
  }, []);

  // Data for all pie charts
  const categoryData = {
    labels: Object.keys(doctorCategoryCount),
    datasets: [
      {
        data: Object.values(doctorCategoryCount),
        backgroundColor: categories.map((category) => category.color),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const experienceDataChart = {
    labels: ["Less than 7 years", "More than 7 years"],
    datasets: [
      {
        data: [experienceData.lessThan7Years, experienceData.moreThan7Years],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const approvedAppointmentsChart = {
    labels: ["Approved", "Unapproved"],
    datasets: [
      {
        data: [
          approvedAppointmentsData.approved,
          approvedAppointmentsData.unapproved,
        ],
        backgroundColor: ["#4CAF50", "#FF5722"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const totalDoctorsChart = {
    labels: ["Total Doctors"],
    datasets: [
      {
        data: [doctorCount],
        backgroundColor: ["#42A5F5"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const totalAppointmentsChart = {
    labels: ["Total Appointments"],
    datasets: [
      {
        data: [totalAppointments],
        backgroundColor: ["#AB47BC"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-wrap items-center h-screen justify-center gap-6 p-6">
      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold text-center mb-4">
          Total Doctors
        </h2>
        <Pie data={totalDoctorsChart} />
      </div>

      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold text-center mb-4">
          Doctor Experience
        </h2>
        <Pie data={experienceDataChart} />
      </div>

      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold text-center mb-4">
          Approved Appointments
        </h2>
        <Pie data={approvedAppointmentsChart} />
      </div>

      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold text-center mb-4">
          Doctor Categories
        </h2>
        <Pie data={categoryData} />
      </div>

      <div className="flex-1 max-w-xs shadow-lg rounded-lg p-4 bg-white">
        <h2 className="text-lg font-semibold text-center mb-4">
          Total Appointments
        </h2>
        <Pie data={totalAppointmentsChart} />
      </div>
    </div>
  );
}

export default Dashboard;
