import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import 'dayjs/locale/tr'

dayjs.locale('tr')

const IntroScreen = () => {
    const [currentTime, setCurrentTime] = useState(dayjs())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(dayjs())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const formattedDate = currentTime.format('DD MMMM YYYY')
    const formattedTime = currentTime.format('HH:mm:ss')

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <div className="text-9xl font-poppins mb-10">{formattedDate}</div>
                <div className="clock-time font-thin font-poppins">{formattedTime}</div>
            </div>
        </div>
    )
}

export default IntroScreen
