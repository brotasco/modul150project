import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './Navigation.scss';
import { login, logout } from '../../redux/actions/index';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {dispatch(login(user))},
        logout: () => {dispatch(logout())}
    }
}

class Navigation extends React.Component{

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    logout(){
        this.props.logout();
        this.sleep(100).then(() => {
            window.location.replace('/login');
        });
    }

    render(){
        console.log(this.props);
        return(
            <div className='navigation'>
                <nav>
                    <p className="mainLabel">DirectContact</p>
                    {!this.props.user ? (
                        <ul>
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    ) : (
                        <ul>
                            <li><Link to='/profile'>Profile</Link></li>
                            <input type="button" onClick={() => this.logout()} value="Logout"/>
                        </ul>
                    )
                    }
                </nav>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);