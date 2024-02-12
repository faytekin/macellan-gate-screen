import axios, { AxiosInstance } from 'axios'

import { ApiAppInfo, WalletDetail } from '@/types/ApiType.ts'

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SUPERAPP_URL,
    timeout: 5000,
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPERAPP_TOKEN}`,
        Accept: 'application/json',
    },
})

const walletDetails = async (id: number): Promise<WalletDetail> => {
    const result = await http.get(`integration/wallet/${id}/details`)

    return result.data.data
}

const appInfo = async (): Promise<ApiAppInfo> => {
    const result = await http.get('integration/app-info')

    return result.data.data
}

export default {
    appInfo: appInfo,
    walletDetails: walletDetails,
}
