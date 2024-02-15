import macellanLogo from '@/assets/macellan-logo.png'

const IntroScreen = () => {
    // https://www.tailwindcss-animated.com/configurator.html

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex items-center justify-center animate-pulse animate-infinite">
                <img
                    src={macellanLogo}
                    alt="Macellan"
                    className="w-[600px] h-auto"
                />
            </div>
        </div>
    )
}

export default IntroScreen
