import React from "react";
import "./AddUser.css";
import Form from "../../components/form/Form";
import { User } from "../../context/UserContext";
import Cookies from "universal-cookie";
import { useContext } from "react";

const AddUser = () => {
  const context = useContext(User);
  const token = context.auth.token;

  return (
    <Form
      title="Add User"
      btnTitle="Add"
      url="http://127.0.0.1:8000/api/user/create"
      navigateTo="/dashboard/users"
      token={token}
    />
  );
};

export default AddUser;
