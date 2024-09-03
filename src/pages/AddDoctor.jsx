import React, { useContext, useState } from "react";
import {
  FaImage,
  FaUser,
  FaListAlt,
  FaBirthdayCake,
  FaStethoscope,
  FaTachometerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FIRESTORE_DB } from "../firebase.config";
import { AdminContext } from "../components/context/AdminContext";
import { addDoc, collection } from "firebase/firestore";

const categories = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "gastroenterology", label: "Gastroenterology" },
  { value: "neurology", label: "Neurology" },
  { value: "oncology", label: "Oncology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "orthopedics", label: "Orthopedics" },
  { value: "ophthalmology", label: "Ophthalmology" },
  { value: "psychiatry", label: "Psychiatry" },
  { value: "urology", label: "Urology" },
];

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    category: "",
    age: 0,
    specialty: "",
    experience: "",
    contact: "",
    email: "",
    gender: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const { loggedIn } = useContext(AdminContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Handle image preview
    if (name === "image") {
      setImagePreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(FIRESTORE_DB, "doctors"), formData);
      setFormData({
        image: "",
        name: "",
        category: "",
        age: 0,
        specialty: "",
        experience: "",
        contact: "",
        email: "",
        gender: "",
      });
      setImagePreview("");
    } catch (err) {
      console.log(err);
    }
  };
  if (!loggedIn) {
    return (window.location.pathname = "/");
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Add Doctor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 w-full md:w-1/3">
              <label
                htmlFor="image"
                className="block text-gray-600 mb-2 flex items-center"
              >
                <FaImage className="mr-2 text-gray-500" />
                Doctor Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter image URL"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Doctor"
                    className="w-full h-48 object-contain rounded-md shadow-md"
                  />
                </div>
              )}
            </div>
            <div className="w-full md:w-2/3">
              <label
                htmlFor="name"
                className="block text-gray-600 mb-2 flex items-center"
              >
                <FaUser className="mr-2 text-gray-500" />
                Doctor Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter doctor's name"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="category"
                className="block text-gray-600 mb-2 flex items-center"
              >
                <FaListAlt className="mr-2 text-gray-500" />
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="gender"
                className="block text-gray-600 mb-2 flex items-center"
              >
                <FaUser className="mr-2 text-gray-500" />
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="age"
                className="block text-gray-600 mb-2 flex items-center"
              >
                <FaBirthdayCake className="mr-2 text-gray-500" />
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter age"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="specialty"
                className="block text-gray-600 mb-2 flex items-center"
              >
                <FaStethoscope className="mr-2 text-gray-500" />
                Specialty
              </label>
              <input
                type="text"
                id="specialty"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter specialty"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <label
                htmlFor="experience"
                className="block text-gray-600 mb-2 flex items-center"
              >
                <FaTachometerAlt className="mr-2 text-gray-500" />
                Experience (Years)
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter years of experience"
              />
            </div>
            <div className="w-full md:w-1/2">
              <label
                htmlFor="contact"
                className="block text-gray-600 mb-2  items-center"
              >
                <FaPhone className="mr-2 text-gray-500" />
                Contact Number
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Enter contact number"
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block text-gray-600 mb-2 flex items-center"
            >
              <FaEnvelope className="mr-2 text-gray-500" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
