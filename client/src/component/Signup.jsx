import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import PropTypes from "prop-types";
import "./css/Signup.css";
import { registerValidation } from "../validations/validation";
import toast from "react-hot-toast";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const host = "http://localhost:5000";

const Signup = ({ mode }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerValidation.validate(
        { name, email, password, cpassword },
        { abortEarly: false }
      );
      setErrors({});
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      return;
    }

    await signUpWithGoogle(email, name, password);
  };

  const signUpWithGoogle = async (email, name, password) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      toast.success("Account Created Successfully!");
    } else {
      toast.error("Account not created!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="signup-wrapper"
        style={{
          backgroundColor: mode === "dark" ? "black" : "white",
        }}
      >
        <div
          className="signup-form"
          style={{
            color: mode === "dark" ? "white" : "black",
          }}
        >
          <h2
            className="signup-title"
            style={{
              color: mode === "dark" ? "#6366F1" : "#6366F1",
            }}
          >
            Create An Account
          </h2>

          <form className="w-3/4" onSubmit={handleSubmit}>
            <div className="space-y-4 w-full">
              <div className="signup-form-group items-start flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-md leading-none font-medium"
                  style={{
                    color: mode === "dark" ? "white" : "black",
                  }}
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  className="signup-input"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Enter Your Full Name"
                  name="name"
                  aria-describedby="nameHelp"
                  autoComplete="on"
                  required
                  style={{
                    backgroundColor: mode === "dark" ? "#333" : "white",
                    color: mode === "dark" ? "white" : "black",
                  }}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>

              <div className="signup-form-group items-start flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-md leading-none font-medium"
                  style={{
                    color: mode === "dark" ? "white" : "black",
                  }}
                >
                  Email
                </label>
                <Input
                  type="email"
                  className="signup-input"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  aria-describedby="emailHelp"
                  autoComplete="on"
                  required
                  style={{
                    backgroundColor: mode === "dark" ? "#333" : "white",
                    color: mode === "dark" ? "white" : "black",
                  }}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>

              <div className="signup-form-group relative items-start flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-md font-medium"
                  style={{
                    color: mode === "dark" ? "white" : "black",
                  }}
                >
                  Password
                </label>
                <Input.Password
                  className="signup-input"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  minLength={5}
                  autoComplete="on"
                  required
                  style={{
                    backgroundColor: mode === "dark" ? "#333" : "white",
                    color: mode === "dark" ? "white" : "black",
                  }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </div>

              <div className="signup-form-group items-start flex flex-col gap-2 relative">
                <label
                  htmlFor="cpassword"
                  className="text-md font-medium"
                  style={{
                    color: mode === "dark" ? "white" : "black",
                  }}
                >
                  Confirm Password
                </label>
                <Input.Password
                  className="signup-input"
                  onChange={(e) => setCPassword(e.target.value)}
                  id="cpassword"
                  name="cpassword"
                  placeholder="Enter Again Your Password"
                  minLength={5}
                  autoComplete="on"
                  required
                  style={{
                    backgroundColor: mode === "dark" ? "#333" : "white",
                    color: mode === "dark" ? "white" : "black",
                  }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />

                {errors.cpassword && (
                  <div className="text-danger">{errors.cpassword}</div>
                )}
              </div>
            </div>

            <br />
            <button type="submit" className="signup-submit">
              Sign Up
            </button>
          </form>
          <div className="signup-footer">
            <p className="">
              Already have an account?
              <Link to="/login" className="signup-link">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default Signup;
