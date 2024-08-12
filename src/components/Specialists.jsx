import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase.config";

function Specialists() {
  const params = useParams();
  const [specialists, setSpecialists] = useState([]);
  console.log(params.name);

  useEffect(() => {
    const getSpecialists = async () => {
      try {
        // Reference to the 'doctors' collection
        const colRef = collection(FIRESTORE_DB, "doctors");

        // Fetch all documents from the collection
        const querySnapshot = await getDocs(colRef);

        // Map documents to an array of objects
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set state with fetched documents
        setSpecialists(docs);

        // Log documents to console
        console.log(docs);
      } catch (error) {
        console.error("Error fetching specialists: ", error);
      }
    };

    getSpecialists();
  }, [params]);
  console.log(specialists);

  return (
    <div>
      <h1>Specialists</h1>
      {specialists.length > 0 ? (
        specialists.map((spec) => (
          <div key={spec.id}>
            <h2>{spec.name}</h2>
            {/* Render other fields of the specialist here */}
          </div>
        ))
      ) : (
        <p>No specialists found.</p>
      )}
    </div>
  );
}

export default Specialists;
