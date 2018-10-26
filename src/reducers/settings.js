import * as types from "../actionTypes/settings";
//  initial state
import initialState from "../store/initialState";

export default function reducer(
  state = initialState.settings.notification,
  action
) {
  switch (action.type) {
    case types.NOTIFY_STATUS:
      return {
        ...state,
        notifyArticle: action.payload[0].suppressed,
        notifyComment: action.payload[1].suppressed
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
