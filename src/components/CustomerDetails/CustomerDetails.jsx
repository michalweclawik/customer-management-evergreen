import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import Map from "../Map/Map";
import { useFirestore } from "../../hooks/useFirestore";

const CustomerDetails = () => {
  const { id } = useParams();
  const { document, error } = useDocument("customers", id);
  const { deleteDocument } = useFirestore("customers");
  const navigate = useNavigate();
  const handleClick = (e) => {
    deleteDocument(document.id);
    navigate("/");
  };

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="customer-details">
      <h2>{document.companyName}</h2>
      <h4>{document.firstName}</h4>
      <h4>{document.lastName}</h4>
      <h4>{document.phoneNumber}</h4>
      <h4>{document.address}</h4>
      <Map address={document.address} />
      <button className="btn" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
};

export default CustomerDetails;
