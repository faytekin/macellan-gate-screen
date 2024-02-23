import { createBrowserRouter } from 'react-router-dom'

import Home from '@/views/Home.tsx'
import Message from '@/views/Message.tsx'

const AppRouter = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/message',
        element: <Message />,
    },
])

export default AppRouter
