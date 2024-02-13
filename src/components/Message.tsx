import * as React from 'react'

import { useAppContext } from '@/context/AppContext'
import { useEffect, useState } from 'react'

const Message: React.FC = () => {
    const { user } = useAppContext()
    const [isVisible, setIsVisible] = useState<boolean>(true)

    useEffect(() => {
        setIsVisible(true)

        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 5000)

        return () => {
            clearTimeout(timeout)
        }
    }, [user])

    if (!user) return null

    return (
        <div className={`flex flex-col items-center justify-center h-full ${isVisible ? '' : 'invisible'}`}>
            <div className="text-3xl mb-6 animate-fade animate-delay-[500ms]">Hoşgeldin</div>
            <h1 className="text-7xl font-bold mb-10 animate-jump-in animate-once">
                {user.first_name} {user.last_name}
            </h1>
        </div>
    )
}

export default Message
