import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase.config";
import { ClipLoader } from "react-spinners";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { AdminContext } from "../components/context/AdminContext";

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedIn } = useContext(AdminContext);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const usersSnapshot = await getDocs(
          collection(FIRESTORE_DB, "docslot_users")
        );
        const allAppointments = [];

        usersSnapshot.docs.forEach((userDoc) => {
          const userData = userDoc.data();
          const appointmentsArray = userData.appointments || [];

          if (Array.isArray(appointmentsArray)) {
            appointmentsArray.forEach((app) => {
              allAppointments.push({
                id: userDoc.id,
                ...app,
              });
            });
          }
        });

        setAppointments(allAppointments);
      } catch (err) {
        setError("Failed to fetch data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color={"#0143BE"} loading={true} size={50} />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-lg font-semibold text-red-500">{error}</p>
    );

  if (!loggedIn) {
    window.location.pathname = "/";
    return null;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="h-screen overflow-y-scroll">
        {appointments.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            No appointments found.
          </p>
        ) : (
          appointments.map((appointment, index) => (
            <div
              key={index}
              className="mb-6 p-4 border flex justify-between flex-wrap border-gray-200 rounded-lg shadow-sm"
            >
              <p className="mb-2">
                <strong className="text-gray-700">Patient:</strong>{" "}
                {appointment.name}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Date:</strong>{" "}
                {appointment.date}
              </p>
              <p className="mb-2">
                <strong className="text-gray-700">Doctor:</strong>{" "}
                {appointment.selectedDoctor}
              </p>
              <p className="mb-2 flex items-center">
                <strong className="text-gray-700 mr-2">Status:</strong>
                {appointment.approved ? (
                  <span className="text-green-600 flex items-center">
                    <FaCheckCircle className="mr-1" /> Approved
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <FaTimesCircle className="mr-1" /> Pending
                  </span>
                )}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllAppointments;
