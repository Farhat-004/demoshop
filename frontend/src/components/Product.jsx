import { Button } from "antd";
import { useContext, useState } from "react";
import { AuthContext, OrderListContext } from "../contexts";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Product({ product }) {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    console.log(auth);

    const { orderItems, setOrderItems } = useContext(OrderListContext);
    const [exists, setExists] = useState(orderItems.includes(product));
    const queryClient = useQueryClient();

    const HandleAddOrder = (product) => {
        setOrderItems([...orderItems, { ...product, quantity: 1 }]);
        setExists(true);
    };
    const HandleRemoveOrder = (product) => {
        setOrderItems(orderItems.filter((item) => item.id !== product.id));
        setExists(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                },
            );
            console.log(response);

            if (response.status == 403) {
                console.log("unauthorized request");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        //403 forbidden req
    };
    const handleEdit = (product) => {
        navigate(`/edit-product/${product?.id}`);
    };
    const { mutate } = useMutation({
        mutationFn: (id) => handleDelete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            queryClient.refetchQueries(["products"]);
        },
    });
    return (
        <div className="relative bg-white rounded-xl shadow-sm p-3 flex flex-col">
            {/* Top-right buttons */}
            {auth?.user?.role == "ADMIN" && (
                <div className="absolute top-2 right-2 flex gap-1">
                    <Button
                        size="small"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(product)}
                    />
                    <Button
                        size="small"
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => mutate(product?.id)}
                        danger
                    />
                </div>
            )}

            {/* Product image */}
            <img
                src={product?.image}
                height={80}
                preview={false}
                className="rounded-md object-cover"
            />

            {/* Product info */}
            <p className="mt-2 text-sm font-semibold truncate">
                {product?.name}
            </p>
            <p className="text-xs text-gray-500">Stock: {product?.stock}</p>
            <p className="text-sm font-bold text-indigo-600">
                ৳ {product?.price}
            </p>

            {/* Add / Remove Button */}
            {!orderItems[0] ?
                <Button
                    size="small"
                    className={`mt-auto w-full ${exists ? "bg-red-500" : "bg-indigo-600"} text-white border-none`}
                    onClick={() => HandleAddOrder(product)}
                    disabled={product?.stock === 0 || orderItems[0]}
                >
                    Add to list
                </Button>
            :   <Button
                    size="small"
                    className={`mt-auto w-full ${exists ? "bg-red-500" : "bg-indigo-600"} text-white border-none`}
                    onClick={() => HandleRemoveOrder(product)}
                    disabled={product?.stock === 0}
                    hidden={product?.id !== orderItems[0]?.id}
                >
                    Remove
                </Button>
            }
        </div>
    );
}
