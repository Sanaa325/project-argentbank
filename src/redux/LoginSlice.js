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

      
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      
      const data = await response.json();
      // Stockage du token après avoir vérifié que la réponse est OK et après avoir parse le JSON
      sessionStorage.setItem("token", data.body.token);

      return data;
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  token: sessionStorage.getItem("token") || null, // Récupère le token du sessionStorage s'il existe, sinon attribue `null` comme valeur par défaut.
  status: "idle", 
  error: null, 
};

// Création du slice avec createSlice
const loginSlice = createSlice({
  name: "login", 
  initialState, 
  reducers: {
    resetLoginState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading"; 
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.token = action.payload.body.token;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed"; // Met à jour le statut en cas d'échec
        state.error = action.error.message; // Stocke le message d'erreur
      });
  },
});


export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;