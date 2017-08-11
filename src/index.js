import dva from 'dva';
import Router from './router';

import './view/Style.css';

import customer from './model/customer';
import credit_card from './model/credit_card';

const app = dva();

app.model(customer);
app.model(credit_card);

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');