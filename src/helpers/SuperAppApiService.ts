import { SuperAppWalletDetail } from '@/types/SuperAppType'
import axios, { AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SUPERAPP_URL,
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPERAPP_TOKEN}`,
        Accept: 'application/json',
    },
})

export const walletDetails = async (id: number): Promise<SuperAppWalletDetail> => {
    const result = await http.get(`integration/wallet/${id}/details`)

    return result.data.data
}
