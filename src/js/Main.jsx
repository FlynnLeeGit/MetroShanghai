import React from 'react';
import {Router,Route,hashHistory} from 'react-router';

import '../lib/bootstrap.css';
import '../scss/main.scss';

import Admin from './admin/Admin'; //后台页
import Home from './home/Home';  //前台页



const routes=(
   <Router history={hashHistory}>
        <Route path='/' component={Home} />
        <Route path='/admin' component={Admin} />   
   </Router>
);


export default routes;
