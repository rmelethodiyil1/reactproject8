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


class AddSpclComponent extends Component {
	
	SpecialTransactionResponse = [
    {
		id:'',
        name: '',
		startnodeid:'',
		endnodeid:'',
		label1:'',
		label2:'',
    }
	];	
    constructor(props){
        super(props);
        this.state ={
			name: '',
			startnodeid:'',
			endnodeid:'',
			label1:'UserGroup',
			label2:'Domain',
			selestartnode:'',
			seleendnode:'',
			responsegot:'No',
			isAttached: false,
			defselectedval:'NO',
			seleattachedState:'',
			attachedStatename:'None',
			UserGroupResponse : [{
					id:'',
					name: '',
					authorityname: '',
			}],
			DomainResponse : [{
				id:'',
				name: '',
				type:'',
				screenType:'',
				initialStatename:'',
			}],
			StateResponse : [{
				id:'',
				name: '',
				startState:false,
				endState:false,
				screenType:'',
			}],
		    ugRowsData : [],
		    domRowsData : [],
			stateRowsData : [],
			attachedtrnvalues : [{"label":'NO',"value":1},{"label":'YES',"value":2}],

		}
        this.savespcl = this.savespcl.bind(this);
    }

	componentDidMount() {
        this.loadUserGroupandDomain();
    }
	loadUserGroupandDomain() {
		ApiService.fetchData('User Group',this.props.ouser,this.props.opass)
		.then((res) => {
			console.log('User groups are' , res.data)
			this.state.UserGroupResponse = res.data
			this.getugRowsData()
			ApiService.fetchData('Domain',this.props.ouser,this.props.opass)
			.then((response) => {
				console.log('Domain data are',response.data)
				this.state.DomainResponse = response.data
				this.getdomRowsData();
				ApiService.fetchData('State',this.props.ouser,this.props.opass)
				.then((nresponse) => {
					this.state.StateResponse = nresponse.data
					this.getStateRowData();
					this.setState( {responsegot:'Yes'});

				});
			});	
		 });
		 
    }
	
	getugRowsData = () => {
		let array = []
		this.state.UserGroupResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})		
		this.setState( {ugRowsData:array});
	}
	getdomRowsData = () => {
		let array = []
		this.state.DomainResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {domRowsData:array});
	}
	getStateRowData = () => {
		let array = []
		this.state.StateResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {stateRowsData:array});
	}
	savespcl = (e) => {
		let isattachedval = this.state.isAttached.toString()
        let spcl = {name: this.state.name,startnodeid:this.state.startnodeid,endnodeid:this.state.endnodeid,isAttached:isattachedval,
		attachedStateName:this.state.attachedStatename}
        ApiService.addSPCL(spcl,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'SPCL added successfully.'});
                ApiService.fetchData('Special Transaction',this.props.ouser,this.props.opass).then(response => {
					this.SpecialTransactionResponse = response.data
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole:'ADMIN',currentpage:'Special Transaction',user:this.props.ouser,pass:this.props.opass,
							datafetched:this.SpecialTransactionResponse}
					})
				});

            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });	
	handledChange = (selectedd) =>
    		this.setState({startnodeid:selectedd.label})  
	handleuChange = (selectedug) =>
	    	this.setState({endnodeid:selectedug.label})
	handlesnChange = (selectedoption) =>
    		this.setState({attachedStatename:selectedoption.label})
	handleChange = (selectedStat) => {
		if (selectedStat.label === 'NO')
			this.setState({isAttached:false,defselectedval:'NO'})
		else
			this.setState({isAttached:true,defselectedval:'YES'})
	}

    render() {
		
		if (this.state.responsegot === 'No'){
			console.log('Loading the page')
			return <div>Loading...</div>
		}else
		{
			const { selectedug } = this.state.selestartnode
			const { selectedd } = this.state.seleendnode
			const { selectedOption } = this.state.seleattachedState
			console.log('attached status is ' , this.state.attachedStatus)
			return(
				<React.Fragment>
				
					<Title>Add Special transaction</Title>
					<form style={{width:'80%'}}>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Special Transaction Name</label>
							<TextField type="text" placeholder="name" align="center" margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>
						</div>						
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>User Group</label>
								<Select options={ this.state.ugRowsData } value={selectedug} className="Select-control" onChange={e => this.handleuChange(e)}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>Domain</label>
								<Select options={ this.state.domRowsData } value={selectedd} className="Select-control" onChange={e => this.handledChange(e)}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>Attached Transaction</label>
								<Select options={ this.state.attachedtrnvalues }  className="Select-control" onChange={e => this.handleChange(e)}/>
						 </div>
						{this.state.isAttached && 
						<>
						<div style={{"height" : "10%"}} align="center"> </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>Attached State</label>
								<Select options={ this.state.stateRowsData } value={selectedOption} className="Select-control" onChange={e => this.handlesnChange(e)}/>
						</div> </>}
						<div className="form-group form-inline">
							<Button variant="contained" color="primary" align="center" onClick={e => this.savespcl(e)}>Save</Button>
						</div>
				</form>
		</React.Fragment>
			);
		}
	}
	
}


export default withRouter(AddSpclComponent);
/*<select  margin="normal" name="UserGroup" align="center" onChange={this.handleChange}>
								{this.getUGRowsData()}
							</select> */
							/*<TextField ref={x => this.state.password = x}  type="password"></TextField>
							col-12 col-lg-4 login-card mt-2 
							<TextField type="text" placeholder="passwor" align="center" margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
*/