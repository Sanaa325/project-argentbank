import React, { useState } from "react";
import Form from "../Form/Form";
import { useSelector } from "react-redux"; // Obtenir le nom d'utilisateur depuis store Redux

function HeaderAccount() {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditButtonClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };
  const profile = useSelector((state) => state?.user?.profile);
  const temporaryState = useSelector((state) => state);
  console.log(temporaryState)

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {profile ? profile?.firstName+" " +profile?.lastName : "Profile"}{" "} 
      </h1>
      <button className="edit-button" onClick={handleEditButtonClick}>
        Edit Name
      </button>
      {isEditing && <Form />}
    </div>
  );
}

export default HeaderAccount;