import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import Map from "../Map/Map";
import Arrow from "../../asset/left-arrow.svg";
import { useFirestore } from "../../hooks/useFirestore";
import "./CustomerDetails.css";
import { Link } from "react-router-dom";

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
      <Link to="/" className="go-back">
        <img src={Arrow} alt="go back " />
        <span>Go back</span>
      </Link>
      <div className="customer-description">
        <div className="customer-info">
          <h2>{document.companyName}</h2>
          <h4>{document.firstName}</h4>
          <h4>{document.lastName}</h4>
          <h4>{document.phoneNumber}</h4>
          <h4>{document.address}</h4>
          <Link to={`/edit/${id}`}>Edit information</Link>
          <button className="btn" onClick={handleClick}>
            Remove customer
          </button>
        </div>

        <Map address={document.address} />
      </div>
    </div>
  );
};

export default CustomerDetails;
