"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./UpdateUser.css";
import Form from "../../components/form/Form";
import { User } from "../../context/UserContext";
import Cookies from "universal-cookie";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const param = useParams();

  const user = useContext(User);
  const token = user.auth.token;

  const fetchOneUser = async () => {
    try {
      const user = await axios.get(
        `http://127.0.0.1:8000/api/user/showbyid/${param.userId}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      setName(user.data[0].name);
      setEmail(user.data[0].email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOneUser();
  }, []);

  return (
    <Form
      title="Update User"
      btnTitle="Update"
      n={name}
      em={email}
      url={`http://127.0.0.1:8000/api/user/update/${param.userId}`}
      navigateTo="/dashboard/users"
      token={token}
    />
  );
};

export default UpdateUser;
