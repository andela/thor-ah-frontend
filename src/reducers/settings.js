import * as types from "../actionTypes/settings";
//  initial state
import initialState from "../store/initialState";

export default function reducer(
  state = initialState.settings.notification,
  action
) {
  switch (action.type) {
    case types.NOTIFY_OPT_OUT:
      return {
        ...state,
        notifyOptOut: action.payload
      };
    case types.NOTIFY_OPT_IN:
      return {
        ...state,
        notifyOptIn: action.payload
      };
    case types.NOTIFY_STATUS:
      return {
        ...state,
        notifyArticle: action.payload
      };
    case types.NOTIFY_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
}
