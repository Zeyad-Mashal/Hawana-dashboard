import React, { useState } from "react";
import "./Login.css";
import LoginApi from "../../Api/LoginApi.api";
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const LoginAuth = () => {
    if (loginEmail == "" || loginPassword == "") {
      setLoginError("برجاء ملئ جميع خانات التسجيل");
    } else {
      const data = {
        email: loginEmail,
        password: loginPassword,
      };
      LoginApi(data, setLoginLoading, setLoginError);
    }
  };
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_content">
          <h3>اهلا بكم في لوحة تحكم هوانا</h3>
          <div className="login_content_info">
            <input
              type="email"
              placeholder="الايميل"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="الباسورد"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <p className="error">{loginError}</p>
          <button onClick={LoginAuth}>
            {loginLoading ? <span class="loader"></span> : "تسجيل"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
