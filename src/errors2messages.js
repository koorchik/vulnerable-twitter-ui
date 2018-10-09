//TODO think about -https://gist.github.com/koorchik/fd27cc60404dab6f9ad46be388eabf71

function createErrorFormatter(mapping) {
    return (errors, { context = '' } = {}) => {
        const messages = {};

        for (const field in errors) {
            const error = errors[field];

            const message =
                mapping[`${context}:${field}/${error}`] ||
                mapping[`${context}:${error}`] ||
                mapping[`${field}/${error}`] ||
                mapping[`${error}`] ||
                error;

            messages[field] =
                typeof message === 'function'
                    ? message({ field, error, context })
                    : message;
        }

        return messages;
    };
}

const errors2messages = createErrorFormatter({
    WRONG_EMAIL: 'Wrong email format',
    REQUIRED: 'Required',
    'LOGIN:INVALID': 'No such user'
});

export default errors2messages;
