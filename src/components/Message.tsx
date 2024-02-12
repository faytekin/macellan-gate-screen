import * as React from 'react'

import { useAppContext } from '@/context/AppContext'

const Message: React.FC = () => {
    const { user } = useAppContext()

    if (!user) return null

    return (
        <div>
            <div>Hoşgeldin</div>

            <h1>
                {user.first_name} {user.last_name} 🎉
            </h1>
        </div>
    )
}

export default Message
