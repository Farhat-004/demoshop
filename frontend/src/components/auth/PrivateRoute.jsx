import { Navigate, Outlet } from "react-router";
import Navbar from "../Navbar";
import { Layout } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../contexts";

export default function PrivateRoute() {
    const { auth } = useContext(AuthContext);
    return (
        <Layout className="min-h-screen bg-linear-to-br from-slate-100 via-gray-100 to-slate-200">
            {auth ?
                <>
                    <Navbar />
                    <Outlet />
                </>
            :   <Navigate to={"/login"} />}
        </Layout>
    );
}
