import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Definition } from "./api";

export interface DefinitionState extends Definition {}

const initialState: DefinitionState = {
  documents: [],
  layout: {},
};

export const definitionSlice = createSlice({
  name: "definition",
  initialState,
  reducers: {
    setDefinition: (state, action: PayloadAction<DefinitionState>) => {
      state.documents = action.payload.documents;
      state.layout = action.payload.layout;
    },
  },
});

export const { setDefinition } = definitionSlice.actions;
export const selectDefinition = (state: RootState) => state.definition;

export default definitionSlice.reducer;
