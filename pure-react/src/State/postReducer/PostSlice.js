import { createSlice } from '@reduxjs/toolkit'




const initialState = {
  value: 0,
}



export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
    
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { } = postSlice.actions
  
  export default postSlice.reducer