
const rhost = `rayofsunshine.ddns.net`;
const rport = `25569`;
const rapi = `https://use.gameapis.net/mc/query/extensive/`;

window.onload = function(){
	getStatus(rhost, rport, rapi)
		.then((res)=>{
			console.log(res);
			document.getElementById("main").innerHTML = JSON.stringify(res);
		});
}

// Holy shit I love fetch
let getStatus = function(host, port, api){
	console.log("getStatus actually running")	
	return fetch(`${api}${host}:${port}`)
	.then((res)=>{
		return res.json();
	})
	.catch((err)=>{
		return { message : "Fetch failed."}
	});
}

