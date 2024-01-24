import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchUserProfile = createAsyncThunk(  // Thunk fetchUserProfile pour récupérer le profil utilisateur
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateUserProfile = createAsyncThunk( // updateUserProfile pour mettre à jour le nom d'utilisateur
  "user/updateUserProfile",
  async (newUsername, { rejectWithValue, getState }) => {
    try {
      const token = getState().login.token;

      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUsername }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
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
  profile: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.body.token;
        state.profile = action.payload.body;
        console.log(state.profile);
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile.userName = action.payload.body.userName;
        
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.token = null;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;