export interface ApiAppInfo {
    auth_user: ApiAuthUser
    pusher: PusherType
}

export interface PusherType {
    host: string
    port: string
    key: string
}

export interface PaymentDetail {
    id: number
    user: User
    paid_price: number
    point: number
    final_total: number
    refund_amount: number
    transaction_code: string
    reference_code: number
    order_id: number
    payment_time: string
    created_at: string
    related: PaymentRelated
}

interface PaymentRelated {
    name: string
    qr_code: string
    reference_code: string
    active: boolean
}

export interface WalletDetail {
    id: number
    type: string
    visibility: boolean
    balance: number
    point: number
    company_id: number
    user: User
}

export interface User {
    uuid: string
    first_name: string
    last_name: string
    full_name: string
    email: string
    phone: string
    details: UserDetails
}

interface UserDetails {
    avatar_url: string
    device_id: string
    sim_id: string | null
    id_number: string | null
    gender: 'male' | 'female' | 'prefer_not_respond'
    birth_year: number | null
    birthday: string
    subscribe_email: boolean
    subscribe_sms: boolean
}

export interface ApiAuthUser {
    id: number
    first_name: string
    last_name: string
    full_name: string
    email: string
    status: boolean
    role: string
    company_id: number
    branch_id: number
}

export interface EventWalletBalance {
    id: number
    type: string
    description: string
    amount: number
    user_id: number
    company_id: number
    wallet_id: number
    historyable_type: string
    historyable_id: number
}
