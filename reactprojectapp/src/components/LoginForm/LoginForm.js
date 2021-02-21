import React, {useState} from 'react';
import axios from 'axios';
import Header from '../Navigator/Header'
import './LoginForm.css';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter,Redirect } from "react-router-dom";

	
	/*const authtoken = (username,password) =>
		Buffer.from(`username:password`, 'utf8').toString('base64')*/
	
	const authtoken = (username,password) =>
		window.btoa(username + ':' + password)
		
    
    

    
    
    const redirectToRegister = () => {
		this.props.title('Home')
        this.props.history.push('/register'); 
        
    }
	
	class LoginForm extends React.Component {
	
	constructor() {
		
		super()
		
		this.state = {
			username : "",
			password : "",
			successMessage: null,
			isLoggedin : false
		}
		
	}
	
	
	componentDidMount() {
		this.props.history.index=0
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener('popstate', function (event){
		window.history.pushState(null, document.title,  window.location.href);
	});
	}

	redirectToHome = (role) => {
		console.log('Redirecting to home')
		this.props.handleLogin(role)
		
        this.props.history.push({
		  pathname: '/Home',
		  state: { currentrole: role, currentpage:'init',user: this.state.username,pass:this.state.password,datafetched:'null'}
		})
    }
	 
	 handleChange = (e) => {
        const {id , value} = e.target   
        this.setState(prevState => ({
            ...prevState,
            [id] : value
        }))
     }
	 
	 handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "username":this.state.username,
            "password":this.state.password,
        }
		var self = this;
		console.log('Username is ', this.state.username)
		console.log('Password is ', this.state.password)
        axios.get(API_BASE_URL+'appuser/login', {
			headers: {
				'Authorization': `Basic ${authtoken(this.state.username,this.state.password)}`
		}}).then(function (response) {
			if(response.status === 200){
				self.setState(prevState => ({
					...prevState,
					'isLoggedin' : true,
					successMessage : 'logged in redirecting to home page'
				}))
				
				self.redirectToHome(response.data.ROLE)
			}
			else if(response.status === 401){
				console.log('login failed')
				self.setState(prevState => ({
					...prevState,
					'isLoggedin' : false,
					successMessage : 'Incorrect username or password'
				}))
			}
			else{
				self.props.showError("Username does not exists");
			}
		})
            .catch(function (error) {
				console.log('login failed')
				self.setState(prevState => ({
					...prevState,
					'isLoggedin' : false,
					successMessage : 'Incorrect Username or password'
				}))
            });
    }
	render(){
		
		const { from } = this.props.location.state || { from: { pathname: '/' } }
		const { isLoggedin } = this.state

		if (isLoggedin === true) {
		  return <Redirect to={from} />
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
							   value={this.state.username}
							   onChange={this.handleChange}
						/>
						<small id="emailHelp" className="form-text text-muted">This is your assigned username </small>
						</div>
						<div className="form-group text-left">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input type="password" 
							   className="form-control" 
							   id="password" 
							   placeholder="Password"
							   value={this.state.password}
							   onChange={this.handleChange} 
						/>
						</div>
						<div className="form-check">
						</div>
						<button 
							type="submit" 
							className="btn btn-primary"
							onClick={this.handleSubmitClick}
						>Submit</button>
					</form>
					<div className="alert alert-success mt-2" style={{display: this.state.successMessage ? 'block' : 'none' }} role="alert">
						{this.state.successMessage}
					</div>
					<div className="registerMessage">
						<span>Dont have an account? </span>
						<span className="loginText" onClick={() => redirectToRegister()}>Register</span> 
					</div>
				</div>
			)
	}
}

export default withRouter(LoginForm);