import React, { useState } from "react";
import "../../style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader";
import { useAuth } from "../../AuthContext";

const Login = () => {
  const { setAuth, auth } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [serviceErrors, setServiceErrors] = useState({});
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const clearErrors = () => {
    setErrors({});
    setServiceErrors({});
  };

  const handleFormToggle = (isLogin) => {
    setIsLogin(isLogin);
    clearErrors();
    setUserData({
      userName: "",
      password: "",
    });
  };

  const handleChange = ({ target }) => {
    clearErrors();
    setUserData({ ...userData, [target.name]: target.value });
  };

  const validate = () => {
    const errors = {};
    if (!userData.userName) errors.userName = "Username is required";
    if (!userData.password) errors.password = "Password is required";
    return errors;
  };

  const handleUserLoginLinkClick = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const { data: usersArray } = await axios.get(
        `${process.env.REACT_APP_API_URL}/users`
      );

      const user = usersArray.find(
        (u) =>
          u.username === userData.userName && u.password === userData.password
      );

      if (user) {
        setAuth({ ...auth, isAuthenticatedUser: true, role: "user" });
        navigate("/user-dashboard", { replace: true });
      } else {
        setServiceErrors({ user: "Invalid username or password" });
      }
    } catch (error) {
      setServiceErrors({ user: "Something went wrong" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLoginLinkClick = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const adminUsername = "admin";
    const adminPassword = "admin123";
    if (
      userData.userName === adminUsername &&
      userData.password === adminPassword
    ) {
      setAuth({ ...auth, isAuthenticatedAdmin: true, role: "admin" });
      navigate("/admin-dashboard", { replace: true });
    } else {
      setServiceErrors({ admin: "Invalid username or password" });
    }
  };

  return (
    <div className="container">
      {loading && <Loader />}
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLogin ? "login" : "signup"}`}>
            {isLogin ? "User Login" : "Admin Login"}
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLogin}
              readOnly
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLogin}
              readOnly
            />
            <label
              htmlFor="login"
              className="slide login"
              onClick={() => handleFormToggle(true)}
            >
              User
            </label>
            <label
              htmlFor="signup"
              className="slide signup"
              onClick={() => handleFormToggle(false)}
            >
              Admin
            </label>
            <div
              className="slider-tab"
              style={{ left: isLogin ? "0%" : "50%" }}
            ></div>
          </div>
          <div className="form-inner">
            <form
              onSubmit={
                isLogin ? handleUserLoginLinkClick : handleAdminLoginLinkClick
              }
              className={isLogin ? "login" : "signup"}
            >
              <div className="field">
                <input
                  name="userName"
                  type="text"
                  placeholder="Username"
                  onChange={handleChange}
                  value={userData.userName}
                />
                {errors.userName && !userData.userName && (
                  <p className="error-message">{errors.userName}</p>
                )}
              </div>
              <div className="field">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={userData.password}
                />
                {(errors.password && !userData.password && (
                  <p className="error-message">{errors.password}</p>
                )) ||
                  (serviceErrors[isLogin ? "user" : "admin"] &&
                    userData.password && (
                      <p className="error-message">
                        {serviceErrors[isLogin ? "user" : "admin"]}
                      </p>
                    ))}
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
