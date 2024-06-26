import {AxiosRequestConfig} from "axios";
import axiosWithToken from "@lib/config/AxiosConfig";

export async function createOrder(body: string) {
    const fullUrl = `${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL}/booking/create-order`
    const config: AxiosRequestConfig = {
        data: body,
        url: fullUrl,
        method: 'POST',
    };
    const response = await axiosWithToken(config);
    return response.data;
}

export async function getOrderByProvider() {
    const fullUrl = `${process.env.NEXT_PUBLIC_MAIN_SERVICE_URL}/booking/get/orders-by-provider`
    const config: AxiosRequestConfig = {
        data: null,
        url: fullUrl,
        method: 'POST',
    };
    const response = await axiosWithToken(config);
    return response.data;
}