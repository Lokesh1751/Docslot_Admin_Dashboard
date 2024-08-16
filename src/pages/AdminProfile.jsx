import React from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase.config"; // Adjust the import path
import { Link } from "react-router-dom";

function AdminProfile({ email, setLoggedIn }) {
  const navigate = useNavigate();

  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Admin Profile
        </h1>
        <div
          className="w-full px-4 py-2 text-sm font-medium text-white text-center bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          to="/"
          onClick={()=>window.location.pathname="/"}
        >
          Log out
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
