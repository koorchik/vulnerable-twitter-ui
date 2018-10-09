import queryString from 'query-string';

export default class ApiClient {
    constructor({ prefix = 'v1/' } = {}) {
        this.prefix = prefix;
        this.token = '';
    }

    async get(url, params) {
        return this.request({
            url,
            params,
            method: 'GET'
        });
    }

    async post(url, payload = {}) {
        return this.request({
            url,
            method: 'POST',
            body: payload
        });
    }

    async put(url, payload = {}) {
        return this.request({
            url,
            method: 'PUT',
            body: payload
        });
    }

    async patch(url, payload = {}) {
        return this.request({
            url,
            method: 'PATCH',
            body: payload
        });
    }

    async delete(url, payload = {}) {
        return this.request({
            url,
            method: 'DELETE',
            body: payload
        });
    }

    async request({ url, method, params = {}, body }) {
        console.log('API_CLIENT', { url, method, params });
        if (this.token) {
            params.token = this.token; //eslint-disable-line
        }

        const query = Object.keys(params).length
            ? `?${queryString.stringify(params)}`
            : '';

        const response = await fetch(`${this.prefix}${url}${query}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                pragma: 'no-cache'
            },
            withCredentials: true,
            crossDomain: false,
            body: method !== 'GET' ? JSON.stringify({ data: body }) : undefined
        });

        const json = await response.json();

        if (json.status === 0) throw json.error;

        return json;
    }

    setToken(token) {
        this.token = token;
    }
}
