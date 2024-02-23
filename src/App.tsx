import React from 'react'
import { RouterProvider } from 'react-router-dom'

import AppRouter from '@/router/AppRouter.tsx'

const App: React.FC = () => {
    return <RouterProvider router={AppRouter} />
}

export default App
