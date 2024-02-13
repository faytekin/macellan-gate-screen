import { AppProvider } from '@/context/AppContext'

import Message from '@/components/Message'

function App() {
    return (
        <AppProvider>
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white font-poppins">
                <Message />
            </div>
        </AppProvider>
    )
}

export default App
