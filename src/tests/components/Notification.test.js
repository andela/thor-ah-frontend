import React from "react";
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Notification from '../../components/Notification/Notification';

const state = {
    comments: {
        newComment: {
            loading: true,
        }
    }
}
const mockStore = configureMockStore();
const store = mockStore(state);
describe('Notifications component', () => {
    test("renders the Notification component", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <Notification />
            </Provider>
        );

        expect(wrapper.exists()).toBe(true);
    });
});