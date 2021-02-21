import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { useHistory } from 'react-router-dom';
import { withRouter,Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import ApiService from "../../service/ApiService"
import UtilService from "../../service/UtilService"



const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});
const authtoken = (username,password) =>
		window.btoa(username + ':' + password)
const redirectToRegister = () => {
		this.props.title('Home')
        this.props.history.push('/register'); 
        
    }



class Navigator extends React.Component {
  
	state = {
			classes:'',
			opage: '',
			orole : '',
			ouser : '',
			opass : ''
	};
	UserGroupResponse = [
    {
		id:'',
        name: '',
        authorityname: '',
    }
	];
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
	StateResponse = [
    {
		id:'',
        name: '',
		screenType:'',
		startState:'',
		endState:'',
		permittedStates:'',
    }
	];
	DomainResponse = [
    {
		id:'',
        name: '',
		type:'',
		screenType:'',
		initialStatename:'',
    }
	];
	SpecialTransactionResponse = [
    {
		id:'',
        name: '',
		startnodeid:'',
		endnodeid:'',
		label1:'',
		label2:'',
		status:false,
		label3:'',
    }
	];
	AllowedTransitionResponse = [
    {
		id:'',
        name: '',
		startnodeid:'',
		endnodeid:'',
		label1:'',
		label2:'',
    }
	];
	fullcategories = [
	{
		id: 'Controls',
		children: [
		  { id: 'User Group', icon: <PeopleIcon />, },
		  { id: 'User', icon: <DnsRoundedIcon /> },
		  { id: 'Domain', icon: <PermMediaOutlinedIcon /> },
		  { id: 'Special Transaction', icon: <PublicIcon /> },
		  { id: 'State', icon: <SettingsEthernetIcon /> },
		  { id: 'Allowed Transition', icon: <SettingsInputComponentIcon /> },
		],
	  },
	  {
		id: 'Run Automation',
		children: [
		  { id: 'Units', icon: <SettingsIcon /> },
		  { id: 'Reports', icon: <TimerIcon /> },
		  { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
		],
	  },
	];
	admincategories = [
	{
		id: 'Controls',
		children: [
		  { id: 'Manage Units', icon: <PeopleIcon />, },
		],
	  },
	  {
		id: 'Run Automation',
		children: [
		  { id: 'Units', icon: <SettingsIcon /> },
		  { id: 'Reports', icon: <TimerIcon /> },
		  { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
		],
	  },
	];
	usercategories = [
	{
		id: 'Run Automation',
		children: [
		  { id: 'Units', icon: <SettingsIcon /> },
		  { id: 'Reports', icon: <TimerIcon /> },
		  { id: 'Test Lab', icon: <PhonelinkSetupIcon /> },
		],
	  },
	];
	categories = [];
	constructor(props) {
		
		super(props);
		/*const { classes,role,page,username,password } = props;
		this.state = {classes,role,page,username,password};*/
		this.state = {
			...props
		}
		console.log('Inside contructor ', props);
		if(this.props.location.state.user === 'admin')
			this.categories = this.fullcategories
	    else if(this.props.location.state.currentrole === 'ADMIN')
			this.categories = this.admincategories
		else
			this.categories = this.usercategories
	}
	
	
	handleclick = (clickeditem) => {
	var self = this;
	console.log('clicked item is ', clickeditem , this.state.orole, this.state.opass, this.state.ouser)
	ApiService.fetchData(clickeditem,this.state.ouser,this.state.opass)
		.then((res) => {
			if(clickeditem === 'User Group') {
				self.UserGroupResponse = res.data
				self.redirectToHome(self.UserGroupResponse,clickeditem)
			}
			else if(clickeditem === 'User'){
				self.UserResponse = UtilService.parseUserResponse(res.data)
				console.log('parsed data is ', self.UserResponse)
				self.redirectToHome(self.UserResponse,clickeditem)
			}
			else if(clickeditem === 'State'){
				self.StateResponse = res.data
				self.redirectToHome(self.StateResponse,clickeditem)
			}
			else if(clickeditem === 'Domain' || clickeditem === 'Manage Units' || clickeditem === 'Units'){
				self.DomainResponse = res.data
				console.log('domain data is ', self.DomainResponse)
				self.redirectToHome(self.DomainResponse,clickeditem)
			}
			else if(clickeditem === 'Special Transaction'){
				self.SpecialTransactionResponse = res.data
				console.log('spcl data is ', self.SpecialTransactionResponse)
				self.redirectToHome(self.SpecialTransactionResponse,clickeditem)
			}
			else if(clickeditem === 'Allowed Transition'){
				self.AllowedTransitionResponse = res.data
				console.log('spcl data is ', self.AllowedTransitionResponse)
				self.redirectToHome(self.AllowedTransitionResponse,clickeditem)
			}
			
		});
	
	}
	
	redirectToHome = (responsetosend,clickeditem) => {
		//console.log('Redirecting to home',responsetosend )
		//const history = useHistory();
        this.props.history.push({
		  pathname: '/Home',
		  state: { currentrole: this.state.orole, currentpage:clickeditem,user: this.state.ouser,pass:this.state.opass,datafetched:responsetosend}
		})
    }
	
	
	
	render(){
	
	  //this.settheState(this.props)
	  const {state:{ classes}} = this;	 
	  
	  return (
		<Drawer variant="permanent" >
		  <List disablePadding>
			<ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
				
			</ListItem>
			<ListItem className={clsx(classes.item, classes.itemCategory)}>
			  <ListItemIcon className={classes.itemIcon}>
				<HomeIcon />
			  </ListItemIcon>
			  <ListItemText
				classes={{
				  primary: classes.itemPrimary,
				}}
			  >
				Project Overview
			  </ListItemText>
			</ListItem>
			{this.categories.map(({ id, children }) => (
			  <React.Fragment key={id}>
				<ListItem className={classes.categoryHeader}>
				  <ListItemText
					classes={{
					  primary: classes.categoryHeaderPrimary,
					}}
				  >
					{id}
				  </ListItemText>
				</ListItem>
				{children.map(({ id: childId, icon, active }) => (
				  <ListItem
					key={childId}
					button
					className={clsx(classes.item, active && classes.itemActiveItem)}
					onClick={() => {this.handleclick(childId)}}
				  >
					<ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
					<ListItemText
					  classes={{
						primary: classes.itemPrimary,
					  }}
					>
					  {childId}
					</ListItemText> 
				  </ListItem>
				))}

				<Divider className={classes.divider} />
			  </React.Fragment>
			))}
			
		  </List>

		</Drawer>
	  );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Navigator))

/*axios.get(API_BASE_URL+'appadmin/usergroup', {
			headers: {
				'Authorization': `Basic ${authtoken(this.state.ouser,this.state.opass)}`
		}}).then(function (response) {
			if(response.status === 200){
				self.UserGroupResponse = response.data
				self.redirectToHome(clickeditem)
			}
		}).catch(function (error) {
				
        });*/