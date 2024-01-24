import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk fetchLogin pour gérer la connexion de l'utilisateur
export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (credentials, { rejectWithValue }) => {
    try {
      // Methode POST avec les identifiants de l'utilisateur à l'API pour tenter une connexion
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
      sessionStorage.setItem("token", data.body.token);

      return data;
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  token: sessionStorage.getItem("token") || null, 
  status: "idle", 
  error: null, 
};

// Gestion état authentification (login)
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
        state.status = "failed"; 
        state.error = action.error.message; 
      });
  },
});


export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;