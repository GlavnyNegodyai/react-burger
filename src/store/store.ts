import { createStore, applyMiddleware, compose } from 'redux';
import { rootReducer } from '../services/reducers/index';
import { thunk } from 'redux-thunk';
import { WS_BASE_URL } from '../utils/ws-base-url';
import { allFeedWsActions } from '../services/actions/all-orders-feed';
import { userFeedWsActions } from '../services/actions/user-orders-feed';
import { socketMiddleware } from '../services/middlewares/ws-middleware';
import { composeWithDevTools } from '@redux-devtools/extension';
import type { RootState, AppThunk, AppDispatch } from '../services/types';

const composedEnhancers = composeWithDevTools(
  applyMiddleware(
    thunk,
    socketMiddleware(`${WS_BASE_URL}/orders/all`, allFeedWsActions),
    socketMiddleware(`${WS_BASE_URL}/orders`, userFeedWsActions)
  )
);

export const store = createStore(
    rootReducer, undefined, composedEnhancers);
