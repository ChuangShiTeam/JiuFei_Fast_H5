import dva from 'dva';
import Router from './router';
import FastClick from 'fastclick';

import './view/Style.css';

import customer from './model/customer';

FastClick.attach(document.body);

const app = dva();

app.model(customer);

app.router(Router);

document.getElementById("loading").remove();

app.start('#root');