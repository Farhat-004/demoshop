import React, { useContext } from "react";
import { Form, Input, Button, Checkbox, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts";

const { Title, Text } = Typography;

export default function LoginPage() {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const onFinish = async (values) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                    }),
                },
            );
            const data = await response.json();
            setAuth(data);
            if (response.status == 201) navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen  bg-gray-100">
            <Card className="w-full max-w-md shadow-lg   rounded-xl">
                <div className="flex flex-col gap-4  items-center mb-6">
                    <Title level={2} className="m-0!">
                        Welcome Back
                    </Title>
                    <Text type="secondary">Please sign in to your account</Text>
                </div>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            block
                        >
                            Log in
                        </Button>
                        <div className="mt-4 text-center">
                            Or{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                register now!
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
