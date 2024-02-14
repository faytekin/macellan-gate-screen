import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { User, EventWalletBalance, PusherType } from '@/types/ApiType.ts'
import ApiService from './ApiService'

let socketInstance: Echo

const listen = (
    envData: PusherType,
    companyId: number,
    onChangeEvent: (data: EventWalletBalance, user: User) => void,
) => {
    socketDisconnect()

    console.log('[Socket] connecting')

    socketInstance = new Echo({
        Pusher,
        broadcaster: 'pusher',
        key: envData.key,
        wsHost: envData.host,
        wsPort: envData.port,
        wssPort: envData.port,
        cluster: 'eu',
        forceTLS: false,
        encrypted: true,
        enableStats: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: `${import.meta.env.VITE_SUPERAPP_URL}/broadcasting/auth`,
        bearerToken: import.meta.env.VITE_SUPERAPP_TOKEN,
    })

    socketInstance.connector.pusher.connection.bind('connected', () => {
        console.log('[Socket] connected')
    })

    socketInstance.connector.pusher.connection.bind('error', (err: never) => {
        console.log('[Socket] error => ', err)
    })

    socketInstance.connector.pusher.connection.bind('disconnected', () => {
        console.log('[Socket] disconnected => ')
        socketInstance.leaveAllChannels()
    })

    socketInstance
        .private(`company.${companyId}`)
        .listen('.wallet.balance', async (data: EventWalletBalance) => {
            if (!data.historyable_type.endsWith('Payment')) {
                return
            }

            const payment = await ApiService.paymentDetails(data.historyable_id)

            if (payment.related?.reference_code !== import.meta.env.VITE_TAG_QR_REFERENCE_CODE) {
                return
            }

            onChangeEvent(data, payment.user)
        })
        .subscribed(() => {
            console.log('[Socket] is connected to private channel')
        })
        .error((data: never) => {
            console.log('[Socket] Could not connect to private channel => ', data)
        })
}

const socketDisconnect = (): void => {
    if (!socketInstance) {
        return
    }

    socketInstance.disconnect()
    socketInstance.leaveAllChannels()
}

export default {
    listen: listen,
}
