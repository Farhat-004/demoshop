import { Card, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function ProductForm({
    initialValues = null,
    onSubmit,
    submitText = "Add Product",
    loading = false,
}) {
    const [form, setForm] = useState({
        name: "",
        price: null,
        stock: null,
        sku: "",
        image: null,
        imagePreview: null,
    });

    useEffect(() => {
        if (initialValues) {
            setForm({
                ...initialValues,
                imagePreview: initialValues.image || null,
                image: null,
            });
        }
    }, []);

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setForm((prev) => ({
                ...prev,
                image: file,
                imagePreview: reader.result,
            }));
        };
        reader.readAsDataURL(file);
        return false; // prevent auto upload
    };

    const handleSubmit = () => {
        onSubmit(form);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-6 flex justify-center">
            <Card className="w-full max-w-xl rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4">📦 Product Form</h2>

                {/* NAME */}
                <label className="block text-sm font-semibold mb-1">
                    Product Name
                </label>
                <Input
                    placeholder="Enter product name"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="mb-3"
                />

                {/* SKU */}
                <label className="block text-sm font-semibold mb-1">SKU</label>
                <Input
                    placeholder="SKU code"
                    value={form.sku}
                    onChange={(e) => handleChange("sku", e.target.value)}
                    className="mb-3"
                />

                {/* PRICE & STOCK */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Price
                        </label>
                        <InputNumber
                            className="w-full"
                            min={0}
                            value={form.price}
                            onChange={(v) => handleChange("price", v)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">
                            Stock
                        </label>
                        <InputNumber
                            className="w-full"
                            min={0}
                            value={form.stock}
                            onChange={(v) => handleChange("stock", v)}
                        />
                    </div>
                </div>

                {/* IMAGE UPLOAD */}
                <label className="block text-sm font-semibold mb-2">
                    Product Image
                </label>
                <div className="flex items-center gap-4 mb-4">
                    <Upload
                        beforeUpload={handleImageChange}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>

                    {form.imagePreview && (
                        <img
                            src={form.imagePreview}
                            alt="preview"
                            className="w-20 h-20 object-cover rounded-lg border"
                        />
                    )}
                </div>

                {/* SUBMIT */}
                <Button
                    type="primary"
                    size="large"
                    className="w-full bg-linear-to-r from-indigo-600 to-purple-600 border-none"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {submitText}
                </Button>
            </Card>
        </div>
    );
}
