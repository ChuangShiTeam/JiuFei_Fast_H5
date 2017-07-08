import dva from 'dva';
import Router from './router';

import './view/Style.css';

import customer from './model/customer';

const app = dva();

app.model(customer);

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');