import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FIRESTORE_DB } from "../firebase.config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function AllDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
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
        setFilteredDoctors(docs);
      } catch (error) {
        console.error("Error fetching doctors: ", error);
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  useEffect(() => {
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900">All Doctors</h1>
        <input
          type="text"
          placeholder="Search Doctor..."
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader color="#0046C0" loading={loading} size={50} />
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
            >
              <Link to={`/docinfo/${doctor.id}`}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full mb-4 "
                />
              </Link>
              <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
              <p className="text-blue-800 text-md font-medium mb-4">
                Specialty: {doctor.specialty}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEdit(doctor.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllDoctors;
