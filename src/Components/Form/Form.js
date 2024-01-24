import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/UserSlice";

function Form() {
  // Definir les etats 
  const profile = useSelector((state) => state?.user?.profile);
  const [username, setUsername] = useState(profile.userName);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);

  // Récupérer la fonction dispatch et états du slice depuis le store
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page 
    dispatch(updateUserProfile(username));
  };

  return (
    <section className="profile-form-content">
      <h1>Edit user info</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">User name:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="firstName">First name: </label>
          <input disabled
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Last name:</label>
          <input disabled
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>

        {userStatus === "loading" && <p>Loading...</p>}
        {userStatus === "failed" && <p>{userError}</p>}

        <div className="buttons-wrapper">
          <button type="submit" className="profile-form-button">
            Enregistrer
          </button>
          <button
            type="button"
            className="profile-form-button"
            onClick={() => {
              setUsername("");
              setFirstName("");
              setLastName("");
            }}
          >
            {" "}
        
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;