"use client";

import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Form.css";
import { User } from "../../context/UserContext";
import Cookies from "universal-cookie";

const Form = ({ title, btnTitle, n, em, url, navigateTo, token }) => {
  const router = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [accept, setAccept] = useState(false);
  const [acceptName, setAcceptName] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const newUser = useContext(User);
  console.log("new user : ", newUser.auth);

  const cookies = new Cookies();

  useEffect(() => {
    setName(n);
    setEmail(em);
  }, [n, em]);

  const Submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let flag = true;
    setAcceptName(true);
    setAccept(true);

    if (name === "" || password.length < 8 || passwordRepeat !== password) {
      flag = false;
      setIsLoading(false);
      return;
    } else {
      flag = true;
    }

    try {
      if (flag) {
        let res;
        if (url === "http://127.0.0.1:8000/api/register") {
          res = await axios.post(url, {
            name,
            email,
            password,
            password_confirmation: passwordRepeat,
          });
          newUser.setAuth({
            token: res.data.data.token,
            name: res.data.data.user.name,
            email: res.data.data.user.email,
          });
          cookies.set("Bearer", res.data.data.token);
          router(navigateTo);
        } else {
          res = await axios.post(
            url,
            {
              name,
              email,
              password,
              password_confirmation: passwordRepeat,
            },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // cookies.set("Bearer", res.data.data.token);
          router(navigateTo);
        }
        setEmailError("");
        console.log("User registered:", res.data);
        if (res.status === 200) {
          // newUser.setAuth({
          //   token: res.data.data.token,
          //   name: res.data.data.user.name,
          //   email: res.data.data.user.email,
          // });
          // cookies.set("Bearer", res.data.data.token);
          // router(navigateTo);
        }
      }
    } catch (error) {
      console.error("Erreur Laravel:", error.response?.data.errors.email[0]);
      setEmailError(error.response?.data.errors.email[0]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundColor: "white" }}>
      <div className="signup-wrapper">
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="signup-title">{title}</h1>
          </div>

          <form onSubmit={Submit} className="signup-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                placeholder="Name..."
                className="form-input"
              />
              {name === "" && acceptName && (
                <p className="error-message">The name is required</p>
              )}
            </div>

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
              {emailError !== "" && (
                <p className="error-message">{emailError}</p>
              )}
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

            <div className="form-group">
              <label htmlFor="repeat-password" className="form-label">
                Repeat Password
              </label>
              <input
                onChange={(e) => setPasswordRepeat(e.target.value)}
                value={passwordRepeat}
                type="password"
                id="repeat-password"
                placeholder="Repeat Password..."
                className="form-input"
              />
              {passwordRepeat !== password && passwordRepeat !== "" && (
                <p className="error-message">
                  Password Repeat must match Password
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`submit-button ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? `${btnTitle}ing...` : `${btnTitle}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
