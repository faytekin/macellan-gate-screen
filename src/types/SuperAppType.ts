export interface SuperAppWalletDetail {
    id: number
    type: string
    visibility: boolean
    balance: number
    point: number
    company_id: number
    user: SuperAppUser
}

export interface SuperAppUser {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
}

export interface EventWalletBalance {
    id: number
    type: string
    description: string
    amount: number
    user_id: number
    company_id: number
    wallet_id: number
}
