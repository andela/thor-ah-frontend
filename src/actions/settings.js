import axios from "axios";
import * as types from "../actionTypes/settings";

const URL = "https://api.sendgrid.com/v3";
const token = process.env.REACT_APP_SENDGRID_API_KEY;

const NotifyStatus = payload => ({
  type: types.NOTIFY_STATUS,
  payload
});

const NotifyLoading = payload => ({
  type: types.NOTIFY_LOADING,
  payload
});

const NotifyError = payload => ({
  type: types.NOTIFY_ERROR,
  payload
});

export const emailNotifyStatus = email => dispatch =>
  axios
    .get(`${URL}/asm/suppressions/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      dispatch(NotifyLoading(true));
      dispatch(NotifyStatus(response.data.suppressions));
    })
    .catch(() =>
      dispatch(
        NotifyError({
          error: { message: "Server unavailable at the moment" }
        })
      )
    );

export const emailNotifyOptOut = (groupId, email) => dispatch =>
  axios
    .post(
      `${URL}/asm/groups/${groupId}/suppressions`,
      { recipient_emails: [email] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    .then(() => {
      dispatch(emailNotifyStatus(email));
    })
    .catch(() =>
      dispatch(
        NotifyError({
          error: { message: "Server unavailable at the moment" }
        })
      )
    );

export const emailNotifyOptIn = (groupId, email) => dispatch =>
  axios
    .delete(`${URL}/asm/groups/${groupId}/suppressions/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(() => {
      dispatch(emailNotifyStatus(email));
    })
    .catch(() =>
      dispatch(
        NotifyError({
          error: { message: "Server unavailable at the moment" }
        })
      )
    );
