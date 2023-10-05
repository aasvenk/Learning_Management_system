import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: !!localStorage.getItem("hoosier_room_token"),
    token: localStorage.getItem("hoosier_room_token"),
    userInfo: {
      firstName: '',
      lastName: '',
      role: '',
    },
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem("hoosier_room_token", action.payload)
    },
    setUserInfo: (state, action) => {
      let {firstName, lastName, role} = action.payload
      state.userInfo.firstName = firstName
      state.userInfo.lastName = lastName
      state.userInfo.role = role
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setToken, setUserInfo } = userSlice.actions

export default userSlice.reducer