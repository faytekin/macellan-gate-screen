export interface AppInfo {
    auth_user: AuthUser
    pusher: PusherInfo
}

export interface PusherInfo {
    host: string
    port: string
    key: string
    auth_endpoint: string
}

export interface PaymentDetail {
    id: number
    user: Person
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
    user: Person
}

export interface Person {
    uuid: string
    first_name: string
    last_name: string
    full_name: string
    email: string
    phone: string
    details: PersonDetails
}

interface PersonDetails {
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

export interface TagQrReadEvent {
    payment_id: number
    order_id: number
    gateway: string
    paid_price: number
    final_total: number
    user_id: number
    company_id: number
    wallet_id: number
    tag_qr: {
        name: string
        qr_code: string
        reference_code: string
        active: boolean
    }
}

export interface AuthUser {
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
