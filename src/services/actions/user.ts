import {
  getAccessToken,
  updateTokens,
  removeAccessToken,
  removeRefreshToken,
} from "../../utils/auth-cookies";
import { TuserData } from "../types/data";
import { BASE_URL } from "../../utils/base-url";
import { checkResponse } from "../../utils/check-response";
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 

export const USER_REQUEST: "USER_REQUEST" = "USER_REQUEST";
export const USER_SUCCESS: "USER_SUCCESS" = "USER_SUCCESS";
export const USER_FAIL: "USER_FAIL" = "USER_FAIL";
export const USER_REMOVE:  "USER_REMOVE" = "USER_REMOVE";

export type TuserRequestAction = {
    readonly type: typeof USER_REQUEST;
};

export type TuserSuccessAction = {
    readonly type: typeof USER_SUCCESS;
    readonly payload: TuserData;
};

export type TuserFailAction = {
    readonly type: typeof USER_FAIL;
    readonly payload: string;
};

export type TuserRemoveAction = {
    readonly type: typeof USER_REMOVE;
};

export type TuserActions = 
    TuserRequestAction | 
    TuserSuccessAction | 
    TuserRemoveAction | 
    TuserFailAction ;

const userRequest = (): TuserRequestAction => ({ type: USER_REQUEST });
const userSuccess = (user: TuserData): TuserSuccessAction => ({ type: USER_SUCCESS, payload: user });
const userError = (error: string): TuserFailAction => ({ type: USER_FAIL, payload: error });
const userRemove = (): TuserRemoveAction => ({ type: USER_REMOVE });

export const getUser: AppThunk = (navigate) => async (dispatch: AppDispatch) => {
  dispatch(userRequest());
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getAccessToken()}`,
      },
    });


    if (response.status === 401 || response.status === 403) {
      try {
        const newToken = await updateTokens();

        const retryResponse = await fetch(`${BASE_URL}/auth/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken}`,
          },
        });

        if (retryResponse.status === 401 || response.status === 403) {
          dispatch(removeUser(navigate));
          return;
        }

        const retryData = await checkResponse(retryResponse);
        dispatch(userSuccess(retryData.user));

        return;
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
        dispatch(userError(err.message));
        }
        else {
          dispatch(userError('Unknown error'));
        }
        return;
      }
    }

    const data = await checkResponse(response);
    dispatch(userSuccess(data.user));
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
    dispatch(userError(error.message));
    }
    else {
      dispatch(userError('Unknown error'));
    }
  }
};

export const updateUser: AppThunk = (email, name, navigate) => async (dispatch: AppDispatch) => {
  dispatch(userRequest());
  try {
    const response = await fetch(`${BASE_URL}/auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    });

    if (response.status === 401 || response.status === 403) {
      try {
        const newToken = await updateTokens();

        const retryResponse = await fetch(`${BASE_URL}/auth/user`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify({
            email: email,
            name: name,
          }),
        });

        if (retryResponse.status === 401 || retryResponse.status === 403) {
          dispatch(removeUser(navigate));
          return;
        }

        const retryData = await checkResponse(retryResponse);
        dispatch(userSuccess(retryData.user));
        return;

      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
        dispatch(userError(err.message));
        }
        else {
          dispatch(userError('Unknown error'));
        }
        return;
      }
    }

    const data = await checkResponse(response);
    dispatch(userSuccess(data.user));

  } catch (error) {
    if (error instanceof Error) {
    dispatch(userError(error.message));
    }
    else {
      dispatch(userError('Unknown error'));
    }
  }
};

export const removeUser: AppThunk = (navigate) => (dispatch: AppDispatch) => {
  removeAccessToken();
  removeRefreshToken();
  dispatch(userRemove());
  navigate("/");
};
