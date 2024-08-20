import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../firebase.config";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
function Specialists() {
  const params = useParams();
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setSpecialists(
          docs.filter(
            (item) => item.category.toLowerCase() === params.name.toLowerCase()
          )
        );
      } catch (error) {
        console.error("Error fetching specialists: ", error);
      } finally {
        setLoading(false);
      }
    };

    getSpecialists();
  }, [params.name]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{params.name} Specialists</h1>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <ClipLoader color="#0046C0" loading={loading} size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialists.length > 0 ? (
            specialists.map((spec) => (
              <Link to={`/docinfo/${spec.id}`}>
                <div
                  key={spec.id}
                  className="bg-white cursor-pointer rounded-lg shadow-lg overflow-hidden"
                >
                  <img
                    src={spec.image}
                    alt={spec.name}
                    className="w-full h-48 object-contain"
                  />
                  <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2 text-center">
                      {spec.name}
                    </h2>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No specialists found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Specialists;
