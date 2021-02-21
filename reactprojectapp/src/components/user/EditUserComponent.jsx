import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import UtilService from "../../service/UtilService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";

class EditUserComponent extends Component {

	UserResponse = [
    {
		id:'',
        name: '',
		firstName:'',
		lastName:'',
        dgname: '',
		dglabel:'',
    }
	];
    constructor(props){
        super(props);
        this.state = {
			id:'',
			name: '',
			firstName:'',
			lastName:'',
			dgname: '',
			message:'',
			UserGroupResponse : [
				{
					id:'',
					name: '',
					authorityname: '',
				},
			],
        };
		
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
		
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUserById(this.props.datafetched,this.props.ouser,this.props.opass)
            .then((res) => {
                let user = (res.data)
                this.setState({
					id: user.id,
					name:user.name,
					firstName: user.firstName,
					lastName:user.lastName,
					dgname:user.dgname
                })
            });
		ApiService.fetchData('User Group',this.props.ouser,this.props.opass)
		.then((res) => {
			this.setState({UserGroupResponse:res.data})
		 });
    }
	
	getUGRowsData =() => {
		return this.state.UserGroupResponse.map((row) => (
			 <option>{row.name}</option>
		  ))
	}
	
	
    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id:this.state.id,name: this.state.name,dusergroup:this.state.dgname,firstName:this.state.firstName,lastName:this.state.lastName};
        ApiService.editUser(this.state.id,user,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'User modified successfully.'});
                ApiService.fetchUser(this.props.ouser,this.props.opass).then(response => {
					this.UserResponse = UtilService.parseUserResponse(response.data)
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole: 'ADMIN', currentpage:'User Group',user: this.props.ouser,pass:this.props.opass,
							datafetched:this.UserResponse}
					})
				});

            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit User</Typography>
                <form>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>User Name</label>
                        <TextField type="text" placeholder="name" fullWidth margin="normal" name="Name" readonly="true" value={this.state.name}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>First Name</label>
                        <TextField type="text" placeholder="firstname" fullWidth margin="normal" name="First Name" readonly="true" value={this.state.firstName}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Last Name</label>
                        <TextField type="text" placeholder="lastname" fullWidth margin="normal" name="Last Name" readonly="true" value={this.state.lastName}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>User Group</label>
							<select  margin="normal" name="dgname" align="center" value={this.state.dgname} onChange={this.onChange}>
							  {this.getUGRowsData()}
							</select>
						 </div>
						<div style={{"height" : "20%"}}> </div>
						<div className="form-group form-inline">
							<Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
						</div>
                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default withRouter(EditUserComponent);