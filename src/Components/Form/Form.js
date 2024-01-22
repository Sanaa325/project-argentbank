import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../redux/UserSlice";

function Form() {
  // Définition des états locaux pour chaque champ du formulaire
  const profile = useSelector((state) => state?.user?.profile);
  const [username, setUsername] = useState(profile.userName);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);

  // Récupération de la fonction dispatch et des états du slice depuis le store Redux
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  // Gestionnaire d'événements pour la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
    dispatch(updateUserProfile(username)); // Dispatch de l'action avec le nouveau nom d'utilisateur
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
            onChange={(e) => setUsername(e.target.value)} // Mise à jour de l'état local lors du changement de la valeur du champ
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
            onChange={(e) => setFirstName(e.target.value)} // Mise à jour de l'état local lors du changement de la valeur du champ
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
            onChange={(e) => setLastName(e.target.value)} // Mise à jour de l'état local lors du changement de la valeur du champ
          />
        </div>

        {/* Affichage des indications de chargement et des messages d'erreur */}
        {userStatus === "loading" && <p>Loading...</p>}
        {userStatus === "failed" && <p>{userError}</p>}

        <div className="buttons-wrapper">
          <button type="submit" className="profile-form-button">
            Save
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
            {/* Reset les valeurs lors du clic */}
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;