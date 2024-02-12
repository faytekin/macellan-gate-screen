import { useEffect, useState } from 'react'
import './styles/App.css'
import { socketListen } from '@/helpers/Socket.ts'
import { walletDetails } from '@/helpers/ApiService.ts'
import { EventWalletBalance } from '@/types/ApiType.ts'

function App() {
    const [fullName, setFullName] = useState<string | null>(null)

    useEffect(() => {
        const handleEvent = async (data: EventWalletBalance) => {
            const wallet = await walletDetails(data.wallet_id)
            const fullName: string = `${wallet.user.first_name} ${wallet.user.last_name}`

            console.log('User => ', fullName)

            setFullName(fullName)
        }

        socketListen(handleEvent)
    }, [])

    console.log('inittt!')

    return (
        <>
            <h1>Hoş Geldiniz {fullName}</h1>
        </>
    )
}

export default App
