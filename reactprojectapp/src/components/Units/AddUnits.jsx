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

class AddUnits extends Component {
	
	constructor(props){
        super(props);
        this.state ={
			name: '',
			label1:'',
			seledomain:{label: '', key : ''},
			responsegot:'No',
			allowedValue: '', 
			DomainResponse : [{
				id:'',
				name: '',
				type:'',
				screenType:'',
				initialStatename:'',
			}],
	
			domRowsData : [],
			UnitResponse :[],
		}
        this.saveallunits = this.saveallunits.bind(this);
    }

	componentDidMount() {
        this.loadDomain();
    }
	loadDomain() {
		ApiService.fetchData('Domain',this.props.ouser,this.props.opass)
		.then((response1) => {
		console.log('Dom data are',response1.data)
			this.state.DomainResponse = response1.data
			this.getdomRowsData();
			this.setState( {responsegot:'Yes'});
		 });
		 console.log('Going to set response retrieved to Yes')
    }
	
	
	getdomRowsData = () => {
		let array = []
		this.state.DomainResponse.forEach(function (arrayItem) {
			array.push({"label":arrayItem.name,"value":arrayItem.id});
		})	
		this.setState( {domRowsData:array});
	}
	
	saveallunits = (e) => {
        let unit = {name: this.state.name,param1:this.state.label1,param2:this.state.allowedValue};
        ApiService.addUnit(unit,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'Units added successfully.'});
				let requestobj = {param1: 'none',param2:this.state.label1,name:'none'};
                ApiService.fetchUnitsforDom(requestobj,this.props.ouser,this.props.opass).then(response => {
					this.UnitResponse = response.data
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole:'ADMIN',currentpage:'Fetch Units',user:this.props.ouser,pass:this.props.opass,
							datafetched:this.UnitResponse}
					})
				});

            });
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });	
	}
	handledChange = (selectedom) => {
    	this.setState({label1:selectedom.label}) 
		this.setState({seledomain:selectedom}) 
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
					<Title>Create Units</Title>
					<form style={{width:'80%'}}>
					    <div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Name</label>
							<TextField type="text" placeholder="name" align="center" margin="normal" name="name" value={this.state.name} onChange={this.onChange}/>
						</div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Quantity</label>
							<TextField id="outlined-value" type="number" label="Quantity" onChange={this.nChange} value={this.state.allowedValue} 
							margin="normal" variant="outlined" inputProps={{ min: 1, max: 10000}}/>
						</div>
						<div style={{"height" : "10%"}} align="center"> </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>Domain</label>
								<Select options={ this.state.domRowsData } value={this.state.seledomain} className="Select-control" onChange={e => this.handledChange(e)}/>
						</div>
						<div style={{"height" : "10%"}} align="center"> </div>
						<div className="form-group form-inline">
							<Button variant="contained" color="primary" align="center" onClick={e => this.saveallunits(e)}>Save</Button>
						</div>
				</form>
		</React.Fragment>
			);
		}
	}

	nChange = (e) => {
		const { value } = e.target;
		  if (value.match('.')) { 
			this.setState({ allowedValue: parseInt(value) })
		  } 
		return null;
	}
}


export default withRouter(AddUnits);
/*<select  margin="normal" name="UserGroup" align="center" onChange={this.handleChange}>
								{this.getUGRowsData()}
							</select> */
							/*<TextField ref={x => this.state.password = x}  type="password"></TextField>
							col-12 col-lg-4 login-card mt-2 
							<TextField type="text" placeholder="passwor" align="center" margin="normal" name="password" value={this.state.password} onChange={this.onChange}/>
*/