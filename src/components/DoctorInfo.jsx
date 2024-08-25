import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FIRESTORE_DB } from "../firebase.config";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import ClipLoader from "react-spinners/ClipLoader";

function DoctorInfo() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, "doctors", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDoctor(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching doctor details: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        const docRef = doc(FIRESTORE_DB, "doctors", id);
        await deleteDoc(docRef);
        navigate("/"); // Redirect to home or another page after deletion
      } catch (error) {
        console.error("Error deleting doctor: ", error);
      }
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#0046C0" loading={loading} size={50} />
      </div>
    );

  if (!doctor)
    return (
      <p className="text-center text-red-600">No doctor found with this ID.</p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center justify-center min-h-screen md:flex-row">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-[460px] h-[500px]  rounded-xl" // Fixed size with object-cover
        />
        <div className="p-6 flex-1">
          <h1 className="text-4xl font-extrabold text-blue-800 mb-4">
            {doctor.name}
          </h1>
          <p className="text-xl text-blue-700 mb-2">
            Specialty: <span className="font-semibold">{doctor.specialty}</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Experience:{" "}
            <span className="font-semibold">{doctor.experience} years</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Age: <span className="font-semibold">{doctor.age}</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Gender: <span className="font-semibold">{doctor.gender}</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Category: <span className="font-semibold">{doctor.category}</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Contact: <span className="font-semibold">{doctor.contact}</span>
          </p>
          <p className="text-lg text-gray-800 mb-2">
            Email: <span className="font-semibold">{doctor.email}</span>
          </p>
          <h1 className="text-blue-800 font-bold">DashBoard Password :{id}</h1>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to={`/edit-doctor/${id}`}
              className="px-4 py-2 bg-blue-800 text-white rounded-md shadow-md hover:bg-blue-700"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorInfo;
