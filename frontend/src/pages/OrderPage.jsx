import { Card, Button, Input, Image } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Products from "../components/Products";
import OrderCart from "../components/OrderCart";
import OrderListProvider from "../providers/OrderListProvider";

export default function OrderPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-4">
            <div className="flex gap-4">
                <OrderListProvider>
                    <OrderCart />
                    <Products />
                </OrderListProvider>
            </div>
        </div>
    );
}
