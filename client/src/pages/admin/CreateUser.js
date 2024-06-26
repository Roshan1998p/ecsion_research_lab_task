import React, { useState } from "react";
import axios from "axios";
import { EMAIL_REGEX, validateAlphaNumeric } from "../../utils";
import Loader from "../../components/loader";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = "Username is required";
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = "Please enter valid Email";
    }
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const { username, password, email, name } = formData;
    const param = { username, password, email, name };
    setLoading(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users`, param);
      alert("User created successfully");
      setFormData({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? <Loader /> : ""}
      <h1>Create User</h1>
      <div className="form-inner">
        <form onSubmit={onSubmit} className="signup">
          {["name", "email", "username"].map((field) => (
            <div className="field" key={field}>
              <input
                name={field}
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                onChange={handleChange}
                onInput={
                  field === "username" ? validateAlphaNumeric : undefined
                }
                value={formData[field]}
                autoComplete="off"
              />
              {errors[field] && (
                <p className="error-message">{errors[field]}</p>
              )}
            </div>
          ))}
          {["password", "confirmPassword"].map((field) => (
            <div className="field" key={field}>
              <input
                name={field}
                type="password"
                placeholder={
                  field.charAt(0).toUpperCase() +
                  field.slice(1).replace("Password", " password")
                }
                onChange={handleChange}
                value={formData[field]}
                autoComplete="off"
              />
              {errors[field] && (
                <p className="error-message">{errors[field]}</p>
              )}
            </div>
          ))}
          <div className="field btn">
            <div className="btn-layer"></div>
            <input type="submit" value="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
