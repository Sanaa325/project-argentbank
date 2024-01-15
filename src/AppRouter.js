//Librairies
import React from "react";
import { Routes, Route } from "react-router-dom";


//Components

import Home from "./Pages/Home/Home";
import SignIn from "./Pages/SignIn/SignIn";
import User from "./Pages/User/User";
import Error from "./Pages/Error/Error";
import PrivateRoute from "./Components/PrivateRoute";



function AppRouter() {
        return (

                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/profile" element={
                                <PrivateRoute>
                                        <User />
                                </PrivateRoute>
                        }
                        />
                        <Route path='*' element={<Error />} />
                </Routes>

        );
}


export default AppRouter;

