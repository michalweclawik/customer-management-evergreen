import "./CustomerList.css";
import React from "react";

import { Link } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useFirestore } from "../../hooks/useFirestore";
import $ from "jquery";
import dt from "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-dt/js/dataTables.dataTables.js";
export default function CustomerList({ customers }) {
  const { deleteDocument } = useFirestore("customers");

  React.useEffect(() => {
    // Initialize DataTables
    $("#customer-list").DataTable();
  }, []);

  return (
    <table id="customer-list" className="display">
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
