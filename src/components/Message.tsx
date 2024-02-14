import * as React from 'react'

import { useAppContext } from '@/context/AppContext'
import { useEffect, useState } from 'react'

import macellanLogo from '../assets/macellan-logo.png'

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

    // https://www.tailwindcss-animated.com/configurator.html

    return (
        <div className="flex flex-col items-center justify-center h-full">
            {isVisible && user ? (
                <div className="flex flex-col items-center animate-fade animate-once">
                    {user.details.avatar_url && (
                        <img src={user.details.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full mb-6 animate-jump" />
                    )}
                    <div className="text-3xl mb-2 animate-fade animate-once animate-delay-[700ms]">Hoşgeldin</div>
                    <h1 className="text-7xl font-bold mb-10 animate-jump-in animate-once">
                        {user.first_name} {user.last_name}
                    </h1>
                </div>
            ) : (
                <div className="flex items-center justify-center animate-pulse animate-infinite">
                    <img src={macellanLogo} alt="Macellan" className="w-[600px] h-auto" />
                </div>
            )}
        </div>
    )
}

export default Message
