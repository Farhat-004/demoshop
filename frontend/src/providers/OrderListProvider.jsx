import { useState } from "react";
import { OrderListContext } from "../contexts";

export default function OrderListProvider({ children }) {
    const [orderItems, setOrderItems] = useState([]);
    return (
        <OrderListContext value={{ orderItems, setOrderItems }}>
            {children}
        </OrderListContext>
    );
}
