import Base from './Base.js';

class Tweets extends Base {
    async list(params) {
        const resp = await this.apiClient.get('tweets', {
            ...params,
            include: 'authors'
        });

        const tweets = resp.data.map(tweet =>
            this._enrichTweet(tweet, { authors: resp.linked.authors })
        );

        return tweets.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
                return 1;
            } else if (a.createdAt > b.createdAt) {
                return -1;
            }
            return 0;
        });
    }

    create({ title, text, image }) {
        const tweet = { title, text, image, subtitle: title };
        return this.apiClient.post('tweets', tweet);
    }

    show(id) {
        return this.apiClient.get(`tweets/${id}`);
    }

    edit(id, body) {
        return this.apiClient.put(`tweets/${id}`, body);
    }

    delete(id) {
        return this.apiClient.delete(`tweets/${id}`);
    }

    _enrichTweet(originalTweet, { authors }) {
        const authorsById = {};
        authors.forEach(author => {
            authorsById[author.id] = author;
        });

        return {
            ...originalTweet,
            author: authorsById[originalTweet.userId].email,
            numberOfLikes: Math.ceil(Math.random() * 100),
            numberOfRetweets: Math.ceil(Math.random() * 100)
        };
    }
}

export default Tweets;
