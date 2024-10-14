import { PaginationLink } from "@/views/pool-views/types";

export interface PaymentObject {
  payment_id: string;
  payment_status: string;
  pay_address: string;
  price_amount: number;
  price_currency: string;
  pay_amount: number;
  actually_paid?: number;
  amount_received: number;
  pay_currency: string;
  order_id: string | null;
  order_description: string;
  payin_extra_id: string | null;
  ipn_callback_url: string;
  created_at: string;
  updated_at: string;
  purchase_id: string;
  smart_contract: string | null;
  network: string;
  network_precision: string | null;
  time_limit: string | null;
  burning_percent: string | null;
  expiration_estimate_date: string;
  is_fixed_rate: boolean;
  is_fee_paid_by_user: boolean;
  valid_until: string;
  type: string;
  product: string;
}

export interface Transaction {
  user_id: string;
  amount: number;
  payment_object: PaymentObject;
  reference_no: string;
  type: string;
  id: string;
  updated_at: string;
  created_at: string;
  status: string;
  sending_currency: string;
}

export type FilterType = {
  paginate?: number;
  search?: string;
  page?: number;
};

export interface TransactionResponse {
  transactions:{
    current_page: number;
    data: Transaction[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
}