import { instance } from "./base"

type GetProductsParams = {
    size: number,
    page: number
}

type Product = {
    id: number,
    name: string,
    supplier: string,
    barcode: string,
    category: number,
    shortDescription: string
}

type ProductResponse = {
    items: Product[],
    total_count: number,
    page: number
}

export const getProducts = async (params?: GetProductsParams) => {
    const token: string | null = localStorage.getItem('ox_token')

    const response = await instance.request<ProductResponse>({
        url: '/variations',
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        params
    })

    return response.data
}