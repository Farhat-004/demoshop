import { useNavigate } from "react-router";
import ProductForm from "../components/ProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts";
export default function AddProduct() {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    const addProduct = async (formData) => {
        try {
            let imageUrl = "";

            if (formData.image) {
                const data = new FormData();
                data.append("file", formData.image);
                data.append(
                    "upload_preset",
                    import.meta.env.VITE_UPLOAD_PRESET,
                );
                data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                    {
                        method: "POST",
                        body: data,
                    },
                );
                const result = await response.json();
                imageUrl = result.secure_url;
            }

            // Now send full product data to your backend
            const productPayload = {
                name: formData.name,
                price: formData.price,
                stock: formData.stock,
                sku: formData.sku,
                image: imageUrl, // cloudinary URL
            };

            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },

                    body: JSON.stringify(productPayload),
                },
            );

            const newProduct = await res.json();
            console.log("Product added:", newProduct);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => addProduct(formData),
        onSuccess: () => {
            queryClient.invalidateQueries(["products"]);
            queryClient.refetchQueries(["products"]);
            navigate("/order");
        },
    });

    return <ProductForm onSubmit={mutate} loading={isPending} />;
}
