import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

const AuthPopup = ({
  isLoginOpen,
  isSignupOpen,
  loginPopupRef,
  handleLogin,
  handleSignup,
  toggleSignup,
  toggleLogin,
  setEmail,
  setPassword,
  setSignupUsername,
  setSignupEmail,
  setSignupPassword,
  setSignupConfirmPassword,
  email,
  password,
  signupUsername,
  signupEmail,
  signupPassword,
  signupConfirmPassword,
  showPassword,
  togglePasswordVisibility,
  setIsForgotOpen,
  handleGoogleResponse,
}) => {
  return (
    <div className="login-popup" ref={loginPopupRef}>
      {isLoginOpen && (
        <>
          <h2>Login</h2>
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleResponse}
              onError={() => console.log("Google login failed")}
            />
          </div>
          <p>or</p>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                className="eye-icon"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            <div className="forgot-password">
              <button
                className="forget-password"
                type="button"
                onClick={() => setIsForgotOpen(true)}
              >
                Forgot password?
              </button>
            </div>
            <button type="submit" className="login-submit">
              Login
            </button>
          </form>
          <p className="signup-link">
            Need to create an account?{" "}
            <span className="signup" onClick={toggleSignup}>
              Signup
            </span>
          </p>
        </>
      )}
      {isSignupOpen && (
        <>
          <h2>Signup</h2>
          <div className="google-login">
            <GoogleLogin
              onSuccess={handleGoogleResponse}
              onError={() => console.log("Google signup failed")}
            />
          </div>
          <p>or</p>
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <i className="fas fa-user"></i>
              <input
                type="text"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button
                className="eye-icon"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
              />
              <button
                className="eye-icon"
                type="button"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
            <button type="submit" className="login-submit">
              Register
            </button>
          </form>
          <p className="signup-link">
            Already have an account?{" "}
            <span className="signup" onClick={toggleLogin}>
              Log in
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPopup;
