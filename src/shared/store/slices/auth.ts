import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TAuthState = {
  username: string;
  password: string;
};

const initialState: TAuthState = {
  username: "",
  password: "",
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authMethod: (state: TAuthState, action: PayloadAction<TAuthState>) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
  },
});
