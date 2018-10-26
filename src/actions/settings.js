import axios from "axios";
import * as types from "../actionTypes/settings";

const URL = "https://api.sendgrid.com/v3";
const token =
  "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";
const NotifyOptOut = payload => ({
  type: types.NOTIFY_OPT_OUT,
  payload
});

const NotifyOptIn = payload => ({
  type: types.NOTIFY_OPT_IN,
  payload
});

const NotifyStatus = payload => ({
  type: types.NOTIFY_STATUS,
  payload
});

const NotifyLoading = payload => ({
  type: types.NOTIFY_LOADING,
  payload
});

export const emailNotifyStatus = email => dispatch => {
  dispatch(NotifyLoading(true));
  return axios
    .get(`${URL}/asm/suppressions/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      console.log("=======>", response.data);
      const state = response.data.suppressions.some(s => s.id === "10989" && "10990");
      console.log(state);
      dispatch(NotifyLoading(true));
      dispatch(NotifyStatus(state));
    });
};

export const emailNotifyOptOut = (groupId, email) => dispatch => {
  dispatch(NotifyOptOut(false));
  return axios
    .post(
      `${URL}/asm/groups/${groupId}/suppressions`,
      {
        recipient_emails: [email]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then(response => {
      dispatch(NotifyOptOut(response));
      dispatch(NotifyStatus(false));
    });
};

export const emailNotifyOptIn = (groupId, email) => dispatch => {
  dispatch(NotifyOptIn(false));
  return axios
    .delete(`${URL}/asm/groups/${groupId}/suppressions/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(NotifyOptIn(response));
      dispatch(NotifyStatus(true));
    });
};
