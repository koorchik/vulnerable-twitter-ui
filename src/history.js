import createBrowserHistory from 'history/createBrowserHistory';
import qhistory from 'qhistory';
import { parse, stringify } from 'query-string';

const history = qhistory(createBrowserHistory(), stringify, parse);
window.myHistory = history;
export default history;
