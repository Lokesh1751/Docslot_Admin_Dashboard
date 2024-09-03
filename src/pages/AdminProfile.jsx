import React, { useContext } from "react";
import { collection, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase.config";
import { AdminContext } from "../components/context/AdminContext";
function AdminProfile() {
  const { setLoggedIn } = useContext(AdminContext);
  const handleSubmit = async () => {
    try {
      // Query Firestore for the user document
      const usersRef = collection(FIRESTORE_DB, "users");
      const q = query(usersRef); 
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first document
        const userDocRef = doc(FIRESTORE_DB, "users", userDoc.id); // Use the document ID from userDoc

        // Update the loggedin field in Firestore
        await updateDoc(userDocRef, { loggedin: false }); // Set to boolean false, not string "false"
        setLoggedIn(false);

        window.location.href = "/"; // Redirect to home page or login page
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Admin Profile
        </h1>
        <button
          className="w-full px-4 py-2 text-sm font-medium text-white text-center bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={handleSubmit}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default AdminProfile;
