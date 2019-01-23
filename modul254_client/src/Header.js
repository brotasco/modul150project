import React from 'react';
import Navigation from './components/Navigation/Navigation';

export default class Header extends React.Component{
    render(){
        return(
            <div className="header">
                <Navigation />
            </div>
        )
    }
}