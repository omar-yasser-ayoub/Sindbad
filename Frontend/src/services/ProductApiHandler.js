import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllProducts = async (search, minprice, maxprice) => {
    try {
        const response = await axios.get(`${baseURL}/product?search=${search}&minprice=${minprice}&maxprice=${maxprice}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log("success: ", response.data);
            return response.data;
        } else if (response.status === 404) {
            console.log("fail: ", response.data);
            return {
                error: true,
                message: 'No products found.',
                status: 404,
            };
        } else {
            return {
                error: true,
                message: `Unexpected status code: ${response.status}`,
            };
        }
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${baseURL}/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            console.log("success: ", response.data);
            return response.data;
        } else if (response.status === 404) {
            console.log("fail: ", response.data);
            return {
                error: true,
                message: 'Product not found.',
                status: 404,
            };
        } else {
            return {
                error: true,
                message: `Unexpected status code: ${response.status}`,
            };
        }
    } catch (error) {
        if (error.response) {
            return {
                error: true,
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
};