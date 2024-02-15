import { useCallback, useEffect, useState } from 'react'

import IntroScreen from '@/components/IntroScreen.tsx'
import Welcome from '@/components/Welcome.tsx'
import ApiService from '@/services/ApiService.ts'
import SocketService from '@/services/SocketService.ts'
import { AuthUser, Person, PusherInfo } from '@/types/ApiType.ts'

function App() {
    const [authUser, setAuthUser] = useState<AuthUser>()
    const [pusherData, setPusherData] = useState<PusherInfo>()
    const [person, setPerson] = useState<Person>()

    const initializeApp = useCallback(async () => {
        try {
            const appInfoResult = await ApiService.appInfo()
            setAuthUser(appInfoResult.auth_user)
            setPusherData(appInfoResult.pusher)
        } catch (error) {
            console.error('Error initializing app:', error)
        }
    }, [])

    useEffect(() => {
        void initializeApp()
    }, [initializeApp])

    useEffect(() => {
        if (!pusherData || !authUser) return

        SocketService.listen(
            pusherData,
            authUser.company_id,
            (eventPerson: Person) => {
                setPerson(eventPerson)
            }
        )

        return () => {
            SocketService.disconnect()
        }
    }, [authUser, pusherData])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setPerson(undefined)
        }, 8000)

        return () => clearTimeout(timeout)
    }, [person])

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white font-poppins">
            {person ? <Welcome person={person} /> : <IntroScreen />}
        </div>
    )
}

export default App
