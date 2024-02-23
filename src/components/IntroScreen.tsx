import { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import 'dayjs/locale/tr'

dayjs.locale('tr')

const IntroScreen = () => {
    const [currentDate, setCurrentDate] = useState(dayjs())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(dayjs())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center">
                <div className="text-9xl font-poppins mb-10">{currentDate.format('DD MMMM YYYY')}</div>
                <div className="clock-time font-thin font-poppins">{currentDate.format('HH:mm:ss')}</div>
            </div>
        </div>
    )
}

export default IntroScreen
