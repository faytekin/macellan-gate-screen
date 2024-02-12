import { AppProvider } from '@/context/AppContext'
import './styles/App.css'

import Message from '@/components/Message'

function App() {
    return (
        <AppProvider>
            <Message />
        </AppProvider>
    )
}

export default App
