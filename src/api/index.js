import ApiClient from './ApiClient.js';
import SessionsAPI from './Sessions.js';
import TweetsAPI from './Tweets.js';
import UsersAPI from './Users.js';

export default function({ apiPrefix } = {}) {
    if (!apiPrefix) {
        throw new Error('[apiPrefix] required');
    }

    const api = new ApiClient({ prefix: apiPrefix });

    return {
        apiClient: api,
        sessions: new SessionsAPI({ apiClient: api }),
        tweets: new TweetsAPI({ apiClient: api }),
        users: new UsersAPI({ apiClient: api })
    };
}
