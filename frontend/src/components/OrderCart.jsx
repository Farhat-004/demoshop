import { Button, Card, Input } from "antd";
import { useContext, useState } from "react";
import { AuthContext, OrderListContext } from "../contexts";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function OrderCart() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [customerName, setCustomerName] = useState("");
    const { orderItems, setOrderItems } = useContext(OrderListContext);
    const queryClient = useQueryClient();
    const increaseQty = (id) => {
        setOrderItems(
            orderItems.map((item) =>
                item.id === id ?
                    { ...item, quantity: item.quantity + 1 }
                :   item,
            ),
        );
    };

    const decreaseQty = (id) => {
        setOrderItems(
            orderItems.map((item) =>
                item.id === id ?
                    { ...item, quantity: Math.max(item.quantity - 1, 1) }
                :   item,
            ),
        );
    };

    const handleOrder = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/orders`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },

                    body: JSON.stringify({
                        customerName,
                        productId: orderItems[0]?.id,
                        quantity: orderItems[0]?.quantity,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const data = await response.json();
            console.log("order added", data);

            setCustomerName("");
            setOrderItems([]);

            return data;
        } catch (error) {
            console.log(error);
            return new Error(error.message);
        }
    };

    const { mutate, isPending } = useMutation({
        mutationFn: () => handleOrder(),
        onSuccess: () => {
            // queryClient.invalidateQueries(["orders"]);
            queryClient.refetchQueries(["orders"]);
            navigate("/");
        },
    });

    return (
        <div className="w-2/5">
            <Card className="rounded-xl shadow-lg h-full flex flex-col">
                <h2 className="text-lg font-bold mb-3">🧾 Order List</h2>

                <Input
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    size="large"
                    className="mb-4"
                />

                {/* ORDER ITEMS */}
                <div className="flex-1 space-y-3 overflow-y-auto">
                    {orderItems.length === 0 && (
                        <p className="text-gray-500 text-center mt-10">
                            No products added
                        </p>
                    )}

                    {orderItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-2 shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <img
                                    src={item.image}
                                    width={40}
                                    preview={false}
                                    className="rounded"
                                />
                                <div>
                                    <p className="text-sm font-semibold">
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ৳ {item.price}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    size="small"
                                    icon={<MinusOutlined />}
                                    onClick={() => decreaseQty(item.id)}
                                />
                                <span className="font-semibold text-sm">
                                    {item.quantity}
                                </span>
                                <Button
                                    size="small"
                                    icon={<PlusOutlined />}
                                    onClick={() => increaseQty(item.id)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ORDER BUTTON */}
                <Button
                    type="primary"
                    size="large"
                    onClick={mutate}
                    className="mt-4 bg-linear-to-r from-indigo-600 to-purple-600 border-none"
                    disabled={
                        !customerName || orderItems.length === 0 || isPending
                    }
                >
                    Place Order
                </Button>
            </Card>
        </div>
    );
}
