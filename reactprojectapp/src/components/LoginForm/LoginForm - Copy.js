import React, {useState} from 'react';
import axios from 'axios';
import Header from '../Navigator/Header'
import './LoginForm.css';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function LoginForm(props) {
	
	/*const authtoken = (username,password) =>
		Buffer.from(`username:password`, 'utf8').toString('base64')*/
	
	const authtoken = (username,password) =>
		window.btoa(username + ':' + password)
		
    const [state , setState] = useState({
        username : "",
        password : "",
        successMessage: null,
		currentrole : null,
		isLoggedin : false
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "username":state.username,
            "password":state.password,
        }
		console.log('Username is ', state.username)
		console.log('Password is ', state.password)
        axios.get(API_BASE_URL+'login', {
			headers: {
				'Authorization': `Basic ${authtoken(state.username,state.password)}`
		}}).then(function (response) {
			if(response.status === 200){
				setState(prevState => ({
					...prevState,
					'isLoggedin' : true
				}))
				
				redirectToHome(response.data.ROLE)
			}
			else if(response.status === 204){
				props.showError("Username and password do not match");
			}
			else{
				props.showError("Username does not exists");
			}
		})
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = (role) => {
		console.log('Redirecting to home')
		props.handleLogin(role)
		
        props.history.push('/Home')
    }
    const redirectToRegister = () => {
		props.title('Home')
        props.history.push('/register'); 
        
    }
    return(
		
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
		<Header />
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">User Name</label>
                <input type="text" 
                       className="form-control" 
                       id="username" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter username" 
                       value={state.username}
                       onChange={handleChange}
                />
                <small id="emailHelp" className="form-text text-muted">This is your assigned username </small>
                </div>
                <div className="form-group text-left">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" 
                       className="form-control" 
                       id="password" 
                       placeholder="Password"
                       value={state.password}
                       onChange={handleChange} 
                />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
            </div>
        </div>
    )
}

export default withRouter(LoginForm);