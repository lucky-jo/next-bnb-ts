import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  id: "0",
  email: "",
  lastname: "",
  firstname: "",
  birthday: "",
  isLogged: false,
  profileImage: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인한 유저 변경
    setLoggedUser(state, action: PayloadAction<IUser>) {
      state = { ...action.payload, isLogged: true };
      return state;
    },
  },
});

export const userActions = { ...user.actions };

export default user;
