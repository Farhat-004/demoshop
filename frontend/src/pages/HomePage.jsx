import { Layout, Table, Tag, Button, Card, Statistic } from "antd";
import OrderStats from "../components/OrderStats";
import OrderBoard from "../components/OrderBoard";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts";

const { Header, Content } = Layout;

export default function HomePage() {
    const { auth } = useContext(AuthContext);
    const fetchOrders = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/orders`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.accessToken}`,
                    },
                },
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    };
    const { data: orders, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: fetchOrders,
        staleTime: 1000 * 60 * 2,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return (
        <Content className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {isLoading ?
                    <h3>Loading .. .</h3>
                :   <>
                        <OrderStats orders={orders} />
                        <OrderBoard orders={orders} />
                    </>
                }
            </div>
        </Content>
    );
}
