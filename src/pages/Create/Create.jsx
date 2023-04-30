import { useState, useEffect } from "react";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./Create.css";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const { user } = useAuthContext();
  const { documents } = useCollection("users");

  // form field values
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
  const [formError, setFormError] = useState(null);
  const { addDocument, response } = useFirestore("customers");
  const navigate = useNavigate();

  // create user values for react-select

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
    };

    const customer = {
      companyName,
      firstName,
      lastName,
      phoneNumber,
      address,
      createdBy,
    };

    await addDocument(customer);

    if (!response.error) {
      navigate("/");
    }
  };
  const phoneRegex = /^[0-9-]{10,}$/;
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (value === "" || phoneRegex.test(value)) {
      setPhoneNumber(value);
    }
  };
  return (
    <div className="create-form">
      <h1 className="page-title">News customer informations</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Company Name</span>
          <input
            required
            type="text"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
          />
        </label>
        <label>
          <span>First Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          ></input>
        </label>

        <label>
          <span>Last Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          ></input>
        </label>
        <label>
          <span>Phone number:</span>
          <input
            required
            type="number"
            onChange={handlePhoneChange}
            value={phoneNumber}
            pattern="[0-9-]{10,}"
          ></input>
        </label>
        <label>
          <span>Adress</span>
          <input
            required
            type="address"
            onChange={(e) => setAdress(e.target.value)}
            value={address}
          ></input>
        </label>

        <button className="btn">Add Customer</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
