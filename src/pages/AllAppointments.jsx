import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase.config";
import { ClipLoader } from "react-spinners";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            allAppointments.push({
              id: userDoc.id,
              appointments: appointmentsArray,
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

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
        All Appointments
      </h1>

      {/* Scrollable Container */}
      <div className="h-screen overflow-y-scroll">
        {appointments.length === 0 ? (
          <p className="text-center text-lg font-semibold text-gray-500">
            No appointments found.
          </p>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm"
            >
              {appointment.appointments.map((app, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm mb-4 flex flex-col"
                >
                  <p className="flex items-center mb-2">
                    <strong className="text-gray-700 mr-2">Patient:</strong>{" "}
                    {app.name}
                  </p>
                  <p className="flex items-center mb-2">
                    <strong className="text-gray-700 mr-2">Date:</strong>{" "}
                    {app.date}
                  </p>
                  <p className="flex items-center mb-2">
                    <strong className="text-gray-700 mr-2">Doctor:</strong>{" "}
                    {app.selectedDoctor}
                  </p>
                  <p className="flex items-center mb-2">
                    <strong className="text-gray-700 mr-2">Status:</strong>
                    {app.approved ? (
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
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllAppointments;
