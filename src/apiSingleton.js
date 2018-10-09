import config from './config';
import apiFactory from './api';

const api = apiFactory({ apiPrefix: config.apiPrefix });
window.api = api;

export default api;
