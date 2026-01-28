import { createBrowserRouter } from "react-router";
import Navbar from "../components/Navbar";
import OrderDashboard from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import PrivateRoute from "../components/auth/PrivateRoute";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LogoutPage from "../pages/LogoutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: PrivateRoute,
        errorElement: ErrorPage,
        children: [
            { path: "/", Component: HomePage },
            { path: "/order", Component: OrderPage },
            { path: "/add-product/", Component: AddProduct },
            { path: "/edit-product/:id", Component: EditProduct },
        ],
    },
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/register",
        Component: RegisterPage,
    },
    {
        path: "/logout",
        Component: LogoutPage,
    },
]);
