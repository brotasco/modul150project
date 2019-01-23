import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { Login, Register } from './components/auth';

import './Body.scss';
import { Profile } from './components/Profile/index';

export default class Body extends React.Component{
    render(){
        return(
            <div className='body'>
                <Switch>
                    <Route path='/register' component={Register}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/profile' component={Profile}/>
                </Switch>
            </div>
        );
    }
}