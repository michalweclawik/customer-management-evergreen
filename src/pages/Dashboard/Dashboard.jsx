// styles
import "./Dashboard.css";
import { useCollection } from "../../hooks/useCollection";
import CustomerList from "../../components/CustomerList/CustomerList";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function Dashboard() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("customers");

  const customers = documents
    ? documents.filter((document) => document.createdBy.id === user.uid)
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}

      {customers && <CustomerList customers={customers} />}
    </div>
  );
}
