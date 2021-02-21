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


class AddAllwdTrnComponent extends Component {
	
	AllowedTransResponse = [
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
			label1:'',
			label2:'all',
			label3:'all',
			selestartnode:{label: '', key : ''},
			seleendnode:{label: '', key : ''},
			seledomain:{label: '', key : ''},
			selespcl:{label: '', key : ''},
			seleUG:{label: '', key : ''},
			responsegot:'No',
			StartStateResponse : [
			{
				id:'',
				name:'',
				screentype:'',
				allowedtrn:'',
			}],
			EndStateResponse : [
			{
				id:'',
				name:'',
				screentype:'',
				allowedtrn:'',
			}],
			DomainResponse : [{
				id:'',
				name: '',
				type:'',
				screenType:'',
				initialStatename:'',
			}],
			SpecialTransactionResponse : [
			{
				id:'',
				name: '',
				startnodeid:'',
				endnodeid:'',
				label1:'',
				label2:'',
				attached:false,
				attachedState:'',
			}],
			UserGroupResponse : [],
			domRowsData : [],
			spclRowsData : [],
		    ststateRowsData : [],
		    endstateRowsData : [],
			uGRowsData :[],
		}
        this.saveallwdTrn = this.saveallwdTrn.bind(this);
    }

	componentDidMount() {
        this.loadUserGroupandDomain();
    }
	loadUserGroupandDomain() {
		ApiService.fetchData('StartState',this.props.ouser,this.props.opass)
		.then((res) => {
			console.log('Start States are' , res.data)
			this.state.StartStateResponse = res.data
			this.getsstRowsData()
			ApiService.fetchData('EndState',this.props.ouser,this.props.opass)
			.then((response) => {
				console.log('End data are',response.data)
				this.state.EndStateResponse = response.data
				this.getestRowsData();
				ApiService.fetchData('Domain',this.props.ouser,this.props.opass)
				.then((response1) => {
					console.log('Dom data are',response1.data)
					this.state.DomainResponse = response1.data
					this.getdomRowsData();
					ApiService.fetchData('User Group',this.props.ouser,this.props.opass)
					.then((response2) => {
					console.log('Dom data are',response2.data)
					this.state.UserGroupResponse = response2.data
					this.getUGRowsData();
					this.setState( {responsegot:'Yes'});
				});
				});
			});	
		 });
		 console.log('Going to set response retrieved to Yes')
    }
	
	getsstRowsData = () => {
		let array = []
		this.state.StartStateResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})		
		this.setState( {ststateRowsData:array});
	}
	getestRowsData = () => {
		let array = []
		this.state.EndStateResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})		
		this.setState( {endstateRowsData:array});
	}
	getdomRowsData = () => {
		let array = []
		this.state.DomainResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {domRowsData:array});
	}
	getUGRowsData = () => {
		let array = []
		this.state.UserGroupResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {uGRowsData:array});
	}
	getspclRowsData = () => {
		let array = []
		this.state.SpecialTransactionResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {spclRowsData:array});
	}
	getallSPCLfordom = (e) => {
		this.setState( {responsegot:'No'});
		ApiService.fetchSpclforDomug(e,this.state.label3,this.props.ouser,this.props.opass)
			.then((response2) => {
				console.log('Spcl data are',response2.data)
				this.state.SpecialTransactionResponse = response2.data
				this.getspclRowsData();
				this.setState( {responsegot:'Yes'});
		});
	}
	getallSPCLforUG = (e) => {
		this.setState( {responsegot:'No'});
		ApiService.fetchSpclforDomug(this.state.label2,e,this.props.ouser,this.props.opass)
			.then((response2) => {
				console.log('Spcl data are',response2.data)
				this.state.SpecialTransactionResponse = response2.data
				this.getspclRowsData();
				this.setState( {responsegot:'Yes'});
		});
	}
	saveallwdTrn = (e) => {
        let allwd = {name: this.state.name,startnodeid:this.state.startnodeid,endnodeid:this.state.endnodeid,label1:this.state.label1,label2:this.state.label2};
        ApiService.addAllwd(allwd,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'Allowed transition added successfully.'});
                ApiService.fetchData('Allowed Transition',this.props.ouser,this.props.opass).then(response => {
					this.AllowedTransResponse = response.data
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole:'ADMIN',currentpage:'Allowed Transition',user:this.props.ouser,pass:this.props.opass,
							datafetched:this.AllowedTransResponse}
					})
				});

            });
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });	
	}
	handledChange = (selectedom) => {
    	this.setState({label2:selectedom.label}) 
		this.setState({seledomain:selectedom}) 
		this.getallSPCLfordom(selectedom.label)	
    }
    handleuChange = (selectedug) => {
    	this.setState({label3:selectedug.label}) 
		this.setState({seleUG:selectedug}) 
		this.getallSPCLforUG(selectedug.label)	
    }	
	handlesstChange = (selectedsst) =>{
    		this.setState({startnodeid:selectedsst.label})
			this.setState({selestartnode:selectedsst}) 

	}
	handleestChange = (selecteest) =>{
    		this.setState({endnodeid:selecteest.label})
			this.setState({seleendnode:selecteest}) 
	}
	handlesslChange = (selectespc) =>{
    		this.setState({label1:selectespc.label})
			this.setState({selespcl:selectespc}) 
	}
    render() {
		
		if (this.state.responsegot === 'No'){
			console.log('Loading the page')
			return <div>Loading...</div>
		}else
		{
			console.log('Data is loaded')
			return(
				<React.Fragment>
				
					<Title>Add Allowed Transition</Title>
					<form style={{width:'80%'}}>
						<div style={{"height" : "5%"}} align="center"> </div>
					    <div className="form-group form-inline" style={{"width" : "500px"}} >
							<label style={{marginRight: '100px'}}>Transition Name</label>
							<TextField type="text" placeholder="name" align="center" margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>
						</div>
						<div style={{"height" : "5%"}} align="center"> </div>
						<div className="form-group form-inline" style={{"width" : "500px"}} >
							<label style={{marginRight: '100px'}}>Start State</label>
								<Select options={ this.state.ststateRowsData } value={this.state.selestartnode} className="Select-control" onChange={e => this.handlesstChange(e)}/>
						</div>
						<div style={{"height" : "5%"}} align="center"> </div>
						<div className="form-group form-inline" style={{"width" : "500px"}}>
							<label style={{marginRight: '100px'}}>End State</label>
								<Select options={ this.state.endstateRowsData } value={this.state.seleendnode} className="Select-control" onChange={e => this.handleestChange(e)}/>
						</div>
						<div style={{"height" : "5%"}} align="center"> </div>
						<div className="form-group form-inline" style={{"width" : "500px"}} >
							<label style={{marginRight: '100px'}}>Domain</label>
								<Select options={ this.state.domRowsData } value={this.state.seledomain} className="Select-control" onChange={e => this.handledChange(e)}/>
						</div>
						<div style={{"height" : "5%"}} align="center"> </div>
						<div className="form-group form-inline" style={{"width" : "500px"}}>
							<label style={{marginRight: '100px'}}>UserGroup</label>
								<Select options={ this.state.uGRowsData } value={this.state.seleUG} className="Select-control" onChange={e => this.handleuChange(e)}/>
						</div>
						<div style={{"height" : "5%"}} align="center"> </div>
						<div className="form-group form-inline" style={{"width" : "500px"}}>
							<label style={{marginRight: '50px'}}>Special Transaction</label>
								<Select options={ this.state.spclRowsData } value={this.state.selespcl} className="Select-control" onChange={e => this.handlesslChange(e)}/>
						</div>
						<div style={{"height" : "5%"}} align="center"> </div>
						<div className="form-group form-inline" style={{"width" : "500px"}}>
							<Button variant="contained" color="primary" align="center" onClick={e => this.saveallwdTrn(e)}>Save</Button>
						</div>
				</form>
		</React.Fragment>
			);
		}
	}
	
}


export default withRouter(AddAllwdTrnComponent);
/*<select  margin="normal" name="UserGroup" align="center" onChange={this.handleChange}>
								{this.getUGRowsData()}
							</select> */
							/*<TextField ref={x => this.state.password = x}  type="password"></TextField>
							col-12 col-lg-4 login-card mt-2 
							<TextField type="text" placeholder="passwor" align="center" margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
*/