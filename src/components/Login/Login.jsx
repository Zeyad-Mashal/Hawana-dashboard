import React from "react";
import "./Login.css";
const Login = () => {
  return (
    <div className="login">
      <div className="login_container">
        <div className="login_content">
          <h3>اهلا بكم في لوحة تحكم هوانا</h3>
          <div className="login_content_info">
            <input type="email" placeholder="الايميل" />
            <input type="number" placeholder="الباسورد" />
          </div>
          <button>تسجيل</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
