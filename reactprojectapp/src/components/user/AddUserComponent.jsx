import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Title from '../TableReport/Title';
import Select from 'react-select';
import UtilService from "../../service/UtilService"
import './selectcomp.css';

class AddUserComponent extends Component {

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
        this.state ={
			name: '',
			firstname:'',
			lastname:'',
			password:'',
			dgname: '',
			message:'',
			responsegot:'No',
			selectedug :'',
			UserGroupResponse : [
			{
				id:'',
				name: '',
				authorityname: '',
			},
			],
			ugRowsData : [],

        }
        this.saveUser = this.saveUser.bind(this);
		this.getUGRowsData = this.getUGRowsData.bind(this);
    }

	componentDidMount() {
        this.loadUser();
    }
	loadUser() {
		ApiService.fetchData('User Group',this.props.ouser,this.props.opass)
		.then((res) => {
			console.log('User groups are' , res.data)
			this.state.UserGroupResponse = res.data
			this.getUGRowsData()
			this.setState( {responsegot:'Yes'});

		 });
		 console.log('Going to set response retrieved to Yes')
    }
	
	getUGRowsData = () => {
		let array = []
		this.state.UserGroupResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {ugRowsData:array});
	}
	
    saveUser = (e) => {
        let user = {name: this.state.name,dusergroup:this.state.dgname,password:this.state.password,firstName:this.state.firstname,lastName:this.state.lastname};
        ApiService.addUser(user,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'User added successfully.'});
                ApiService.fetchData('User',this.props.ouser,this.props.opass).then(response => {
					this.UserResponse = UtilService.parseUserResponse(response.data)
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole:'ADMIN',currentpage:'User',user:this.props.ouser,pass:this.props.opass,
							datafetched:this.UserResponse}
					})
				});

            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
	
	handleChange = (selectedoption) =>
    {
		this.setState({dgname:selectedoption.label})  
	}
	
    render() {
		
		if (this.state.responsegot === 'No'){
			console.log('Loading the page')
			return <div>Loading...</div>
		}else {
			const { selectedOption } = this.state.selectedug
			console.log('Data is loaded')
			return(
				<React.Fragment>
				
					<Title>Add User</Title>
					<form style={{width:'80%'}}>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>User Name</label>
							<TextField type="text" placeholder="name" align="center" margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Password</label>
							<input type="password" name="password" placeholder="Password" value={this.state.password}  onChange={this.onChange} />
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>First Name</label>
							<TextField type="text" placeholder="firstname" align="center" margin="normal" name="firstname" value={this.state.firstname} onChange={this.onChange}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Last Name</label>
							<TextField type="text" placeholder="lastname" align="center" margin="normal" name="lastname" value={this.state.lastname} onChange={this.onChange}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>User Group</label>
								<Select options={ this.state.ugRowsData } value={selectedOption} className="Select-control" onChange={e => this.handleChange(e)}/>
						 </div>
						 <div style={{"height" : "10%"}}> </div>
						 <div className="form-group form-inline">
							<Button variant="contained" color="primary" align="center" onClick={e => this.saveUser(e)}>Save</Button>
						 </div>
				</form>
		</React.Fragment>
			);
		}
	}
}


export default withRouter(AddUserComponent);
/*<select  margin="normal" name="UserGroup" align="center" onChange={this.handleChange}>
								{this.getUGRowsData()}
							</select> */
							/*<TextField ref={x => this.state.password = x}  type="password"></TextField>
							col-12 col-lg-4 login-card mt-2 
							<TextField type="text" placeholder="passwor" align="center" margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
*/