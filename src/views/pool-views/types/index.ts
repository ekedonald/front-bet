import { User } from "@/views/auth-views/types";

export type SaveBetDTO = {
  pool_id: string;
  bet_price: number;
  choice: string;
  choice_outcome: string;
}

export type FilterType = {
  paginate?: number;
  search?: string;
  page?: number;
};

export interface TokenType {
  id: string;
  name: string;
  symbol: string;
  tokenObject: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  price: string;
}

export interface TickerType {
  id: string;
  base_token_id: string;
  target_token_id: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  name: string;
  base_token: TokenType;
  target_token: TokenType;
}

export interface PoolType {
  id: string;
  target_token_start_price: string;
  target_token_end_price: string;
  closed_at: string;
  ticker_id: string;
  created_at: string;
  settled_at: string;
  updated_at: string;
  deleted_at: string | null;
  base_token_start_price: string;
  base_token_end_price: string;
  ticker: TickerType;
  bets: Bet[];
}

export interface Bet {
  id: string;
  user_id: string;
  settled: number;
  ticker_id: string;
  ticker: TickerType;
  pool: PoolType;
  user: User;
  pool_id: string;
  bet_price: string;
  choice: string;
  status: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  choice_outcome: string;
};

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface BetResponse {
  bets:{
    current_page: number;
    data: Bet[];
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