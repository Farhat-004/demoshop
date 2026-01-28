import { Card } from "antd";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../actions/fetchData";

export default function Products() {
    const { data: products, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
        staleTime: 1000 * 60 * 5,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    return (
        <div className="w-3/5">
            <Card className="rounded-xl shadow-lg">
                <h2 className="text-lg font-bold mb-4 text-center">
                    🛒 Products
                </h2>
                {isLoading ?
                    <h3>Loading products... ... ..</h3>
                :   <div className="grid grid-cols-3 gap-4">
                        {products?.map((product) => (
                            <Product key={product?.id} product={product} />
                        ))}
                    </div>
                }
            </Card>
        </div>
    );
}
