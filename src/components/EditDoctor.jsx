import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FIRESTORE_DB } from "../firebase.config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function EditDoctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    age: "",
    category: "",
    contact: "",
    email: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const docRef = doc(FIRESTORE_DB, "doctors", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDoctor(docSnap.data());
          setFormData(docSnap.data());
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(FIRESTORE_DB, "doctors", id);
      await updateDoc(docRef, formData);
      navigate(`/docinfo/${id}`);
    } catch (error) {
      console.error("Error updating doctor details: ", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  if (!doctor)
    return (
      <p className="text-center text-red-600">No doctor found with this ID.</p>
    );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Doctor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputField
            label="Specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
          />
          <InputField
            label="Experience (years)"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
          <InputField
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          <InputField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <InputField
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

const InputField = ({ label, name, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="text-lg font-medium mb-1">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 rounded-md p-2"
    />
  </div>
);

export default EditDoctor;
