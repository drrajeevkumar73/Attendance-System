import { Payload } from "@prisma/client/runtime/library";
import { createSlice } from "@reduxjs/toolkit";

export interface Hmenu {
 value:boolean
}

const initialState: Hmenu = {
  value:false
};

export const hmenuSlice = createSlice({
  name: "Hamberg Menu",
  initialState,
  reducers: {
    hambegarMenuHandler: (state) => {
        state.value = !state.value;
     
    },
  },
});

export const { hambegarMenuHandler } = hmenuSlice.actions;

export default hmenuSlice.reducer;