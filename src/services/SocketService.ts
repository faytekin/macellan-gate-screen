import ApiService from '@/services/ApiService'
import { Person, PusherInfo, TagQrReadEvent } from '@/types/ApiType.ts'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

let socketInstance: Echo | null = null

const initializeSocketInstance = (pusherInfo: PusherInfo) => {
    console.log('[Socket] connecting')

    return new Echo({
        Pusher,
        broadcaster: 'pusher',
        key: pusherInfo.key,
        wsHost: pusherInfo.host,
        wsPort: pusherInfo.port,
        wssPort: pusherInfo.port,
        cluster: 'eu',
        forceTLS: false,
        encrypted: true,
        enableStats: false,
        enabledTransports: ['ws', 'wss'],
        authEndpoint: `${import.meta.env.VITE_SUPERAPP_URL}/broadcasting/auth`,
        bearerToken: import.meta.env.VITE_SUPERAPP_TOKEN,
    })
}

const listen = (
    pusherInfo: PusherInfo,
    companyId: number,
    onChangeEvent: (person: Person) => void
) => {
    const handleConnected = () => {
        console.log('[Socket] connected')
    }

    const handleError = (err: never) => {
        console.log('[Socket] error => ', err)
    }

    const handleDisconnected = () => {
        console.log('[Socket] disconnected => ')
        socketInstance?.leaveAllChannels()
    }

    const handleTagQrRead = async (data: TagQrReadEvent) => {
        if (
            data.tag_qr.reference_code !==
            import.meta.env.VITE_TAG_QR_REFERENCE_CODE
        ) {
            return
        }

        const payment = await ApiService.paymentDetails(data.payment_id)

        onChangeEvent(payment.user)
    }

    const handleSubscribed = () => {
        console.log('[Socket] is connected to private channel')
    }

    const handleErrorSubscribed = (data: never) => {
        console.log('[Socket] Could not connect to private channel => ', data)
    }

    disconnect()

    socketInstance = initializeSocketInstance(pusherInfo)
    const socketConnection = socketInstance.connector.pusher.connection

    socketConnection.bind('connected', handleConnected)
    socketConnection.bind('error', handleError)
    socketConnection.bind('disconnected', handleDisconnected)

    socketInstance
        .private(`company.${companyId}`)
        .listen('.wallet.tag_qr_read', handleTagQrRead)
        .subscribed(handleSubscribed)
        .error(handleErrorSubscribed)
}

const disconnect = () => {
    if (socketInstance) {
        socketInstance.disconnect()
        socketInstance.leaveAllChannels()
    }
}

export default {
    listen,
    disconnect,
}
