import Base from './Base.js';

class Sessions extends Base {
    async login({ email, password }) {
        const resp = await this.apiClient.post('sessions', { email, password });
        return resp.data;
    }
}

export default Sessions;
