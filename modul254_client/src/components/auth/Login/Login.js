import React from 'react';
import axios from 'axios';
import '../auth.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../../redux/actions/index';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {dispatch(login(user))},
    }
}

class Login extends React.Component{
    constructor(props){
        super(props);

        if(props.user){
            props.history.push('/profile');
        }

        this.state = {
            formValue: {}
        }
    }

    changeFormValue(newValue, attributeName){
        this.setState({
            formValue: {
                ...this.state.formValue,
                [attributeName]: newValue
            }
        });
    }

    login(){
        var newUser = {
            username: this.state.formValue.username,
            firstname: null,
            lastname: null,
            email:  null,
            addresses: null,
            password: this.state.formValue.password,
            profilePic: null,
        }

        axios.post('http://localhost:8080/user/login', newUser).then(response => {
            if(response.data.status){
                this.props.login(response.data.returnObject);
                this.sleep(500).then(() => {
                    this.props.history.push('/profile');
                });
            }
        }).catch(error => {
            
        })
    }

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    render(){
        return(
            <div className='login'>
                <h2>Login</h2>
                <form>
                    <input onChange={(e) => this.changeFormValue(e.target.value, 'username')} type="text" placeholder="username"/><br/>
                    <input onChange={(e) => this.changeFormValue(e.target.value, 'password')} type="password" placeholder="Password"/><br/>
                    <input onClick={() => this.login()} className="submit" type="button" value="Login"/>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);