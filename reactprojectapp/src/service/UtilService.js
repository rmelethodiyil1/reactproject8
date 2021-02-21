

class UtilService {
	
	parseUserResponse(responsedata){
		
		let userdata = responsedata.startnodes;
		let ugdata = responsedata.endnodes;		
		return userdata.map((item, i) => Object.assign({}, item, ugdata[i]));
	}
	

}

export default new UtilService();

