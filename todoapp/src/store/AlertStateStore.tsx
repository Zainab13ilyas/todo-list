import { hookstate, useHookstate } from "@hookstate/core";

const initialTodos = {
  PopUpAlert: false
};

const globalTodos = hookstate(initialTodos);

export const useGlobalAlertState = () => {
  const showAlert = useHookstate(globalTodos);

  return {
    getValue: () => showAlert.PopUpAlert.value,
    setAlert: () => {
      showAlert.PopUpAlert.set(true);
    },
    disableAlert: () => {
      showAlert.PopUpAlert.set(false);
    }
  };
};
// End of File (EOF)
