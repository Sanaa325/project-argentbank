import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Créez le thunk asynchrone fetchUserProfile pour récupérer le profil utilisateur de manière asynchrone
export const fetchUserProfile = createAsyncThunk(
    "user/fetchUserProfile",
    async (_, { rejectWithValue }) => {
      try {
      // Envoie une requête POST avec les identifiants de l'utilisateur à l'API pour obtenir les détails du profil
      const response = await fetch("http://localhost:3001/api/v1/user/profil", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      // Vérifie que la réponse est OK, sinon lance une erreur
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      // Parse la réponse en JSON
      const data = await response.json();

      // Retourne les données du profil utilisateur
      return data;
    } catch (error) {
      // En cas d'erreur, renvoie le message d'erreur pour le gérer dans le slice
      return rejectWithValue(error.message);
    }
  }
);

// État initial du slice
const initialState = {
  token: sessionStorage.getItem("token") || null, // Récupère le token du sessionStorage s'il existe, sinon attribue `null` comme valeur par défaut.
  status: "idle", // status représente l'état actuel de la requête (idle, loading, succeeded, failed)
  error: null, // error sera utilisé pour stocker tout message d'erreur renvoyé par l'API
  profile: {},
};

// Création du slice avec createSlice
const userSlice = createSlice({
  name: "user", // Nom du slice
  initialState, // État initial du slice
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading"; // Met à jour le statut lorsqu'une requête est en cours
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Payload avec a une structure { status, message, body }
        state.token = action.payload.body.token;
        state.profile = action.payload.body.profile;;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed"; // Met à jour le statut en cas d'échec
        state.error = action.error.message; // Stocke le message d'erreur
      });
  },
});

// Exporte l'action pour réinitialiser l'état
export const { resetUserState } = userSlice.actions;
// Exporte le reducer pour être utilisé dans le store Redux
export default userSlice.reducer;