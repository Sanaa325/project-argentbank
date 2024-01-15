import React, { useState } from "react";
import Form from "../Form/Form";
import { useSelector } from "react-redux"; // importez useSelector

function HeaderAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditButtonClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };
  // Utilisez useSelector pour obtenir le nom d'utilisateur depuis votre store Redux
  const userName = useSelector((state) => state.user.profile.userName);

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {userName ? userName : "Profile"}{" "}
        {/* Affichez le nom d'utilisateur s'il est disponible, sinon affichez "Profile" */}
      </h1>
      <button className="edit-button" onClick={handleEditButtonClick}>
        Edit Name
      </button>
      {isEditing && <Form />}
    </div>
  );
}

export default HeaderAccount;