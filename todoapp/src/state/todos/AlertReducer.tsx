import { AlertAction, AlertActionTypes } from "./AlertActions";
import { AlertState } from "components/Constants";

const initialState: AlertState = {
  popUpAlert: false,
};

const alertReducer = (state = initialState, action: AlertAction): AlertState => {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT:
      return {
        ...state,
        popUpAlert: true,
      };
    case AlertActionTypes.DISABLE_ALERT:
      return {
        ...state,
        popUpAlert: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
// End of File (EOF)
