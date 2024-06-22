import { combineReducers } from "@reduxjs/toolkit";

import { slice as appMessages } from "../features/app-messages/slice";
import { slice as tickets } from "../features/tickets/slice";
import { slice as agents } from "../features/agents/slice";

export const rootReducer = combineReducers({
  [appMessages.name]: appMessages.reducer,

  [tickets.name]: tickets.reducer,

  [agents.name]: agents.reducer,
});
