import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { onSnapshot, doc } from "firebase/firestore";

export const useDocument = (collect, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // realtime document data
  useEffect(() => {
    const ref = doc(db, collect, id);

    const unsubscribe = onSnapshot(
      ref,
      (doc) => {
        // need to make sure the doc exists & has data
        if (doc.data()) {
          setDocument({ ...doc.data(), id: doc.id });
          setError(null);
        } else {
          setError("No such document exists");
        }
      },
      (err) => {
        console.log(err.message);
        setError("failed to get document");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collect, id]);

  return { document, error };
};
