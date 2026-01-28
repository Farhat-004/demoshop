import { Menu, Layout } from "antd";
import { Link } from "react-router";
const { Header } = Layout;
export default function Navbar() {
    return (
        <Header className="bg-white! shadow-md px-6">
            <div className="flex items-center justify-between h-full">
                {/* Left Title */}
                <h1 className="text-xl font-semibold text-gray-800">
                    Order Management
                </h1>

                {/* Right Nav Links */}
                <Menu
                    mode="horizontal"
                    disabledOverflow
                    className="border-0 [&_.ant-menu-item]:px-5"
                    items={[
                        {
                            key: "/",
                            label: <Link to="/">Home</Link>,
                        },
                        {
                            key: "/orders",
                            label: <Link to="/order">Order</Link>,
                        },
                        {
                            key: "/add-product",
                            label: <Link to="/add-product">Add Product</Link>,
                        },
                        {
                            key: "/logout",
                            label: <Link to="/logout">Logout</Link>,
                        },
                    ]}
                />
            </div>
        </Header>
    );
}
