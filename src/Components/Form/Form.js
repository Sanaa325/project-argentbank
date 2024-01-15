import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../../redux/UserSlice";

function Form() {
  // Définition des états locaux pour chaque champ du formulaire
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Récupération de la fonction dispatch et des états du slice depuis le store Redux
  const dispatch = useDispatch();
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  // Gestionnaire d'événements pour la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page lors de la soumission du formulaire
    dispatch(updateUsername(username)); // Dispatch de l'action avec le nouveau nom d'utilisateur
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
            placeholder="Ben_hg"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Mise à jour de l'état local lors du changement de la valeur du champ
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="firstName">First name: </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Ben"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Mise à jour de l'état local lors du changement de la valeur du champ
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Hong"
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