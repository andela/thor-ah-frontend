import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { fetchNotifications, deleteNotification, success } from "../../actions/notification";

import {
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR
} from '../../actionTypes/notification'

const API = process.env.REACT_APP_API;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const moxios = new MockAdapter(axios);

describe("Notifications", () => {
    afterEach(() => {
        moxios.reset();
    });
    describe('fetchNotifications', () => {
        it('dispatches NOTIFICATION_SUCCESS ', () => {
            moxios.onGet(`${API}/api/users/notifications`).reply(200, {
                notifications: [{ message: 'test notification' }]
            })
            const expectedActions = [
                { type: NOTIFICATION_SUCCESS, payload: { notifications: [{ message: 'test notification' }] } }
            ]
            const store = mockStore({ notification: {} });
            return store.dispatch(fetchNotifications()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });
        })
    })

    describe('deleteNotifications', () => {
        it('dispatches NOTIFICATION_SUCCESS ', () => {
            moxios.onDelete(`${API}/api/users/notifications/2`).reply(200, {
            })
            const store = mockStore({ notification: {} });
            return store.dispatch(deleteNotification(2)).then(() => {
                expect(store.getActions()).toEqual([{ "payload": "server unreachable", "type": "NOTIFICATION_ERROR" }]);
            });
        })
    })
})
