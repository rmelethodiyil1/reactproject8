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
import '../user/selectcomp.css';

class AddDomainComponent extends Component {
	
	DomainResponse = [
    {
		id:'',
        name: '',
		type:'',
		screenType:'',
		initialStatename:'',
    }
	];	
    constructor(props){
        super(props);
        this.state ={
			name: '',
			type:'',
			initialState:'',
			selectedState:'',
			responsegot:'No',
			StartStateResponse : [
			{
				id:'',
				name:'',
				screentype:'',
				startState:'',
				endState:'',				
				allowedtrn:'',
				permittedStates:'',
			},
	    ],
		stateRowsData : [],
		}
        this.savedomain = this.savedomain.bind(this);
    }

	componentDidMount() {
        this.loadUser();
    }
	loadUser() {
		ApiService.fetchData('StartState',this.props.ouser,this.props.opass)
		.then((res) => {
			console.log('Start states are' , res.data)
			this.state.StartStateResponse = res.data
			this.getRowsData()
			this.setState( {responsegot:'Yes'});			
		 });
		 console.log('Going to set response retrieved to Yes')
    }
	
	getRowsData = () => {
		let array = []
		this.state.StartStateResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {stateRowsData:array});
	}
	
	savedomain = (e) => {
        let domain = {name: this.state.name,type:this.state.type,initialStatename:this.state.initialState};
        ApiService.addDomain(domain,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'Domain added successfully.'});
                ApiService.fetchData('Domain',this.props.ouser,this.props.opass).then(response => {
					this.DomainResponse = response.data
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole:'ADMIN',currentpage:'Domain',user:this.props.ouser,pass:this.props.opass,
							datafetched:this.DomainResponse}
					})
				});

            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
	
	handleChange = (selectedoption) =>
    {
		this.setState({initialState:selectedoption.label})  
	}
	
    render() {
		
		if (this.state.responsegot === 'No'){
			console.log('Loading the page')
			return <div>Loading...</div>
		}else
		{
			const { selectedOption } = this.state.selectedState
			console.log('Data is loaded')
			return(
				<React.Fragment>
				
					<Title>Add User</Title>
					<form style={{width:'80%'}}>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Domain Name</label>
							<TextField type="text" placeholder="name" align="center" margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>
						</div>						
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Type</label>
							<TextField type="text" placeholder="type" align="center" margin="normal" name="type" value={this.state.type} onChange={this.onChange}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>Initial State</label>
								<Select options={ this.state.stateRowsData } value={selectedOption} className="Select-control" onChange={e => this.handleChange(e)}/>
						 </div>
						 <div style={{"height" : "10%"}}> </div>
						 <div className="form-group form-inline">
							<Button variant="contained" color="primary" align="center" onClick={e => this.savedomain(e)}>Save</Button>
						 </div>
				</form>
		</React.Fragment>
			);
		}
	}
	
}


export default withRouter(AddDomainComponent);
/*<select  margin="normal" name="UserGroup" align="center" onChange={this.handleChange}>
								{this.getUGRowsData()}
							</select> */
							/*<TextField ref={x => this.state.password = x}  type="password"></TextField>
							col-12 col-lg-4 login-card mt-2 
							<TextField type="text" placeholder="passwor" align="center" margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
*/