import "./CustomerList.css";
import { Link } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useFirestore } from "../../hooks/useFirestore";

export default function CustomerList({ customers }) {
  const { deleteDocument } = useFirestore("customers");

  return (
    <div className="customer-list">
      {customers.length === 0 && <p>No customer yet!</p>}
      {customers.map((customer) => (
        <Link key={customer.id} to={`/customers/${customer.id}`}>
          <h2>{customer.companyName}</h2>
          <h4>{customer.firstName}</h4>
          <h4>{customer.lastName}</h4>
        </Link>
      ))}
    </div>
  );
}
