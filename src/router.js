import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Home from './view/Home';
import Apply from './view/Apply';
import Sucess from './view/Sucess';
import Index from './view/Index';
import CreditCardIndex from './view/credit_card/CreditCardIndex';

function RouterConfig({history}) {

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to="index"/>
                <Route path="home" component={Home}/>
                <Route path="apply" component={Apply}/>
                <Route path="sucess" component={Sucess}/>
                <Route path="index" component={Index}/>
                <Route path="credit/card/index" component={CreditCardIndex}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
