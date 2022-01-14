import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import definitionStore from "../features/definition/slice";

export const store = configureStore({
  reducer: {
    definition: definitionStore,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
