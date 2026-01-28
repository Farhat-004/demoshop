import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";

const { Title, Text } = Typography;

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                        fname: values.firstName,
                        lname: values.lastName,
                    }),
                },
            );
            if (response.status == 201) navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg rounded-xl">
                <div className="flex flex-col gap-4 items-center mb-6">
                    <Title level={2} className="!m-0">
                        Create Account
                    </Title>
                    <Text type="secondary">
                        Join us! Create your account below
                    </Text>
                </div>

                <Form
                    form={form}
                    name="register"
                    className="register-form"
                    onFinish={onFinish}
                    layout="vertical"
                    size="large"
                    scrollToFirstError
                >
                    <div className="flex gap-4">
                        <Form.Item
                            name="firstName"
                            className="flex-1"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your First Name!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="text-gray-400" />
                                }
                                placeholder="First Name"
                            />
                        </Form.Item>
                        <Form.Item
                            name="lastName"
                            className="flex-1"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Last Name!",
                                },
                            ]}
                        >
                            <Input
                                prefix={
                                    <UserOutlined className="text-gray-400" />
                                }
                                placeholder="Last Name"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: true,
                                message: "Please input your E-mail!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Email"
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
                        hasFeedback
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "The two passwords that you entered do not match!",
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                            block
                        >
                            Register
                        </Button>
                        <div className="mt-4 text-center">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-600 hover:text-blue-800"
                            >
                                Login now!
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
