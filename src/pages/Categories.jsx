import React from "react";
import {
  FaHeartbeat,
  FaBrain,
  FaUserMd,
  FaChild,
  FaBone,
  FaEye,
  FaSyringe,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const categories = [
  { id: 1, name: "Cardiology", icon: <FaHeartbeat color="#FF6F61" /> },
  { id: 2, name: "Dermatology", icon: <FaUserMd color="#6A1B9A" /> },
  { id: 3, name: "Gastroenterology", icon: <FaSyringe color="#FFB74D" /> },
  { id: 4, name: "Neurology", icon: <FaBrain color="#4CAF50" /> },
  { id: 5, name: "Oncology", icon: <FaUserMd color="#00BCD4" /> },
  { id: 6, name: "Pediatrics", icon: <FaChild color="#E91E63" /> },
  { id: 7, name: "Orthopedics", icon: <FaBone color="#FFC107" /> },
  { id: 8, name: "Ophthalmology", icon: <FaEye color="#3F51B5" /> },
  { id: 9, name: "Psychiatry", icon: <FaBrain color="#FF5722" /> },
];

const Categories = () => {
  return (
    <div className="p-6  rounded-lg ">
      <h2 className="text-2xl font-bold mb-4 text-center">Doctor Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link to={`/cat/${category.name}`}>
            <div
              key={category.id}
              className="flex items-center h-[200px] justify-center p-4 cursor-pointer bg-white rounded-lg shadow-lg hover:bg-gray-200 transition ease-in-out duration-300"
            >
              <div className="text-3xl mr-4 font-bold">{category.icon}</div>
              <span className="text-xl font-bold">{category.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
