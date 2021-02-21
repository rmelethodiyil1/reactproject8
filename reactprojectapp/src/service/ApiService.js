import axios from 'axios';
import {API_BASE_URL} from '../constants/apiConstants';

const authtoken = (username,password) =>
		window.btoa(username + ':' + password)
class ApiService {

    /*fetchUsers() {
        return axios.get(USER_API_BASE_URL);
    }*/
	processUnit(data,username,password) {
		return axios.post(API_BASE_URL+'appuser/unit/specialtransaction', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	transactUnit(data,username,password) {
		return axios.post(API_BASE_URL+'appuser/unit/transact', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
    fetchUsergById(user,username,password) {
        return axios.post(API_BASE_URL + 'appadmin/usergroup/id' ,user,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
	fetchSpclById(reqid,username,password) {
        return axios.put(API_BASE_URL + 'appadmin/specialtransaction/' +reqid,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
    deletefn(requester,reqid,username,password) {
		if(requester === 'User Group') {
			return axios.delete(API_BASE_URL + 'appadmin/usergroup/' + reqid,{
				headers: {
					'Authorization': `Basic ${authtoken(username,password)}`
			}})
		}
		else if(requester === 'User'){
			return axios.delete(API_BASE_URL + 'appadmin/user/' + reqid,{
				headers: {
					'Authorization': `Basic ${authtoken(username,password)}`
			}})
		}
		else if(requester === 'State'){
			return axios.delete(API_BASE_URL + 'appadmin/state/' + reqid,{
				headers: {
					'Authorization': `Basic ${authtoken(username,password)}`
			}})
		}
		else if(requester === 'Domain'){
			return axios.delete(API_BASE_URL + 'appadmin/domain/' + reqid,{
				headers: {
					'Authorization': `Basic ${authtoken(username,password)}`
			}})
		}
		else if(requester === 'Allowed Transition'){
			return axios.delete(API_BASE_URL + 'appadmin/allowedtransition/' + reqid,{
				headers: {
					'Authorization': `Basic ${authtoken(username,password)}`
			}})
		}
		else if(requester === 'Special Transaction'){
			return axios.delete(API_BASE_URL + 'appadmin/specialtransaction/' + reqid,{
				headers: {
					'Authorization': `Basic ${authtoken(username,password)}`
			}})
		}
		else if(requester === 'Manage Units' || requester === 'Fetch Units'){
			return axios.delete(API_BASE_URL + 'appadmin/unit/' + reqid,{
				headers: {
					'Authorization': `Basic ${authtoken(username,password)}`
			}})
		}
	}

    addUsergroup(data,username,password) {
		return axios.post(API_BASE_URL+'appadmin/usergroup', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	
	fetchUsergroup(username,password) {
		return axios.get(API_BASE_URL+'appadmin/usergroup',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
    editUserg(userid,user,username,password) {
        return axios.put(API_BASE_URL + 'appadmin/usergroup/' + userid, user,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
	
	fetchUser(username,password) {
		return axios.get(API_BASE_URL+'appadmin/user',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	fetchAllState(username,password) {
		return axios.get(API_BASE_URL+'appadmin/allstates',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	fetchStartState(username,password) {
		return axios.get(API_BASE_URL+'appadmin/allstartstate',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	fetchEndState(username,password) {
		return axios.get(API_BASE_URL+'appadmin/allendstate',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	fetchDomain(username,password) {
		return axios.get(API_BASE_URL+'appadmin/domain',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	fetchSPCL(username,password) {
		return axios.get(API_BASE_URL+'appadmin/specialtransaction',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	fetchAllwd(username,password) {
		return axios.get(API_BASE_URL+'appadmin/allowedtransition',{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	fetchSpclforDomug(domainname,usergroup,username,password){
		return axios.get(API_BASE_URL+'appadmin/specialtransaction/' + domainname + '/' + usergroup,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
	fetchUnitsforDom(requestobj,username,password){
		return axios.post(API_BASE_URL+'appuser/fetchunits', requestobj ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
	fetchpUnitsforDom(requestobj,username,password){
		return axios.post(API_BASE_URL+'appuser/fetchtxnunits', requestobj ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
	fetchData(clickeditem,username,password) {
		
		if(clickeditem === 'User Group') {
			return this.fetchUsergroup(username,password);
		}
		else if (clickeditem === 'User') {
			return this.fetchUser(username,password);
		}
		else if (clickeditem === 'State') {
			return this.fetchAllState(username,password);
		}
		else if (clickeditem === 'StartState') {
			return this.fetchStartState(username,password);
		}
		else if (clickeditem === 'EndState') {
			return this.fetchEndState(username,password);
		}
		else if (clickeditem === 'Domain' || clickeditem === 'Manage Units' || clickeditem === 'Units') {
			return this.fetchDomain(username,password);
		}
		else if (clickeditem === 'Special Transaction') {
			return this.fetchSPCL(username,password);
		}
		else if (clickeditem === 'Allowed Transition') {
			return this.fetchAllwd(username,password);
		}
    }
	addUser(data,username,password) {
		return axios.post(API_BASE_URL+'appadmin/user', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	editUser(userid,user,username,password) {
        return axios.put(API_BASE_URL + 'appadmin/user/' + userid, user,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
	fetchUserById(user,username,password) {
        return axios.post(API_BASE_URL + 'appadmin/user/id' ,user,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
	}
	addState(data,username,password) {
		return axios.post(API_BASE_URL+'appadmin/state', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
    addDomain(data,username,password) {
		return axios.post(API_BASE_URL+'appadmin/domain', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	addSPCL(data,username,password) {
		return axios.post(API_BASE_URL+'appadmin/specialtransaction', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	addAllwd(data,username,password) {
		return axios.post(API_BASE_URL+'appadmin/allowedtransition', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
	addUnit(data,username,password) {
		return axios.post(API_BASE_URL+'appadmin/unit', data ,{
			headers: {
				'Authorization': `Basic ${authtoken(username,password)}`
		}})
    }
}

export default new ApiService();