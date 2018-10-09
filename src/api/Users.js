import Base from './Base.js';

class Users extends Base {
    async show(id) {
        const resp = await this.apiClient.get(`users/${id}`);
        return resp.data;
    }

    update(id, body) {
        return this.apiClient.put(`users/${id}`, body);
    }

    resetPasswordByEmail({ email }) {
        return this.apiClient.post(`users/resetPassword`, { email });
    }

    resetPasswordBySMS({ phone }) {
        return this.apiClient.post(`users/resetPassword`, { phone });
    }
}

export default Users;
