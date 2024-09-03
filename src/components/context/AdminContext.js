import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState, createContext } from "react";
import { FIRESTORE_DB } from "../../firebase.config";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const userRef = collection(FIRESTORE_DB, "users");
        const querySnapshot = await getDocs(userRef);

        // Assuming you want to check the 'loggedin' field from the first document
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Update the loggedIn state based on the 'loggedin' field
        if (userData.loggedin === true) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchInfo(); // Call the fetchInfo function inside useEffect
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <AdminContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AdminContext.Provider>
  );
};
