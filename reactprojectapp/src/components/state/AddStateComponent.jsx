import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Title from '../TableReport/Title';
import Select from 'react-select';
import UtilService from "../../service/UtilService"

class AddStateComponent extends Component {
	StateResponse =
				{
					id:'',
					name: '',
					startState:'',
					endState:''
				}
	
    constructor(props){
        super(props);
        this.state ={
					id:'',
					name: '',
					startState:false,
					endState:false,
					message:'',
	    };
        this.saveData = this.saveData.bind(this);
    }

	saveData = (e) => {
		console.log('saving state as Name',this.state.name , ' start state ' ,this.state.startState, ' End State ' , this.state.endState)
        let gstate = {name: this.state.name,startState:this.state.startState,endState:this.state.endState};
        ApiService.addState(gstate,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'State added successfully.'});
                ApiService.fetchData('State',this.props.ouser,this.props.opass).then(response => {
					this.StateResponse = response.data
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole:'ADMIN',currentpage:'State',user:this.props.ouser,pass:this.props.opass,
							datafetched:this.StateResponse}
					})
				});

            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });
	
	handleChangestart = (e) =>
        this.setState({ [e.target.name]: !this.state.startState });
	
	handleChangeend = (e) =>
        this.setState({ [e.target.name]: !this.state.endState });
    render() {
		
		return(
				<React.Fragment>
				
					<Title>Add State</Title>
					<form style={{width:'80%'}}>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>State Name</label>
							<TextField type="text" placeholder="name" align="center" margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Start State</label>
							<Checkbox name = "startState"  color= "primary" onChange={this.handleChangestart}/> 
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>End State</label>
							<Checkbox name = "endState"  color= "primary" onChange={this.handleChangeend}/> 
						</div>
						<div style={{"height" : "10%"}}> </div>
						<div className="form-group form-inline">
							<Button variant="contained" color="primary" align="center" onClick={e => this.saveData(e)}>Save</Button>
						</div>
				    </form>
		</React.Fragment>
			);
		}
	
}


export default withRouter(AddStateComponent);
/*<select  margin="normal" name="UserGroup" align="center" onChange={this.handleChange}>
								{this.getUGRowsData()}
							</select> */
							/*<TextField ref={x => this.state.password = x}  type="password"></TextField>
							col-12 col-lg-4 login-card mt-2 
							<TextField type="text" placeholder="passwor" align="center" margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
*/