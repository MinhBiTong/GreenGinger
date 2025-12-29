import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
type MiddlewareRouteProps = {
    isPublicOnly?: boolean;
};
const MiddlewareRoute = ({ isPublicOnly = false }: MiddlewareRouteProps) => {
    const {accessToken, isLoading} = useAuth();

    //neu dang load goi refresh token thi ko redirect voi
    if (isLoading) {
        return <div>Waiting a second...</div>
    }

    const isAuthenticated = !!accessToken;

    //neu dang nhap ma co vao trang login -> duoi sang trang home
    if (isPublicOnly && isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    //neu chua login ma co vao trang private -> duoi sang trang not found
    if (!isPublicOnly && !isAuthenticated) {
        return <Navigate to="/404" replace />;
    }

    return <Outlet />;
}

export default MiddlewareRoute