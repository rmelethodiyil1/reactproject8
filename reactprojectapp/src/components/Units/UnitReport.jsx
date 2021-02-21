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
import DeleteIcon from '@material-ui/icons/Delete';
import UtilService from "../../service/UtilService"
// Generate Order Data
const createData = (id, date, name, shipTo, paymentMethod, amount) => {
  return { id, date, name, shipTo, paymentMethod, amount };
}



const getHeader = (clickeditem) => {
  
  return <><TableCell align="center">Domain</TableCell><TableCell align="center">UnitName</TableCell><TableCell align="center">CurrentState</TableCell></>
   
}
    

class UnitReport extends React.Component { 
  
  
  constructor(props) {		
	 super(props)
	 this.state = {
	 selectedOption:{label: '', key : ''},
	 responsegot:'No',
	 isAddunit:true,
	 seledomain:{label: '', key : ''},
	 label1:'',
	 UnitResponse :[],
	 
	 domRowsData : [],
	 unitRowsData : [],
	}
    
  }
  
  componentDidMount() {
	 let array = []
	 if(this.props.opage === 'Fetch Units') {
		 this.state.UnitResponse = this.props.datafetched
		 this.state.fordomain = this.state.UnitResponse[0].domainname
		 this.state.isAddunit = false
	 }else {
		 this.props.datafetched.map((row) => (
			array.push({"label":row.name,"value":row.id})
		 ))
		 this.setState( {domRowsData:array});
		 this.state.isAddunit=true
	 }
	 
	 this.setState( {responsegot:'Yes'});
  }
  preventDefault = (event) => {
	event.preventDefault();
  }
  
  getRowsData =() => {
   
	return this.state.UnitResponse.map((row) => (
		<TableRow key={row.id}>
		  <TableCell align="center">{row.domainname}</TableCell>
		  <TableCell align="center">{row.name}</TableCell>
		  <TableCell align="center">{row.currentStatename}</TableCell>
		  <TableCell align="right" onClick={() => this.deleteUnit(row.id)}><DeleteIcon/></TableCell>
		</TableRow>
	))
  
  }  
 
  
  fetchUnits = () => {
	this.setState( {responsegot:'No'});
	let requestobj = {param1: 'none',param2:this.state.fordomain,name:'none'};
	ApiService.fetchUnitsforDom(requestobj,this.props.ouser,this.props.opass)
			.then((response2) => {
				console.log('Spcl data are',response2.data)
				this.state.UnitResponse = response2.data
				this.setState( {responsegot:'Yes'});
	});
  }
  
  addUnits = () => {
	
	let currentpage = 'AddUnit'
	this.props.history.push({
	  pathname: '/Home',
	  state: { currentrole: this.props.orole, currentpage:currentpage,user: this.props.ouser,pass:this.props.opass,datafetched:'null'}
	})
  }
  
  deleteUnit(userId) {
	this.setState( {responsegot:'No'});
	ApiService.deletefn(this.props.opage,userId,this.props.ouser,this.props.opass).then(res => {
		this.setState({message : 'User deleted successfully.'});
	this.fetchUnits()

	});
  }
  
handleChange = (selectedom) => {
	this.setState({fordomain:selectedom.label}) 
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
		  {this.state.isAddunit && 
		   <>		  
		  <div 	align="center" > </div>
		  <div className="form-group form-inline" >
		  <label style={{marginRight: '10px'}}>Domain Name</label>
		  <Select options={ this.state.domRowsData } value={this.state.selectedOption} className="Select-control" onChange={e => this.handleChange(e)}/>
		  </div>
		  <div style={{"height" : "40%"}}> </div>
		  <Button variant="contained" color="primary" align="center" onClick={e => this.fetchUnits(e)}>Fetch Units</Button>
		  <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span> </>}
  		  <Button variant="contained" color="primary" align="center" onClick={e => this.addUnits(e)}>Create Unit</Button>
		  </form>
		  <div style={{"height" : "20%"}}> </div>
		  <Table size="small" style={{width:'80%'}}>
			<TableHead>
			  <TableRow>
				{getHeader(this.props.opage)}
			  </TableRow>
			</TableHead>
			<TableBody>
			  {this.getRowsData()}
			</TableBody>
		  </Table>
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
export default withRouter(UnitReport);