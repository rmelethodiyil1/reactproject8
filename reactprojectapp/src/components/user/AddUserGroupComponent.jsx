import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Title from '../TableReport/Title';

class AddUserGroupComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            name: '',
            authorityname: 'USER',
			message:''
        }
        this.saveUser = this.saveUser.bind(this);
    }

    saveUser = (e) => {
        e.preventDefault();
        let user = {name: this.state.name, authorityname: this.state.authorityname};
        ApiService.addUsergroup(user,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                ApiService.fetchUsergroup(this.props.ouser,this.props.opass).then(response => {
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole: 'ADMIN', currentpage:'User Group',user: this.props.ouser,pass:this.props.opass,
							datafetched:response.data}
					})
				});

            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
			<React.Fragment>
			
                <Title>Add User</Title>
                <form style={{width:'80%'}}>
					<div className="form-group form-inline">
						<label style={{marginRight: '10px'}}>User Group Name</label>
						<TextField type="text" placeholder="name" align="center" margin="normal"   name="name" value={this.state.name} onChange={this.onChange}/>
					</div>
					 <div style={{"height" : "10%"}} align="center" > </div>
					 <div className="form-group form-inline">
						<label style={{marginRight: '10px'}}>Authority Type</label>
						<select  margin="normal" name="authorityname" align="center" value={this.state.authorityname} onChange={this.onChange}>
						  <option value="USER">USER</option>
						  <option value="ADMIN">ADMIN</option>
						</select>
					 </div>
					 <div style={{"height" : "20%"}}> </div>
					 <div className="form-group form-inline">
						<Button variant="contained" color="primary" align="center" onClick={this.saveUser}>Save</Button>
					 </div>
            </form>
	</React.Fragment>
        );
    }
}





export default withRouter(AddUserGroupComponent);