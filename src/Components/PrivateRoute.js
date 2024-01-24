import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = useSelector((state) => state.login.token);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    }
  }, [token, navigate]);

  return token ? children : null;
}

export default PrivateRoute;