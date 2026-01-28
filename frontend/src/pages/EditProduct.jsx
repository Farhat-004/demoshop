import { useNavigate, useParams } from "react-router";
import ProductForm from "../components/ProductForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProduct } from "../actions/fetchData";
import { useContext } from "react";
import { AuthContext } from "../contexts";

export default function EditProduct() {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const { data: productData, isLoading } = useQuery({
        queryKey: [`product-${id}`],
        queryFn: async () => {
            return await fetchProduct(id);
        },
    });

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const editProduct = async (formData) => {
        try {
            let imageUrl = "";

            if (formData.image) {
                const data = new FormData();
                data.append("file", formData.image);
                data.append("upload_preset", "final-project");
                data.append("cloud_name", "dtk2ucppn");

                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dtk2ucppn/image/upload",
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
                image: imageUrl || productData?.image, // cloudinary URL
            };

            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                    body: JSON.stringify(productPayload),
                },
            );

            const newProduct = await res.json();
            console.log("Product edited:", newProduct);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => editProduct(formData),
        onSuccess: () => {
            queryClient.invalidateQueries(["products", `product-${id}`]);
            queryClient.refetchQueries(["products", `product-${id}`]);
            navigate("/order");
        },
    });

    return (
        <>
            {isLoading ?
                <h3>Loading....</h3>
            :   <ProductForm
                    initialValues={productData}
                    submitText="Save Edit"
                    onSubmit={mutate}
                    loading={isPending}
                />
            }
        </>
    );
}
