import "./CustomerList.css";
import { Link } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useFirestore } from "../../hooks/useFirestore";

export default function CustomerList({ customers }) {
  const { deleteDocument } = useFirestore("customers");

  return (
    <table className="customer-list">
      <thead>
        <tr>
          <th>#</th>
          <th>Company Name</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>More action</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer, index) => (
          <tr key={customer.id}>
            <td>{index + 1}</td>
            <td>{customer.companyName}</td>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>
              <Link to={`/customers/${customer.id}`}>View details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
