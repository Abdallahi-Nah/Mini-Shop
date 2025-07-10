import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import axios from "axios";
import { User } from "../../context/UserContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const user = useContext(User);
  const token = user.auth.token;

  console.log(user.auth);

  console.log(users);
  
  const fetchUsers = async () => {
    try {
      const usr = await axios.get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(usr.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user deleted", res);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const showUsers = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link
          to={`/dashboard/users/update-user/${user.id}`}
          style={{ textDecoration: "none" }}
        >
          <span>Update</span>
        </Link>
        <span onClick={() => deleteUser(user.id)}>Delete</span>
      </td>
    </tr>
  ));

  return (
    <div className="users-container">
      <div className="divLinkNewUser">
        <Link to={"/dashboard/users/add-user"} className="LinkNewUser">
          New User
        </Link>
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{showUsers}</tbody>
      </table>
    </div>
  );
};

export default Users;
