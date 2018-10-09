const DEFAULT_TWEETS = [
    {
        id: 1,
        author: 'koorchik1',
        text: 'WebbyLab 7 years! Thank you everyone working with us! 🎉🎉🎉',
        numberOfLikes: 123,
        numberOfRetweets: 321,
        date: new Date().toLocaleDateString()
    },
    {
        id: 2,
        author: 'koorchik2',
        text: 'WebbyLab 7 years! Thank you everyone working with us! 🎉🎉🎉',
        numberOfLikes: 123,
        numberOfRetweets: 321,
        date: new Date().toLocaleDateString()
    },
    {
        id: 3,
        author: 'koorchik',
        text: 'WebbyLab 7 years! Thank you everyone working with us! 🎉🎉🎉',
        numberOfLikes: 123,
        numberOfRetweets: 321,
        date: new Date().toLocaleDateString()
    },
    {
        id: 4,
        author: 'koorchik',
        text: 'WebbyLab 7 years! Thank you everyone working with us! 🎉🎉🎉',
        numberOfLikes: 123,
        numberOfRetweets: 321,
        date: new Date().toLocaleDateString()
    }
];

export default function(state = DEFAULT_TWEETS, action) {
    return state;
}
