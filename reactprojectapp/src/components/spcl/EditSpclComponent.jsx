import React, { Component } from 'react'
import ApiService from "../../service/ApiService";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withRouter } from "react-router-dom";

class EditSpclComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            startnodeid=[],
			name:'',
			endnodeid=[],
			label1:'',
			label2:'',
        }
        this.savespcl = this.savespcl.bind(this);
        this.loadspcl = this.loadspcl.bind(this);
    }

    componentDidMount() {
        this.loadspcl();
    }

    loadspcl() {
        ApiService.fetchSpclById(this.props.datafetched.id,this.props.ouser,this.props.opass)
            .then((res) => {
                let spcl = res.data;
                this.setState ({
					id: spcl.id,
					name:spcl.name,
					startnodeid: spcl.startnodeid,
					endnodeid : spcl.endnodeid,
				})
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    savespcl = (e) => {
        let spcl = {name: this.state.name,startnodeid:this.state.startnodeid,endnodeid:this.state.endnodeid};
        ApiService.addSPCL(spcl,this.props.ouser,this.props.opass)
            .then(res => {
                this.setState({message : 'SPCL added successfully.'});
                ApiService.fetchData('Special Transaction',this.props.ouser,this.props.opass).then(response => {
					this.SpecialTransactionResponse = response.data
					this.props.history.push({
					pathname: '/Home',
					state: { currentrole:'ADMIN',currentpage:'Special Transaction',user:this.props.ouser,pass:this.props.opass,
							datafetched:this.SpecialTransactionResponse}
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
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>User Group</label>
								<Select options={ this.state.UserGroupResponse } value={selectedug} className="Select-control" onChange={e => this.handleuChange(e)}/>
						</div>
						<div style={{"height" : "10%"}} align="center" > </div>
						<div className="form-group form-inline" >
							<label style={{marginRight: '10px'}}>Domain</label>
								<Select options={ this.state.DomainResponse } value={selectedd} className="Select-control" onChange={e => this.handledChange(e)}/>
						</div>
						<div style={{"height" : "10%"}}> </div>
						<div className="form-group form-inline">
							<Button variant="contained" color="primary" align="center" onClick={e => this.savespcl(e)}>Save</Button>
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