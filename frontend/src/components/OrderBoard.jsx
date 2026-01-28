import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Table, Tag } from "antd";
import { useContext } from "react";
import { AuthContext } from "../contexts";

export default function OrderBoard({ orders }) {
    const queryClient = useQueryClient();
    const { auth } = useContext(AuthContext);

    const handleDeliver = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    body: JSON.stringify({
                        status: "DELIVERED",
                    }),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to deliver order");
            }

            const data = await response.json();
            console.log("order delivered", data);

            return data;
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    };
    const handleDelete = async (id) => {
        console.log(id);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/orders/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete order");
            }

            const data = await response.json();
            console.log("order deleted", data);

            return data;
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    };
    const { mutate: deleteFn, isPending: deletePending } = useMutation({
        mutationFn: (id) => handleDelete(id),
        onSuccess: () => {
            queryClient.refetchQueries(["orders"]);
        },
    });
    const { mutate: deliverFn, isPending: deliverPending } = useMutation({
        mutationFn: (id) => handleDeliver(id),
        onSuccess: () => {
            queryClient.refetchQueries(["orders"]);
        },
    });
    const columns = [
        {
            title: "Customer",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Product",
            dataIndex: "productName",
            key: "productName",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Total Price",
            dataIndex: "totalPrice",
            key: "totalPrice",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "DELIVERED" ? "green" : "orange"}>
                    {status}
                </Tag>
            ),
        },
        {
            title: "Actions",
            key: "action",
            render: (order) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => deliverFn(order?.key)}
                        hidden={order.status == "DELIVERED"}
                        disabled={deliverPending}
                        className="bg-linear-to-r mr-2 from-blue-500 to-indigo-600 text-white border-none rounded-full px-5 hover:scale-105 transition-transform"
                    >
                        DELIVER
                    </Button>
                    {/* <Button
                        type="primary"
                        className="bg-gradient-to-r mr-2 from-blue-500 to-indigo-600 text-white border-none rounded-full px-5 hover:scale-105 transition-transform"
                    >
                        CANCEL
                    </Button> */}
                    <Button
                        type="primary"
                        onClick={() => deleteFn(order?.key)}
                        disabled={deletePending}
                        className="bg-linear-to-r ml-2 text-red-500 from-blue-500 to-indigo-600  border-none rounded-full px-5 hover:scale-105 transition-transform"
                    >
                        DELETE
                    </Button>
                </>
            ),
        },
    ];

    const showOrders = orders.map((order) => {
        const price = order.product?.price ?? 0;

        return {
            key: String(order.id),
            customerName: order.customerName,
            productName: order.product?.name ?? "N/A",
            quantity: order.quantity,
            totalPrice: order.quantity * price,
            status: order.status,
            paid: order.status === "DELIVERED",
        };
    });

    return (
        <Card title="Order Queue" className="shadow-sm rounded-xl">
            <Table columns={columns} dataSource={showOrders} />
        </Card>
    );
}
