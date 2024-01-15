import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Si un token n'est pas présent, il redirigera l'utilisateur vers la page de connexion. Si un token est présent, il rendra les enfants (dans ce cas, <UserPage />).
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