export enum AlertActionTypes {
  SET_ALERT = "SET_ALERT",
  DISABLE_ALERT = "DISABLE_ALERT",
}

interface SetAlertAction {
  type: AlertActionTypes.SET_ALERT;
}
interface DisableAlertAction {
  type: AlertActionTypes.DISABLE_ALERT;
}

export type AlertAction =
  | SetAlertAction
  | DisableAlertAction

export const setAlert = (): SetAlertAction => ({
  type: AlertActionTypes.SET_ALERT
});

export const disableAlert = (): DisableAlertAction => ({
  type: AlertActionTypes.DISABLE_ALERT
});

