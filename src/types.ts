export type MarketType = "NYSE" | "NASDAQ" | "BCBA";
export type StockColumnType = "symbol" | "name" | "currency" | "type";

export type TypographyType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TypographyVariantType =
  | TypographyType
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "inherit"
  | "overline"
  | "subtitle1"
  | "subtitle2";

export interface StocksResponse {
  count: number;
  data: StockInterface[];
  status: string;
}

export interface StockInterface {
  country: string;
  currency: string;
  exchange: string;
  mic_code: string;
  name: string;
  symbol: string;
  type: string;
}

export interface ColumnInterface {
  id: StockColumnType;
  label: string;
  minWidth?: number;
}
