import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FIRESTORE_DB } from "../firebase.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const colRef = collection(FIRESTORE_DB, "doctors");
        const querySnapshot = await getDocs(colRef);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDoctors(docs);
        setFilteredDoctors(docs); // Initialize filteredDoctors with all doctors
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      }
    };

    getDoctors();
  }, []);

  useEffect(() => {
    // Apply search filter whenever search term changes
    const filtered = doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDoctors(filtered);
  }, [search, doctors]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoc(doc(FIRESTORE_DB, "doctors", id));
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
      } catch (error) {
        console.error("Error deleting doctor: ", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-doctor/${id}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">All Doctors</h1>
        <input
          type="text"
          placeholder="Search Doctor..."
          className="p-4 border border-black rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div
        className="grid grid-rows-1 md:grid-rows-2 lg:grid-rows-3 gap-6 cursor-pointer"
        style={{ maxHeight: "100vh", overflowY: "auto" }}
      >
        {filteredDoctors.map((doctor) => (
          <Link
            key={doctor.id}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            to={`/docinfo/${doctor.id}`}
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-[200px] h-[200px] rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
            <p className="text-blue-800 text-lg font-bold mb-2">
              Specialty: {doctor.specialty}
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(doctor.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(doctor.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AllDoctors;
