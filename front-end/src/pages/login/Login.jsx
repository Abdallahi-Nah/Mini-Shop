import React, { useContext, useState } from "react";
import Cookies from "universal-cookie";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  const user = useContext(User);

  const cookies = new Cookies();

  console.log(user.auth);

  const Submit = async (e) => {
    e.preventDefault();
    let flag = true;
    setAccept(true);
    if (password.length < 8) {
      flag = false;
      setIsLoading(false);
      return;
    } else {
      flag = true;
    }

    try {
      if (flag) {
        const res = await axios.post("http://127.0.0.1:8000/api/login", {
          email,
          password,
        });
        console.log("User logged:", res.data.data);
        if (res.status === 200) {
          user.setAuth({
            token: res.data.data.token,
            name: res.data.data.user.name,
            email: res.data.data.user.email,
          });
          cookies.set("Bearer", res.data.data.token);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Erreur Laravel:", error.response?.data.errors);
      setEmailErr(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* <div className="signup-div">
        <h1>Log In</h1>
        <form onSubmit={Submit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Email..."
            required
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
              setAccept(true);
            }}
            value={password}
            type="password"
            id="password"
            placeholder="Password..."
          />
          {password.length < 8 && accept && (
            <p className="error">Password must be longer or equal 8 char</p>
          )}
          <button type="submit">Login</button>
        </form>
      </div> */}
      <div className="signup-container" style={{ backgroundColor: "white" }}>
        <div className="signup-wrapper">
          <div className="signup-card">
            <div className="signup-header">
              <h1 className="signup-title">Log In</h1>
            </div>

            <form onSubmit={Submit} className="signup-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  id="email"
                  placeholder="Email..."
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAccept(true);
                  }}
                  value={password}
                  type="password"
                  id="password"
                  placeholder="Password..."
                  className="form-input"
                />
                {password.length < 8 && accept && (
                  <p className="error-message">
                    Password must be longer or equal 8 char
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`submit-button ${isLoading ? "loading" : ""}`}
              >
                {isLoading ? "Logging..." : "Login"}
              </button>
              {emailErr && (
                <p
                  style={{ marginTop: "5px", fontWeight: "bold" }}
                  className="error-message"
                >
                  Email or password incorrect
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
