import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type EventHandler = (data: any) => void;

const useWebSocket = (url: string, eventHandlers: { [key: string]: EventHandler }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url);

    socketRef.current = socket;

    // Register event handlers
    Object.keys(eventHandlers).forEach(event => {
      socket.on(event, eventHandlers[event]);
    });

    return () => {
      if (socketRef.current) {
        Object.keys(eventHandlers).forEach(event => {
          socketRef.current?.off(event, eventHandlers[event]);
        });
        socketRef.current.disconnect();
      }
    };
  }, [url, eventHandlers]);

  const emit = (event: string, data: any) => {
    socketRef.current?.emit(event, data);
  };

  return { emit };
};

export default useWebSocket;