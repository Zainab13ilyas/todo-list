import { AlertAction, AlertActionTypes } from "./AlertActions";
import { AlertState } from "components/Constants";

const initialState: AlertState = {
  PopUpAlert: false,
};

const alertReducer = (state = initialState, action: AlertAction): AlertState => {
  switch (action.type) {
    case AlertActionTypes.SET_ALERT:
      return {
        ...state,
        PopUpAlert: true,
      };
    case AlertActionTypes.DISABLE_ALERT:
      return {
        ...state,
        PopUpAlert: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
// End of File (EOF)