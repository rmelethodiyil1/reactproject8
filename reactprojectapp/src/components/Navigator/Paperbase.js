import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from './Navigator';
import Content from './Content';
import HeaderLoggedIn from './HeaderLoggedIn';
import Report from '../TableReport/Report';
import AddUserGroupComponent from "../user/AddUserGroupComponent";
import EditUserGroupComponent from "../user/EditUserGroupComponent";
import EditUserComponent from "../user/EditUserComponent";
import AddUserComponent from "../user/AddUserComponent";
import AddStateComponent from "../state/AddStateComponent";
import AddDomainComponent from "../domain/AddDomainComponent";
import AddSpclComponent from "../spcl/AddSpclComponent";
import AddAllwdTrnComponent from "../allowedTransition/AddAllwdTrnComponent";
import AddUnits from "../Units/AddUnits";
import UnitReport from "../Units/UnitReport";
import FetchUnit from "../enduser/FetchUnit";
import TransactUnit from "../enduser/TransactUnit";


let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};


const styles = {
  root: {
    minHeight: '100vh',
  },
  drawer: {
	[theme.breakpoints.up('sm')]: {
	 width:'20%',
    },
  },
  app: {
	width:1500,
	display:'flex',
	flexDirection:'column',
	justifyContent:'space-around',	
	alignItems:'flex-end',
  },
  header:{
	  flex:1,
	  alignSelf:'flex-start',
  },
  project:{
	  flex:8,
	  width:'50%',
  },
  copyright:{
  },
  main: {
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  footer: {
	flex:1,
    padding: theme.spacing(2),
   
  },
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" >
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
function Paperbase(props) {
  
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const project = () => {
	switch(npage) {
		
	case ("User Group"):
		  return <Report opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;	
	case ("User"):
		  return <Report opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;
	case ("State"):
		  return <Report opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;
	case ("Domain"):
		  return <Report opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;
	case ("Special Transaction"):
		  return <Report opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;
	case ("Allowed Transition"):
		  return <Report opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;
	case ("Manage Units"):
		  return <UnitReport key="Manage Units" opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;
	case ("Fetch Units"):
		  return <UnitReport key="Fetch Units" opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;
    case ("Units"):
		  return <FetchUnit opage={npage} ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project}/>
		  break;		  
	case ("AddUserGroup"):
		  return <AddUserGroupComponent ouser={nuser} opass={npass} className={classes.project} />
		  break;
	case ("EditUserGroup"):
		  return <EditUserGroupComponent ouser={nuser} opass={npass} datafetched={datafetched} className={classes.project} />
		  break;
	case ("AddUser"):
		  return <AddUserComponent ouser={nuser} opass={npass} className={classes.project} />
		  break;
	case ("AddState"):
		  return <AddStateComponent ouser={nuser} opass={npass} datafetched={datafetched} className={classes.project} />
		  break;
	case ("AddDomain"):
		  return <AddDomainComponent ouser={nuser} opass={npass} datafetched={datafetched} className={classes.project} />
		  break;
	case ("AddSPCL"):
		  return <AddSpclComponent ouser={nuser} opass={npass} datafetched={datafetched} className={classes.project} />
		  break;
	case ("AddAllwdTrn"):
		  return <AddAllwdTrnComponent ouser={nuser} opass={npass} datafetched={datafetched} className={classes.project} />
		  break;
	case ("AddUnit"):
		  return <AddUnits ouser={nuser} opass={npass} datafetched={datafetched} className={classes.project} />
		  break;
	case ("Trasact Unit"):
		  return <TransactUnit ouser={nuser} opass={npass} orole={nrole} datafetched={datafetched} className={classes.project} />
		  break;
	default :
		  return <div> </div>
		  break;
	}
  }
  const  nrole  = props.role;
  const  npage  = props.page
  const  nuser  =  props.user
  const  npass =   props.pass
  const datafetched = props.datafetched
  
  return (
	
    <ThemeProvider theme={theme}>
      <div className={classes.root}>

       <CssBaseline />
        <nav className={classes.drawer} >
          <Hidden smUp implementation="js">
            <Navigator orole={props.role} opage={props.page} ouser={props.user} opass={props.pass} 
              PaperProps={{ style: { width: '20%' } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation="css">
            <Navigator PaperProps={{ style: { width: '20%' } }} orole={props.role} opage={props.page} 
			ouser={props.user} opass={props.pass}/>
          </Hidden>
        </nav>
		
        <div className={classes.app}>
            <HeaderLoggedIn className={classes.header} ouser={props.user} opass={props.pass}/>
		    { project() }
		 <footer className={classes.footer}>
			<div style={{"height" : "95%"}}> </div>		 
            <Copyright/>	
          </footer>
       </div>
      </div>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired,
};
// <main className={classes.main}>
//            <Content />
 //         </main>
//// onDrawerToggle={handleDrawerToggle}
//		   
// background: '#eaeff1',

export default withStyles(styles)(Paperbase);