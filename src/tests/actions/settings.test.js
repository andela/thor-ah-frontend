import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { emailNotifyStatus } from "../../actions/settings";
import * as types from "../../actionTypes/settings";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

const URL = "https://api.sendgrid.com/v3";

describe("notification actions", () => {
  afterEach(() => {
    moxios.reset();
  });

  describe("emailNotifyStatus", () => {
    it("dispatches NOTIFY_STATUS", () => {
      moxios.onGet(`${URL}/asm/suppressions/author@mail.com`).reply(200, {
        suppressions: [
          {
            id: 10989,
            name: "Author-Haven(Articles)",
            description:
              "Unsubscribe when a an author create a new article and the followers get an aemail notification",
            last_email_sent_at: null,
            is_default: false,
            suppressed: true
          }
        ]
      });
      const expectedActions = [
        { type: types.NOTIFY_LOADING, payload: true },
        {
          type: types.NOTIFY_STATUS,
          payload: [
            {
              id: 10989,
              name: "Author-Haven(Articles)",
              description:
                "Unsubscribe when a an author create a new article and the followers get an aemail notification",
              last_email_sent_at: null,
              is_default: false,
              suppressed: true
            }
          ]
        }
      ];
      const store = mockStore({ settings: {} });
      return store.dispatch(emailNotifyStatus("author@mail.com")).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
    it("dispatches NOTIFY_ERROR", () => {
      moxios
        .onGet(`${URL}/asm/suppressions/author@mail.com`)
        .networkError("server error");
      const store = mockStore({ settings: {} });
      return store.dispatch(emailNotifyStatus("author@mail.com")).then(() => {
        const recievedActions = store.getActions();
        const failureAction = recievedActions.find(action => action.type === types.NOTIFY_ERROR);
        expect(failureAction).toBeTruthy();
      });
    });
  });
});
