import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";

class EditUserGroupComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            authoritytype: 'USER',
			name:'',
            
        }
        this.saveUser = this.saveUser.bind(this);
        this.loadUser = this.loadUser.bind(this);
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser() {
        ApiService.fetchUsergById(this.props.datafetched,this.props.ouser,this.props.opass)
            .then((res) => {
                let user = res.data;
                this.setState({
                id: user.id,
				name:user.name,
                authoritytype: user.authorityname,
                })
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveUser = (e) => {
        e.preventDefault();
        let user = {id:this.state.id,name: this.state.name, authorityname: this.state.authoritytype};
        ApiService.editUserg(this.state.id,user,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'User modified successfully.'});
                ApiService.fetchData('User Group',this.props.ouser,this.props.opass).then(response => {
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole: 'ADMIN', currentpage:'User Group',user: this.props.ouser,pass:this.props.opass,
							datafetched:response.data}
					})
				});

            });
    }

    render() {
        return (
            <div>
                <Typography variant="h4" style={style}>Edit User</Typography>
                <form>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>User Group Name</label>
                        <TextField type="text" placeholder="name" fullWidth margin="normal" name="Name" readonly="true" value={this.state.name}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline">
							<label style={{marginRight: '10px'}}>Authority Type</label>
							<select  margin="normal" name="authoritytype" align="center" value={this.state.authoritytype} onChange={this.onChange}>
							  <option value="USER">USER</option>
							  <option value="ADMIN">ADMIN</option>
							</select>
						 </div>
						<div style={{"height" : "20%"}}> </div>
						<div className="form-group form-inline">
							<Button variant="contained" color="primary" onClick={this.saveUser}>Save</Button>
						</div>
                </form>
            </div>
        );
    }
}

const style ={
    display: 'flex',
    justifyContent: 'center'
}

export default withRouter(EditUserGroupComponent);