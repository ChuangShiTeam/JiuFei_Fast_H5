import dva from 'dva';
import Router from './router';
import FastClick from 'fastclick';

import './view/Style.css';

import index from './model/index';
import customer from './model/customer';
import credit_card from './model/credit_card';

FastClick.attach(document.body);

const app = dva();

app.model(index);
app.model(customer);
app.model(credit_card);

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');