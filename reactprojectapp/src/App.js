import React,{ Component } from 'react';
import Header from './components/Navigator/Header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import NewHome from './components/NewHome/NewHome';
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom";

const ProtectedRoute = ({ component: Comp, ...rest }) => (
  <Route {...rest} render={(props) => (
    isloggedinfunc.isAuthenticated === true
      ? <Comp {...props} />
      : <Redirect to={{
          pathname: '/Login',
          state: { from: props.location }
        }} />
  )} />
)

const isloggedinfunc  = {
	isAuthenticated: false,
	currentrole : 'none',
	
	authenticate(role) {
		this.isAuthenticated = true
		this.currentrole = role
	},
    signout() {
		this.isAuthenticated = false
	}
  }

class App extends Component {
  state = {
	currentrole: 'none',
    loggedIn: false,
  };
  
  rand = Math.random()
  
 
 handleLogin = (role) => {
    isloggedinfunc.authenticate(role)
	console.log('logged in state now')
  };
  
  
  render() {
    const { state = {} } = this.props.location;
    const { error } = state;

    return (
	<Router>
      <div className="App">
        <div className="container d-flex align-items-center flex-column">
          
			<Route path="/Login" render={(props) => <LoginForm {...props} key={this.rand.toString} handleLogin={this.handleLogin}/>}/>
            <ProtectedRoute path="/Home"  component={NewHome} />
      </div>
	 </div>
	 </Router>
    );
  }
}
///  <Route path="/" render={(props) => <LoginForm {...props} handleLogin={this.handleLogin}/>}/>
export default App;
