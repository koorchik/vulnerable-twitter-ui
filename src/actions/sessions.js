import jwt from 'jwt-simple';
import api from '../apiSingleton.js';
import history from '../history.js';

// export const LOGIN = 'LOGIN';
// export const LOGOUT = 'LOGOUT';

export function login({ email, password }) {
    return async dispatch => {
        try {
            const { jwt: token } = await api.sessions.login({
                email,
                password
            });

            console.log(jwt);

            // const userData = jwt.decode(token, '', true);

            api.apiClient.setToken(token);
            localStorage.setItem('token', token);

            // dispatch({
            //     type: LOGIN,
            //     payload: userData
            // });

            history.push('/');
        } catch (err) {
            throw err;
        }
    };
}

export function logout() {
    return dispatch => {
        api.apiClient.setToken('');
        localStorage.setItem('token', '');

        // dispatch({ type: LOGOUT });

        history.push('/');
    };
}

export function checkSession() {
    return dispatch => {
        const { pathname } = history.location;

        const token = localStorage.getItem('token');

        if (!token) {
            if (pathname !== '/login') history.push('/login');

            return;
        }

        api.apiClient.setToken(token);

        // const userData = jwt.decode(token, '', true);

        // dispatch({
        //     type: LOGIN,
        //     payload: userData
        // });

        if (pathname === '/login') history.push('/');
    };
}
