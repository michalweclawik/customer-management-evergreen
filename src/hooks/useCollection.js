import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/config";

// firebase import
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

export const useCollection = (collect, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const q = useRef(_query).current;
  const order = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, collect);

    if (q) {
      ref = query(ref, where(...q));
    }
    if (order) {
      ref = query(ref, orderBy(...order));
    }

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("could not fetch the data");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collect, q, order]);

  return { documents, error };
};
