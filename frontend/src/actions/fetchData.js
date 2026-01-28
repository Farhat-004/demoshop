export const fetchProducts = async () => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/products`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
//single product
export const fetchProduct = async (id) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/products/${id}`,
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return new Error(error.message);
    }
};
