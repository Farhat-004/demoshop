import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../contexts";

export default function LogoutPage() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setAuth(null);
        navigate("/login");
    }, []);

    return null;
}
