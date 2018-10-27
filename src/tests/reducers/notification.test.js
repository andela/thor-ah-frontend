import notification from '../../reducers/notification'
import {
    NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR
} from '../../actionTypes/notification'

describe('notification reducer', () => {
    it('should return initial state', () => {
        expect(notification(undefined, {})).toEqual(
            {
                error: '',
                notifications: []
            }
        );
    });

    it('should handle NOTIFICATION_SUCCESS', () => {
        const action = { type: NOTIFICATION_SUCCESS, payload: { notifications: [] } };
        expect(notification({}, action)).toEqual({
            notifications: []
        });
    });

    it('should handle NOTIFICATION_ERROR', () => {
        const action = { type: NOTIFICATION_ERROR, payload: '' };
        expect(notification({}, action)).toEqual({
            error: ''
        });
    });
});
