import { useEffect, useState } from 'react'
import './styles/App.css'
import SocketService from '@/helpers/SocketService.ts'
import ApiService from '@/helpers/ApiService.ts'
import { EventWalletBalance } from '@/types/ApiType.ts'

function App() {
    const [fullName, setFullName] = useState<string | null>(null)

    useEffect(() => {
        const handleEvent = async (data: EventWalletBalance) => {
            const wallet = await ApiService.walletDetails(data.wallet_id)
            const fullName: string = `${wallet.user.first_name} ${wallet.user.last_name}`

            console.log('User => ', fullName)

            setFullName(fullName)
        }

        SocketService.listen(handleEvent)
    }, [])

    console.log('inittt!')

    return (
        <>
            <h1>Hoş Geldiniz {fullName}</h1>
        </>
    )
}

export default App
