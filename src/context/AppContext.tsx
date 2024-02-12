import * as React from 'react'

import ApiService from '@/services/ApiService'
import { ApiAppInfo, ApiUser } from '@/types/ApiType'
import SocketService from '@/services/SocketService'

export interface AppContextValues {
    isReady: boolean
    authUser: ApiAppInfo['auth_user'] | undefined
    pusherData: ApiAppInfo['pusher'] | undefined
    user: ApiUser | undefined
}

export interface AppProviderProps {
    children: JSX.Element | JSX.Element[]
}

export const AppContext = React.createContext({} as AppContextValues)

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => React.useContext(AppContext)

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isReady, setReady] = React.useState<boolean>(false)
    const [authUser, setAuthUser] = React.useState<ApiAppInfo['auth_user']>()
    const [pusherData, setPusherData] = React.useState<ApiAppInfo['pusher']>()

    const [user, setUser] = React.useState<ApiUser>()

    const init = React.useCallback(async () => {
        setReady(true)

        const appInfoResult = await ApiService.appInfo()

        setAuthUser(appInfoResult.auth_user)
        setPusherData(appInfoResult.pusher)
        setReady(false)
    }, [])

    React.useEffect(() => {
        init()
    }, [init])

    React.useEffect(() => {
        if (!pusherData) return

        SocketService.listen(pusherData, (_, eventUser) => {
            setUser(eventUser)
        })
    }, [pusherData])

    return (
        <AppContext.Provider
            value={{ isReady: isReady, authUser: authUser, pusherData: pusherData, user: user }}
        >
            {children}
        </AppContext.Provider>
    )
}
