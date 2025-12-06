import { TburgerIngredientsActions } from './burger-ingredients';
import { TconstructorActions } from './burger-constructor';
import { TIngredientDetailsActions } from './ingredient-details';
import { TconstructorSendOrderActions } from './order-details';
import { TforgotPasswordPostActions } from './forgot-password';
import { TresetPasswordPostActions } from './reset-password';
import { TregisterPostActions } from './register';
import { TloginPostActions } from './login';
import { TuserActions } from './user';
import { TallFeedWsActions } from './all-orders-feed';
import { TuserFeedWsActions } from './user-orders-feed'; 
import { TorderDetailsActions } from './order-composition';

export type TApplicationActions = 
    TburgerIngredientsActions |
    TconstructorActions |
    TIngredientDetailsActions |
    TconstructorSendOrderActions |
    TforgotPasswordPostActions |
    TresetPasswordPostActions | 
    TregisterPostActions |
    TloginPostActions |
    TuserActions |
    TallFeedWsActions |
    TuserFeedWsActions |
    TorderDetailsActions;

