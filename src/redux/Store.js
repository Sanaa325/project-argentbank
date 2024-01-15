//Le fichier `store.js` sert à créer et configurer votre magasin Redux, qui est l'endroit où vous allez stocker l'état global de votre application React.
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/LoginSlice";
import userReducer from "../redux/UserSlice";

// Le magasin est créé avec une configuration initiale qui spécifie quel réducteur doit être utilisé pour quelle partie de l'état
export const Store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});
export default Store;