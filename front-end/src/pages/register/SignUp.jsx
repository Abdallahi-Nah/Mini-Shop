"use client";

import Form from "../../components/form/Form";

const SignUp = () => {
  return (
    <Form
      title="Sign Up"
      btnTitle="Register"
      url="http://127.0.0.1:8000/api/register"
      navigateTo="/"
    />
  );
};

export default SignUp;
