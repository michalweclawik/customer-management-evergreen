import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { Link, useNavigate } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";
import "./EditCustomer.css";

export default function EditCustomer() {
  const { id } = useParams();
  const { document, error } = useDocument("customers", id);
  const { user } = useAuthContext();
  const [companyName, setCompanyName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAdress] = useState("");
  const [formError, setFormError] = useState(null);
  const { updateDocument, response } = useFirestore("customers");
  const navigate = useNavigate();

  const setValues = async () => {
    const customer = await document;
    setCompanyName(customer.companyName);
    setFirstName(customer.firstName);
    setLastName(customer.lastName);
    setPhoneNumber(customer.phoneNumber);
    setAdress(customer.address);
  };
  useEffect(() => {
    setValues();
  }, [document]);

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

    await updateDocument(document.id, customer);

    if (!response.error) {
      navigate("/");
    }
  };

  return (
    <div className="create-form">
      <h1 className="page-title">Edit customer informations</h1>
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
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
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
        <div className="buttons">
          <button className="btn">Save changes</button>
          <Link to={`/customers/${id}`} className="btn">
            Cancel
          </Link>
        </div>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
