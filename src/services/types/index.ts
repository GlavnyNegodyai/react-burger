import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionCreator } from 'redux';

import { store } from '../../store/store';
import { TApplicationActions } from '../actions';
 
export type RootState = ReturnType<typeof store.getState>; 

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, RootState, undefined,  TApplicationActions>
>;

export type AppDispatch = ThunkDispatch<RootState, undefined, TApplicationActions>;