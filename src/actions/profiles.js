import api from '../apiSingleton.js';

export function loadProfile({ userId }) {
    console.log('userId', userId);
    return async dispatch => {
        return api.users.show(userId);
    };
}

export function updateProfile(id, { firstName }) {
    console.log('START updateProfile');
    return async dispatch => {
        console.log('updateProfile', firstName);
        return api.users.update(id, { firstName });
    };
}

export function resetPasswordByEmail({ email }) {
    console.log('START resetPasswordByEmail');
    return async dispatch => {
        console.log('resetPasswordByEmail', email);
        return api.users.resetPasswordByEmail({ email });
    };
}
