import { useEffect, useState } from 'react';
import axios from 'axios';

// Define the structure of the candlestick data
interface Candle {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

// Define the raw data type from Binance API
type RawCandle = [
  number, // timestamp
  string, // open
  string, // high
  string, // low
  string, // close
  string, // volume
  number, // close time
  string, // quote asset volume
  number, // number of trades
  string, // taker buy base asset volume
  string, // taker buy quote asset volume
  string  // ignore
];

// Custom hook to fetch candlestick data
export const useCandlestickData = (symbol: string, interval: string) => {
  const [data, setData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RawCandle[]>(
          `https://api.binance.com/api/v3/klines`,
          {
            params: {
              symbol,
              interval,
            },
          }
        );
        const rawData = response.data;
        const formattedData: Candle[] = rawData.map(([timestamp, open, high, low, close]) => ({
          timestamp,
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close),
        }));
        setData(formattedData);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, interval]);

  return { data, loading, error };
};
