import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: localStorage.getItem("token") !== "",
    token: localStorage.getItem("token")
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem("token", action.payload)
    },
    setUserInfo: (state, action) => {
      let {firstName, lastName} = action.payload
      state.userInfo.firstName = firstName
      state.userInfo.lastName = lastName
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer