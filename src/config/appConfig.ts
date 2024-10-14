export const appName = "GamePool";
export const appDescription = "GamePool";
export const DASHBOARD_PREFIX_PATH = "/dashboard";
export const VERIFY_EMAIL_PREFIX_PATH = "/confirm-email";
export const STAKE_PREFIX_PATH = "/stake";
export const MARKET_PREFIX_PATH = "/market";
export const DEPOSIT_PREFIX_PATH = "/deposit";
export const WITHDRAW_PREFIX_PATH = "/withdraw";
export const SUPPORT_PREFIX_PATH = "/support";
export const POOL_PREFIX_PATH = "/pool";
export const TRANSACTION_PREFIX_PATH = "/transaction";
export const SETTING_PREFIX_PATH = "/settings";
export const HELP_PREFIX_PATH = "/help";

export enum PaymentStatus {
  Waiting = 'waiting',
  Confirming = 'confirming',
  Confirmed = 'confirmed',
  Sending = 'sending',
  PartiallyPaid = 'partially_paid',
  Finished = 'finished',
  Failed = 'failed',
  Refunded = 'refunded',
  Expired = 'expired',
}


export const STAGEEMUM = {
  FIRST: "FIRST",
  SECOND: "SECOND",
  THIRD: "THIRD",
}

export const BETCHOICEOPTION = {
  BASE_UP: "base_up",
  BASE_DOWN: "base_down",
  TARGET_UP: "target_up",
  TARGET_DOWN: "target_down",
}

export const DEFAULTDEPOSITTEMPLATE = {
  TWENTY: 20,
  TWENTFIVE: 25,
  THIRTY: 30,
  FITHY: 50,
  SEVENTY: 70,
  ONEHUNDRED: 100,
  TWOHUNDRED: 200,
  THREEHUNDRED: 300,
  FIVEHUNDRED: 500,
}

export const DEFAULTDEPOSITCURRENCYTEMPLATE = {
  BTC: 'btc',
  ETHEREUM: 'eth',
  UNISWAP: 'uni',
  DOGE: 'doge',
  TRON: 'trx',
}

export enum BetResult {
  NoResult = 'no_result',
  Draw = 'draw',
  Won = 'won',
  Lost = 'lost',
}

export enum TransactionStatusEnum {
  BETPLACED = 'place_bet',
  BET_WON = 'place_bet_won',
  BET_DRAW = 'place_bet_draw',
  DEBIT = 'debit',
  CREDIT = 'credit',
}

export enum TransactionStatusEnum {
  Expired = 'expired',
  Waiting = 'waiting',
  Canceled = 'canceled',
  Finished = 'finished',
}

export const OTPTYPE = {
  EMAIL: 1,
  PHONE: 2,
}

export const DEFAULTPAGINATION = 30;