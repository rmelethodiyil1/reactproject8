import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
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

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];



const getHeader = (clickeditem) => {
  if(clickeditem === 'User Group') {
	return <><TableCell align="center">Name</TableCell><TableCell align="center">AuthorityName</TableCell></>
  }
  else  if(clickeditem === 'User') {
	return <><TableCell align="center">Name</TableCell><TableCell align="center">FirstName</TableCell>
	<TableCell align="center">LastName</TableCell><TableCell align="center">UserGroup</TableCell></>
  }
  else  if(clickeditem === 'State') {
	return <><TableCell align="center">State Name</TableCell><TableCell align="center">StartState</TableCell>
	<TableCell align="center">EndState</TableCell></>
  }
  else  if(clickeditem === 'Domain') {
	return <><TableCell align="center">Domain Name</TableCell><TableCell align="center">Type</TableCell>
	<TableCell align="center">InitialState</TableCell></>
  }
  else  if(clickeditem === 'Special Transaction') {
	return <><TableCell align="center">Special transaction Name</TableCell><TableCell align="center">UserGroup</TableCell>
	<TableCell align="center">Domain</TableCell><TableCell align="center">Attached</TableCell><TableCell align="center">AttachedState</TableCell></>
  }
  else  if(clickeditem === 'Allowed Transition') {
	return <><TableCell align="center">Allowed Transition</TableCell><TableCell align="center">StartState</TableCell>
	<TableCell align="center">EndState</TableCell><TableCell align="center">Domain</TableCell> <TableCell align="center">SpecialTransaction</TableCell></>
  }
}
    



	
class Report extends React.Component { 
  
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
  constructor(props) {		
	super(props)		  
  }
  
  preventDefault = (event) => {
	event.preventDefault();
  }
  
 getRowsData =(clickeditem,datafetched) => {
 
   if(clickeditem === 'User') {
	  return datafetched.map((row) => (
		<TableRow key={row.id}>
		  <TableCell align="center">{row.name}</TableCell>
		  <TableCell align="center">{row.firstName}</TableCell>
		  <TableCell align="center">{row.lastName}</TableCell>
		  <TableCell align="center">{row.dgname}</TableCell>
		  <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>
		</TableRow>
	  ))
	}
   if(clickeditem === 'User Group') {
	return datafetched.map((row) => (
		<TableRow key={row.id}>
		  <TableCell align="center">{row.name}</TableCell>
		  <TableCell align="center">{row.authorityname}</TableCell>
		  <TableCell align="right" onClick={() => this.editUser(row.id)}><CreateIcon /></TableCell>
          <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>
		</TableRow>
	  ))
	}
   if(clickeditem === 'State') {
	return datafetched.map((row) => (
		<TableRow key={row.id}>
		  <TableCell align="center">{row.name}</TableCell>
		  <TableCell align="center">{row.startState.toString()}</TableCell>
		  <TableCell align="center">{row.endState.toString()}</TableCell>
          <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>
		</TableRow>
	))
   }
   if(clickeditem === 'Domain') {
	return datafetched.map((row) => (
		<TableRow key={row.id}>
		  <TableCell align="center">{row.name}</TableCell>
		  <TableCell align="center">{row.type}</TableCell>
		  <TableCell align="center">{row.initialStatename}</TableCell>
          <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>
		</TableRow>
	))
   }
   if(clickeditem === 'Special Transaction') {
	return datafetched.map((row) => (
		<TableRow key={row.id}>
		  <TableCell align="center">{row.name}</TableCell>
		  <TableCell align="center">{row.startnodeid}</TableCell>
		  <TableCell align="center">{row.endnodeid}</TableCell>
		  <TableCell align="center">{row.status.toString()}</TableCell>
		  <TableCell align="center">{row.label3}</TableCell>		  
          <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>
		</TableRow>
	))
   }
   if(clickeditem === 'Allowed Transition') {
	return datafetched.map((row) => (
		<TableRow key={row.id}>
		  <TableCell align="center">{row.name}</TableCell>
		  <TableCell align="center">{row.startnodeid}</TableCell>
		  <TableCell align="center">{row.endnodeid}</TableCell>
		  <TableCell align="center">{row.label2}</TableCell>
		  <TableCell align="center">{row.label1}</TableCell>
          <TableCell align="right" onClick={() => this.deleteUser(row.id)}><DeleteIcon /></TableCell>
		</TableRow>
	))
   }
 }  
  
  addEntry = () => {
	
	let currentpage = this.props.opage
	if(this.props.opage === 'User Group'){
		currentpage = 'AddUserGroup'
	}
	else if(this.props.opage === 'User'){
		currentpage = 'AddUser'
	}
	else if(this.props.opage === 'State'){
		currentpage = 'AddState'
	}
	else if(this.props.opage === 'Domain'){
		currentpage = 'AddDomain'
	}
	else if(this.props.opage === 'Special Transaction'){
		currentpage = 'AddSPCL'
	}
	else if(this.props.opage === 'Allowed Transition'){
		currentpage = 'AddAllwdTrn'
	}
	this.props.history.push({
	  pathname: '/Home',
	  state: { currentrole: this.props.orole, currentpage:currentpage,user: this.props.ouser,pass:this.props.opass,datafetched:'null'}
	})
  }
  
  deleteUser(userId) {
		ApiService.deletefn(this.props.opage,userId,this.props.ouser,this.props.opass).then(res => {
			this.setState({message : 'User deleted successfully.'});
			ApiService.fetchData(this.props.opage,this.props.ouser,this.props.opass).then(response => {
				if(this.props.opage === 'User'){
					this.UserResponse = UtilService.parseUserResponse(response.data)
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole: 'ADMIN', currentpage:this.props.opage,user: this.props.ouser,pass:this.props.opass,
						datafetched:this.UserResponse}
					})
				}
				if(this.props.opage === 'User Group' || this.props.opage === 'State' || this.props.opage === 'Domain' || this.props.opage === 'Special Transaction'
					|| this.props.opage === 'Allowed Transition'){
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole: 'ADMIN', currentpage:this.props.opage,user: this.props.ouser,pass:this.props.opass,
						datafetched:response.data}
					})
				}
				
			});

		});
	}
  
  editUser(id) {
	let currentpage = this.props.opage
	let object = 'null'
	if(this.props.opage === 'User Group'){
		currentpage = 'EditUserGroup'		
	}
	else if(this.props.opage === 'User'){
		currentpage = 'EditUser'
	}
	else if(this.props.opage === 'Special Transaction'){
		currentpage = 'EditSPCL'
	}
	object = {id:id};
	this.props.history.push({
		  pathname: '/Home',
		  state: { currentrole: this.props.orole, currentpage:currentpage,user: this.props.ouser,pass:this.props.opass,datafetched:object}
	})
  }
  
	
  render(){
	  return (
		<React.Fragment>
		  <div style={{"height" : "10%"}}> </div> 
		  <Title>{this.props.opage}</Title>
		  <div style={{"height" : "10%"}}> </div>
		  {this.props.orole != 'USER' &&
		  <Button variant="contained" style = {{width: 100}} color="primary" onClick={() => this.addEntry()}>Add</Button>
		  }
		  <Table size="small" style={{width:'80%'}}>
			<TableHead>
			  <TableRow>
				{getHeader(this.props.opage)}
			  </TableRow>
			</TableHead>
			<TableBody>
			  {this.getRowsData(this.props.opage,this.props.datafetched)}
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
export default withRouter(Report);