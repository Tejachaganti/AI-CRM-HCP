import { createSlice } from "@reduxjs/toolkit";

const interactionSlice = createSlice({
  name: "interactions",

  initialState: {
    data: [],
  },

  reducers: {
    setInteractions: (state, action) => {
      state.data = action.payload;
    },

    addInteraction: (state, action) => {
      state.data.push(action.payload);
    },

    updateInteraction: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
});

export const {
  setInteractions,
  addInteraction,
  updateInteraction,
} = interactionSlice.actions;

export default interactionSlice.reducer;