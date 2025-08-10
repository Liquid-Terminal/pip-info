import { useState, useEffect, useRef } from 'react';
import { WEBSOCKET_CONFIG, PROJECT_CONFIG } from '@/config/constants';


interface UseRealTimePriceProps {
  coinId?: string;
  refreshInterval?: number;
}

interface UseRealTimePriceReturn {
  price: number;
  lastUpdated: string;
  loading: boolean;
  error: string | null;
  isConnected: boolean;
}

export function useRealTimePrice({ 
  coinId = PROJECT_CONFIG.PIP.hyperliquidCoinId,
}: UseRealTimePriceProps): UseRealTimePriceReturn {
  const [price, setPrice] = useState<number>(0);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      try {
        setLoading(true);
        setError(null);
        
        const ws = new WebSocket(WEBSOCKET_CONFIG.HYPERLIQUID_WS_URL);
        wsRef.current = ws;

        ws.onopen = () => {
          console.log('WebSocket connected to HyperLiquid');
          setIsConnected(true);
          setLoading(false);
          
          // Subscribe to HYPE trades
          ws.send(JSON.stringify({
            method: "subscribe",
            subscription: { type: "trades", coin: coinId }
          }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            // Handle trades messages
            if (data.type === 'trades' && data.data && data.data.length > 0) {
              // Get the latest trade price
              const latestTrade = data.data[data.data.length - 1];
              if (latestTrade.px) {
                const newPrice = parseFloat(latestTrade.px);
                setPrice(newPrice);
                setLastUpdated(new Date().toISOString());
              }
            }
          } catch (parseError) {
            console.error('Error parsing WebSocket message:', parseError);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setError('WebSocket connection error');
          setIsConnected(false);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          setLoading(false);
          
          // Attempt to reconnect after 5 seconds
          if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
          }
          reconnectTimeoutRef.current = setTimeout(() => {
            connectWebSocket();
          }, 5000);
        };

      } catch (error) {
        console.error('Error connecting to WebSocket:', error);
        setError('Failed to connect to WebSocket');
        setLoading(false);
      }
    };

    connectWebSocket();

    // Cleanup function
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [coinId]);

  return {
    price,
    lastUpdated,
    loading,
    error,
    isConnected,
  };
}
