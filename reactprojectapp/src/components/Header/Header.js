import React from 'react';
import { withRouter } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const setthetitle = () =>{
		let inurlpath = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
		console.log('URL PATH is ',inurlpath)
		if(inurlpath == 'Home'){
			return 'Multi Booking Application'
		}
		else if(inurlpath == 'Login'){
			return 'Login to Application'
		}
	}
    return(
        <nav >
            <div >
                <span className="h3">{setthetitle()}</span>
			    <span> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </span> 
				<IconButton color="secondary" aria-label="add an alarm">
					<ExitToAppIcon fontSize="large" />
				</IconButton>
            </div>
        </nav>
    )
}
export default withRouter(Header);
//className="navbar navbar-dark bg-primary"
//className="row col-12 d-flex justify-content-center text-white"