import { StockColumnType } from "./types";

export interface StocksResponse {
	count: number;
	data: StockInterface[];
	status: string;
}

export interface StockInterface {
  country: string;
  currency: string
  exchange: string;
  mic_code: string;
  name:string;
  symbol: string;
  type: string;
}

export interface ColumnInterface {
  id: StockColumnType;
  label: string;
  minWidth?: number;
}
