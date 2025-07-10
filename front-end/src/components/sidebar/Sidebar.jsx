// import React from "react";
// import { NavLink } from "react-router-dom";
// import "../../pages/dashboard/Dashboard.css";


// const Sidebar = () => {
//   return (
//     <div className="container-sidebar">
//       <h2>Dashboard</h2>
//       <div className="sidebar">
//         <ul>
//           <li>
//             <NavLink
//               activeClassName="active-sidebar"
//               to="/dashboard/users"
//               className="Link"
//             >
//               Users
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/products" className="Link">
//               Products
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


"use client";

import { NavLink } from "react-router-dom";
import "../../pages/dashboard/Dashboard.css";

const Sidebar = () => {
  return (
    <div className="container-sidebar">
      <h2>Dashboard</h2>
      <div className="sidebar">
        <ul>
          <li>
            <NavLink
              to="/dashboard/users"
              className={({ isActive }) =>
                isActive ? "Link active-sidebar" : "Link"
              }
            >
              <span className="link-icon">👥</span>
              <span className="link-text">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/products"
              className={({ isActive }) =>
                isActive ? "Link active-sidebar" : "Link"
              }
            >
              <span className="link-icon">📦</span>
              <span className="link-text">Products</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
