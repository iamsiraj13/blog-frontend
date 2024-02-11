import { userAction } from "../reducers/userSlice";

export const logout = () => (dispatch) => {
  dispatch(userAction.resetUser());
  localStorage.removeItem("account");
};
