import React from 'react';
import axios from 'axios';

import '../auth.scss';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

class Register extends React.Component{

    constructor(props){
        super(props);

        if(props.user){
            props.history.push('/profile');
        }

        this.state = {
            formValue: {},
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

    register(){
        if(this.state.password === this.state.repassword){
            this.setState({
                formValue: {
                    ...this.state.formValue,
                }
            });

            var newUser = {
                username: this.state.formValue.username,
                firstname: this.state.formValue.firstname,
                lastname: this.state.formValue.lastname,
                email: this.state.formValue.email,
                addresses: null,
                password: this.state.formValue.password,
                profilePic: null,
            }
            axios.put('http://localhost:8080/user/register', newUser).then((response) => {
                if(response.data.status){
                    this.props.history.push('/login');
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
    
    render(){
        return(
            <div className='register'>
                <h2>Register</h2>
                <form>
                    <input type="text" placeholder="Username" onChange={(e) => this.changeFormValue(e.target.value, 'username')}/><br/>
                    <input type="text" placeholder="Firstname" onChange={(e) => this.changeFormValue(e.target.value, 'firstname')}/><br/>
                    <input type="text" placeholder="Lastname" onChange={(e) => this.changeFormValue(e.target.value, 'lastname')}/><br/>
                    <input type="email" placeholder="Email" onChange={(e) => this.changeFormValue(e.target.value, 'email')}/><br/>
                    <input type="password" placeholder="Password" onChange={(e) => this.changeFormValue(e.target.value, 'password')}/><br/>
                    <input type="password" placeholder="Password" onChange={(e) => this.changeFormValue(e.target.value, 'repassword')}/><br/>
                    <input onClick={() => this.register()}  type="button" value="Register" accept="image/*"/>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);