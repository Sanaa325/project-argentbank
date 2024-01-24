import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; 
import { resetLoginState } from "../../redux/LoginSlice";
import { resetUserState } from "../../redux/UserSlice";
import Logo from "../../Assets/argentBankLogo.png";

function PersonalizedHeader() {
  const dispatch = useDispatch();
  // Utilisez useSelector pour obtenir le nom d'utilisateur depuis Store
  const userName = useSelector((state) => state.user.profile.userName);

  const handleSignOut = () => {
    sessionStorage.removeItem("token"); // supprime token
    dispatch(resetLoginState()); // réinitialise l'état de login dans le store Redux
    dispatch(resetUserState());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to="/user">
          <i className="fa fa-user-circle"></i>
          {userName ? userName : "Profile"}{" "}
          {/* Affichez le surnom s'il est disponible, sinon afficher lien "profile" */}
        </Link>
        <Link className="main-nav-item" to="/" onClick={handleSignOut}>
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </div>
    </nav>
  );
}

export default PersonalizedHeader;