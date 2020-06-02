import Vue from 'vue'
let self = new Vue();

function getdata(url,data,headers){
	return self.$http.post_request(url,data,headers)
}

export {
	getdata
}
