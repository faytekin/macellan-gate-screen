import { AppInfo, PaymentDetail, WalletDetail } from '@/types/ApiType.ts'
import axios, { AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SUPERAPP_URL,
    timeout: 2000,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPERAPP_TOKEN}`,
        Accept: 'application/json',
    },
})

const walletDetails = async (id: number): Promise<WalletDetail> => {
    const result = await http.get(`integration/wallet/${id}/details`)

    return result.data.data
}

const paymentDetails = async (id: number): Promise<PaymentDetail> => {
    const result = await http.get(`integration/payment/${id}/details`)

    return result.data.data
}

const appInfo = async (): Promise<AppInfo> => {
    const result = await http.get('integration/app-info')

    return result.data.data
}

export default {
    appInfo: appInfo,
    walletDetails: walletDetails,
    paymentDetails: paymentDetails,
}
