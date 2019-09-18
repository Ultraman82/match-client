import { createStore, combineReducers, applyMiddleware } from "redux";
import { createForms } from "react-redux-form";
import { Info } from "./info";
import { Noties } from "./noties";
import { Uchats } from "./uchats";
import { Profile } from "./profile";
import { Favorites } from "./favorites";
import { Lusers } from "./lusers";
import { Auth } from "./auth";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { InitialFeedback, InitialFilter } from "./forms";
import { Users } from "./users";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      profile: Profile,
      noties: Noties,
      uchats: Uchats,
      users: Users,
      lusers: Lusers,
      info: Info,
      auth: Auth,
      favorites: Favorites,
      ...createForms({
        feedback: InitialFeedback,
        filter: InitialFilter
      })
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
