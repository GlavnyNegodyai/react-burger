import { TresetPasswordPostActions,
        RESET_PASSWORD_POST_REQUEST,
        RESET_PASSWORD_POST_SUCCESS,
        RESET_PASSWORD_POST_FAIL
} from "../actions/reset-password";

type TinitialState = {
    isResetPasswordLoading: boolean;
    resetPasswordError: string | null;
};

const initialState: TinitialState = {
    isResetPasswordLoading: false,
    resetPasswordError: null,
};

export const resetPasswordReducer = (state = initialState, action: TresetPasswordPostActions) => {
    switch(action.type){
        case RESET_PASSWORD_POST_REQUEST:
            return {
                ...state,
                isResetPasswordLoading: true,
                resetPasswordError: null,
            }
        case RESET_PASSWORD_POST_SUCCESS:
            return {
                ...state,
                isResetPasswordLoading: false,
            }
        case RESET_PASSWORD_POST_FAIL:
            return {
                ...state,
                resetPasswordError: action.payload,
                isResetPasswordLoading: false
            }
        default:
            return state;
    }
}

