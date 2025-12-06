import { Middleware } from 'redux';
import { updateTokens, getAccessToken } from "../../utils/auth-cookies";

export type TWsActions = {
  wsInit: string;
  wsSend: string;
  wsClose: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action as { type: string; payload?: any };

      if (type === wsActions.wsInit) {
        const newWsUrl = payload ? `${wsUrl}?token=${payload}` : wsUrl;
        socket = new WebSocket(newWsUrl);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsActions.onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActions.onError, payload: event });
        };

        socket.onmessage = async (event) => {
          const data = JSON.parse(event.data);

          if (!data.success && data.message === "Invalid or missing token") {
            try {
              await updateTokens();
              socket?.close();
              dispatch({type: wsActions.wsInit, payload: getAccessToken() })
            } catch (error) {
              console.error("Ошибка в процессе получения заказов:", error);
              
            }
            return;
            
          }
        store.dispatch({ type: wsActions.onMessage, payload: data });
        };

        socket.onclose = (event) => {
          dispatch({ type: wsActions.onClose, payload: event });
        };

        if (type === wsActions.wsSend) {
          socket.send(JSON.stringify(payload));
        }

        if (type === wsActions.wsClose) {
          socket.close();
        }
      }
      next(action);
    };
  };
};

