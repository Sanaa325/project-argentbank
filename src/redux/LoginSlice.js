import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Création du thunk fetchLogin pour gérer la connexion de l'utilisateur de manière asynchrone
export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      // Envoie une requête POST avec les identifiants de l'utilisateur à l'API pour tenter une connexion
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // Vérifie que la réponse est OK, sinon lance une erreur
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      // Parse la réponse en JSON
      const data = await response.json();
      // Stockage du token après avoir vérifié que la réponse est OK et après avoir parse le JSON
      sessionStorage.setItem("token", data.body.token);

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
};

// Création du slice avec createSlice
const loginSlice = createSlice({
  name: "login", // Nom du slice
  initialState, // État initial du slice
  reducers: {
    resetLoginState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading"; // Met à jour le statut lorsqu'une requête est en cours
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Payload avec a une structure { status, message, body }
        state.token = action.payload.body.token;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed"; // Met à jour le statut en cas d'échec
        state.error = action.error.message; // Stocke le message d'erreur
      });
  },
});

// Exporte l'action pour réinitialiser l'état
export const { resetLoginState } = loginSlice.actions;
// Exporte le reducer pour être utilisé dans le store Redux
export default loginSlice.reducer;