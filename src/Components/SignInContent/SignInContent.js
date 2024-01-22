import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../../redux/LoginSlice";
import { fetchUserProfile } from "../../redux/UserSlice"; // Importez le thunk pour récupérer le profil utilisateur
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

function SignInContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.login.status);
  const error = useSelector((state) => state.login.error);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(credentials));
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(fetchUserProfile()); // Récupérez le profil utilisateur après une connexion réussie
      navigate("/user");
    }
  }, [status, navigate, dispatch]);

  return (
    <section className="sign-in-content">
      <FontAwesomeIcon icon={faUserCircle} />
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
        {error && (
          <div className="error-message">Email ou mot de passe incorrect</div>
        )}
      </form>
    </section>
  );
}

export default SignInContent;