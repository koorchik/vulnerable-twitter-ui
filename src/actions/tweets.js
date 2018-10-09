import api from '../apiSingleton.js';

export function loadTweets() {
    return async dispatch => {
        return api.tweets.list();
    };
}

export function createTweet({ title, text, image } = {}) {
    return async dispatch => {
        console.log({ title, text, image });
        return api.tweets.create({ title, text, image });
    };
}
