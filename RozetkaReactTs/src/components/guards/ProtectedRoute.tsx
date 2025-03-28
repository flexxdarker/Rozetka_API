import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import {TokenService} from "../../services/tokenService.ts";

const ProtectedRoute = () => {

    const user  = TokenService.getAccessTokenPayload();

return user?.roles === "admin" ? <Outlet/> : <Navigate to={"/signin"}/>
};

export default ProtectedRoute;