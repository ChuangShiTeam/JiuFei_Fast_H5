import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Home from './view/Home';
import Apply from './view/Apply';
import Sucess from './view/Sucess';

function RouterConfig({history}) {

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to="home"/>
                <Route path="home" component={Home}/>
                <Route path="apply" component={Apply}/>
                <Route path="sucess" component={Sucess}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
