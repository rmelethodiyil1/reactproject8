import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import {API_BASE_URL} from '../../constants/apiConstants';
import axios from 'axios';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});
const authtoken = (username,password) =>
		window.btoa(username + ':' + password)
		
function HeaderLoggedIn(props) {
  const { classes, onDrawerToggle } = props  
  
  const history = useHistory();
  const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
  const setthetitle = () =>{
		console.log('path  is ' , window.location.pathname)
		let inurlpath = capitalize(window.location.pathname.substring(1,window.location.pathname.length))
		console.log('URL PATH is ',inurlpath)
		if(inurlpath == 'Home'){
			return 'Multi Booking Application'
		}
		else if(inurlpath == 'Login'){
			return 'Login to Application'
		}
  }

  const signOut = (ouser,opass) =>{
	   console.log('logging out user ' , ouser , ' with pass ' , opass)
	   axios.get('https://18.222.37.86:8080/logout', {
				headers: {
				'Authorization': `Basic ${authtoken(ouser,opass)}`
				}
			}).then(function (response) {
			if(response.status === 200){
				 history.push({
					pathname:  "/login"
				 })
			}
	  })
  }
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Link className={classes.link} href="#" variant="body2">
                Go to docs
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container align = "center" justify = "center" alignItems="center" spacing={1}>
            <Grid item xs>  
              <Typography color="inherit" variant="h5"  component="h1">
			  {setthetitle()}
              </Typography>
            </Grid>
			<Grid item >
              <IconButton color="secondary" aria-label="sign out" onClick={() => { signOut(props.ouser,props.opass) }}>
					<ExitToAppIcon fontSize="large" />
			  </IconButton>
            </Grid>
            <Grid item >
              <Button className={classes.button} variant="outlined" color="inherit" size="small">
                Web setup
              </Button>
            </Grid>
            <Grid item >
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        
      </AppBar>
    </React.Fragment>
  );
}

HeaderLoggedIn.propTypes = {
  classes: PropTypes.object.isRequired,
};
//  onDrawerToggle: PropTypes.func.isRequired,

export default withStyles(styles)(HeaderLoggedIn);