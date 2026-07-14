import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    hcp_name: "",
    specialty: "",
    interaction_type: "",
    products: "",
    notes: "",
    followup_date: "",
  },

  interactions: [],

  selectedInteraction: null,

  aiResponse: "",

  loading: false,

  error: null,
};

const interactionSlice = createSlice({
  name: "interaction",

  initialState,

  reducers: {

    updateForm(state, action) {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },

    resetForm(state) {
      state.form = initialState.form;
    },

    setInteractions(state, action) {
      state.interactions = action.payload;
    },

    setSelectedInteraction(state, action) {
      state.selectedInteraction = action.payload;
    },

    setAIResponse(state, action) {
      state.aiResponse = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

  },
});

export const {
  updateForm,
  resetForm,
  setInteractions,
  setSelectedInteraction,
  setAIResponse,
  setLoading,
  setError,
} = interactionSlice.actions;

export default interactionSlice.reducer;