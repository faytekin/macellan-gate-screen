import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { EventWalletBalance } from '@/types/ApiType.ts'

let socketInstance: Echo

const listen = (handleEvent: (data: EventWalletBalance) => void) => {
    socketDisconnect()

    console.log('[Socket] connecting')

    socketInstance = new Echo({
        Pusher,
        broadcaster: 'pusher',
        key: import.meta.env.VITE_SOCKET_KEY,
        wsHost: import.meta.env.VITE_SOCKET_HOST,
        wsPort: 6002,
        wssPort: 6002,
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
        .private('company.2')
        .listen('.wallet.balance', (data: EventWalletBalance) => {
            console.log('[Socket] data => ', data)
            void handleEvent(data)
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
