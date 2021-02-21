import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Paperbase from '../Navigator/Paperbase';


const styles = {
  fullstretch: {
    width: '100%',
  },
  
  };
// A simple component that shows the pathname of the current location
class NewHome extends React.Component {
  
  
 // static propTypes = {
 //   match: PropTypes.object.isRequired,
 //   location: PropTypes.object.isRequired,
 //   history: PropTypes.object.isRequired
 // };
 
  render() {
 //   const { match, location, history } = this.props;
    const  role  = this.props.location.state.currentrole;
	const  page  = this.props.location.state.currentpage
	const  user  =  this.props.location.state.user
	const  pass =   this.props.location.state.pass
	const datafetched = this.props.location.state.datafetched
    return(  <div className="fullstretch"> 
	
       <Paperbase role={role} page={page} user={user} pass={pass} datafetched={datafetched} />  </div> );
  } 
}
//You are now  {location.state.currentrole}
// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
/*<div style={{display: 'flex', justifyContent: 'center'}}><h1>
		{role} {page} {user} {pass}
        </h1></div> */
export default withRouter(NewHome);