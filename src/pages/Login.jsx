import React, { useState } from "react";
import { query, where, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase.config"; // Adjust the import path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To handle errors
  const [loggedIn, setLoggedIn] = useState("false"); // Initialize loggedIn state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Query Firestore for the user with the provided email
      const usersRef = collection(FIRESTORE_DB, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Check if the password matches
        if (userData.password === password) {
          // Only allow admin to login
          if (userData.role === "admin") {
            console.log("Admin signed in:", email);
            
            // Update the loggedin field in Firestore
            const userDocRef = doc(FIRESTORE_DB, "users", userDoc.id);
            await updateDoc(userDocRef, { loggedin: "true" });
            
            setLoggedIn("true"); // Set loggedIn to true
            window.location.href = "/dashboard"; // Redirect to admin dashboard
          } else {
            setError("You are not authorized to access this page.");
          }
        } else {
          setError("Invalid email or password.");
        }
      } else {
        setError("User not found.");
      }
    } catch (err) {
      setError("An error occurred during login.");
      console.error("Error signing in:", err);
    }
  };

  return (
    <div       className="flex justify-center items-center h-screen"
    style={{
      backgroundImage:
        "url(https://img.freepik.com/free-photo/blurred-abstract-background-interior-view-looking-out-toward-empty-office-lobby-entrance-doors-glass-curtain-wall-with-frame_1339-6363.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <h1 className="text-center text-3xl text-[#0143BE] items-center  justify-center font-bold flex gap-2">
          DocSlot{" "}
          <img
            src="https://rukminim2.flixcart.com/image/850/1000/xif0q/wall-decoration/j/s/d/doctor-logo-1-doctor-1-6x5in-doctor-logo-decalbazaar-original-imagpnchqbfc3jf2.jpeg?q=90&crop=false"
            alt=""
            className="w-[50px] h-[50px]"
          />
        </h1>
        <h1 className="text-2xl font-bold text-center text-gray-900">
          Admin Dashboard
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500">{error}</p>} 


          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-[#0243BE] border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
