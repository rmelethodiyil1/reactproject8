import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../TableReport/Title';
import Select from 'react-select';
import ApiService from "../../service/ApiService"
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import UtilService from "../../service/UtilService"
// Generate Order Data
const createData = (id, date, name, shipTo, paymentMethod, amount) => {
  return { id, date, name, shipTo, paymentMethod, amount };
}



const getHeader = (clickeditem) => {
  
  return <><TableCell align="center">Domain</TableCell><TableCell align="center">UnitName</TableCell><TableCell align="center">CurrentState</TableCell></>
   
}
    

class TransactUnit extends React.Component { 
  
  
  constructor(props) {		
	 super(props)
	 this.state = {
	 selectedOption:{label: '', key : ''},
	 responsegot:'No',
	 seledomain:{label: '', key : ''},
	 label1:'',
	 unitid:'',
	 newunitstate :'',
	 UnitResponse :[],
	 responseObject : [],
	 spclRowsData : [],
	 unitRowsData : [],
	}
    
  }
  
  componentDidMount() {
	 let array = []
	 let cnt = 0
	 this.props.datafetched.map((row) => (
		array.push({"label":row.name,"value":row.param1})
	 ))
	 this.setState( {spclRowsData:array});
	 this.setState( {responsegot:'Yes'});
	 console.log(' user name ' , this.props.ouser , ' password ' , this.props.opass, ' current role ' , this.props.orole)
  }
  preventDefault = (event) => {
	event.preventDefault();
  }
 
  
 transactUnits = () => {
    let unit = {name:this.state.name,param1:this.state.unitid,param2:this.state.newunitstate};
	ApiService.transactUnit(unit,this.props.ouser,this.props.opass).then(res => {
		this.props.history.push({
		pathname: '/Home',
		state: { currentrole:this.props.orole,currentpage:'',user:this.props.ouser,pass:this.props.opass,
				datafetched:this.DomainResponse}
		})

	});
 }
  
handleChange = (selectedom) => {
	this.setState({newunitstate:selectedom.label}) 
	this.setState({unitid:selectedom.value}) 
	this.setState({selectedOption:selectedom}) 
}	
	
render(){
	  if (this.state.responsegot === 'No'){
		console.log('Loading the page')
		return <div>Loading...</div>
	  }else	{
	  
	  return (
		<React.Fragment>
		  <div style={{"height" : "10%"}}> </div> 
		  <Title>{this.props.opage}</Title>
		  <form style={{width:'80%'}}>
		  	  
		  <div 	align="center" > </div>
		  <div className="form-group form-inline" >
		  <label style={{marginRight: '10px'}}>Transact to State</label>
		  <Select options={ this.state.spclRowsData } value={this.state.selectedOption} className="Select-control" onChange={e => this.handleChange(e)}/>
		  </div>
		  <div style={{"height" : "40%"}}> </div>
		  <Button variant="contained" color="primary" align="center" onClick={e => this.transactUnits(e)}>Transact Unit</Button>
		  </form>
		  <div style={{"height" : "20%"}}> </div>		  
		  <div>
			<Link color="primary" href="#" onClick={this.preventDefault}>
			  See more orders
			</Link>
		  </div>
		</React.Fragment>
	  );
	}
  }
}
export default withRouter(TransactUnit);