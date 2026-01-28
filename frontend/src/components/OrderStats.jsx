import { Card, Statistic } from "antd";

export default function OrderStats({ orders }) {
    const totalOrders = orders?.length;
    const pendingOrders = orders.filter(
        (order) => order?.status === "PENDING",
    ).length;
    const deliveredOrders = orders.filter(
        (order) => order?.status === "DELIVERED",
    ).length;
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="shadow-sm rounded-xl">
                <Statistic title="Total Orders" value={totalOrders} />
            </Card>

            <Card className="shadow-sm rounded-xl">
                <Statistic title="Pending Orders" value={pendingOrders} />
            </Card>

            <Card className="shadow-sm rounded-xl">
                <Statistic title="Delivered Orders" value={deliveredOrders} />
            </Card>

            {/* <Card className="shadow-sm rounded-xl">
                <Statistic title="Paid Orders" value={5} />
            </Card> */}
        </div>
    );
}
