import { NavLink } from "react-router-dom";

// styles & images
import "./Sidebar.css";
import DashboardIcon from "../../asset/dashboard_icon.svg";
import AddIcon from "../../asset/add_icon.svg";

import { useAuthContext } from "../../hooks/useAuthContext";

export default function Sidebar() {
  const { user } = useAuthContext();

  const today = new Date();

  let greeting = "Hello";
  if (today.getHours() > 4 && today.getHours() < 12) {
    greeting = "Good morning";
  } else if (today.getHours() >= 12 && today.getHours() < 18) {
    greeting = "Good afternoon";
  } else if (today.getHours() >= 18 && today.getHours() < 24) {
    greeting = "Good evening";
  }

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="user">
          <p>{greeting} </p>
          <p>{user.displayName}</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to="/">
                <img src={DashboardIcon} alt="dashboard icon" />
                <span>List customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <img src={AddIcon} alt="add icon" />
                <span>Add customer</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
