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
    user: ApiUser
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
    user: ApiUser
}

export interface ApiUser {
    uuid: string
    first_name: string
    last_name: string
    full_name: string
    email: string
    phone: string
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
