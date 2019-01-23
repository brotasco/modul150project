import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './Profile.scss';
import axios from 'axios';
import { login } from '../../redux/actions/index';
import firebase from 'firebase';
import FileUploader from "react-firebase-file-uploader";

Modal.setAppElement('#root');

const modalStyle = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {dispatch(login(user))}
    }
}

class Profile extends React.Component{
    constructor(props){
        super(props);

        if(!props.user){
            props.history.push('/login');
        }

        if(props.user.profilePic){
            firebase
            .storage()
            .ref("images")
            .child(props.user.profilePic)
            .getDownloadURL()
            .then(url => this.setState({ avatarURL: url }));
        }

        this.state = {
            modalIsOpen: false,
            addressModalIsOpen: false,
            formValue: {},
            addressFormValue: {},
            updateStatus: null,
            avatar: "",
            isUploading: false,
            progress: 0,
            avatarURL: "",
            oldFilename: props.user.profilePic,
        }
    }

    sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    
    handleProgress = progress => this.setState({ progress });
    
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleDelete = oldFilename => {
        firebase
        .storage()
        .ref("images")
        .child(oldFilename)
        .delete()
        .then(() => {
            console.log('Old File deleted!');
        })
        .catch((err) => {
            console.error(err);
        });
    }

    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ avatarURL: url }));

        this.setState({formValue: {
            ...this.props.user,
            repassword: this.props.user.password
        }});
        this.sleep(200).then(() => {
            this.changeFormValue(filename, 'profilePic');
        });
        this.sleep(200).then(() => {
            this.updateUser();
            this.handleDelete(this.state.oldFilename);
        });
        console.log(filename);
    };

    changeFormValue(newValue, attributeName){
        this.setState({
            formValue: {
                ...this.state.formValue,
                [attributeName]: newValue
            }
        });
    }

    openModal(){
        this.setState({modalIsOpen: true, formValue: this.props.user, updateSuccess: false});
    }

    closeModal(){
        this.setState({modalIsOpen: false});
    }

    updateUser(){
        console.log(this.state.formValue);
        if(this.state.formValue.password === this.state.formValue.repassword){
            var newUser = {
                userid: this.state.formValue.userid,
                username: this.state.formValue.username,
                firstname: this.state.formValue.firstname,
                lastname: this.state.formValue.lastname,
                email: this.state.formValue.email,
                addresses: null,
                password: this.state.formValue.password,
                profilePic: this.state.formValue.profilePic,
            }

            console.log(newUser)

            axios.post('http://localhost:8080/user/update', newUser).then((response) => {
                    if(response.data.status){
                        this.setState({updateStatus: {error: false, text:'Your user has been updated!'}});
                        this.props.login(response.data.returnObject);                    }
                }).catch((error) => {
                    console.log(error);
            });
        } else {
            this.setState({updateStatus: {error: true, text: 'Check your password!'}})
        }
    }

    render(){
        return(
            <div>
                <div className='profile'>
                    <form>
                        <h2>Profile</h2>
                        {this.state.avatarURL && <img className="profilePic" src={this.state.avatarURL} />}<br/>
                        <table onClick={() => this.openModal()} className="userDetails">
                            <tbody>
                                <tr><td>Username</td><td><input disabled type="text" placeholder="Username" value={this.props.user.username} disabled/></td></tr>
                                <tr><td>Firstname</td><td><input type="text" placeholder="Firstname" value={this.props.user.firstname} disabled/></td></tr>
                                <tr><td>Lastname</td><td><input type="text" placeholder="Lastname" value={this.props.user.lastname} disabled/></td></tr>
                                <tr><td>Email</td><td><input type="email" placeholder="Email" value={this.props.user.email} disabled/></td></tr>
                            </tbody>
                        </table>
                        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                        Profile Picture<br/>
                        <FileUploader
                            accept="image/*"
                            name="avatar"
                            randomizeFilename
                            storageRef={firebase.storage().ref("images")}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                        />
                    </form>


                    <Modal style={modalStyle} modal="true" isOpen={this.state.modalIsOpen} onRequestClose={() => this.closeModal()} contentLabel="Update User Details">
                        <button className='modalClose' onClick={() => this.closeModal()}>X</button>
                        <form>
                            <h2>Update User Details</h2>
                            <table>
                                <tbody>
                                    <tr><td>Username</td><td><input type="text" placeholder="Username" value={this.state.formValue.username}  onChange={(e) => this.changeFormValue(e.target.value, 'username')}/></td></tr>
                                    <tr><td>Firstname</td><td><input type="text" placeholder="Firstname" value={this.state.formValue.firstname}  onChange={(e) => this.changeFormValue(e.target.value, 'firstname')}/></td></tr>
                                    <tr><td>Lastname</td><td><input type="text" placeholder="Lastname" value={this.state.formValue.lastname}  onChange={(e) => this.changeFormValue(e.target.value, 'lastname')}/></td></tr>
                                    <tr><td>Email</td><td><input type="email" placeholder="Email" value={this.state.formValue.email}  onChange={(e) => this.changeFormValue(e.target.value, 'email')}/></td></tr>
                                    <tr><td>Password</td><td><input type="password" placeholder="Password" value={this.state.formValue.password} onChange={(e) => this.changeFormValue(e.target.value, 'password')}/></td></tr>
                                    <tr><td>Re-enter Password</td><td><input type="password" placeholder="Password" value={this.state.formValue.repassword} onChange={(e) => this.changeFormValue(e.target.value, 'repassword')}/></td></tr>
                                    <input onClick={() => this.updateUser()}  type="button" value="Update"/>
                                </tbody>
                            </table>
                        </form>
                        {this.state.updateStatus ? <div className={this.state.updateStatus.error ? 'error': 'success'}>{this.state.updateStatus.text}</div> : null}
                    </Modal>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);