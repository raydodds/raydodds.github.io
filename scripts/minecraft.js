
const rhost = `forest.raydodds.com`;
const rport = `25569`;
const rapi = `https://use.gameapis.net/mc/query/extensive/`;

let fuckedCount = 0;

window.onload = function(){
	console.log("load")
	getStatus(rhost, rport, rapi)
		.then(updatePage)
		.catch((err)=>{
			console.log("FUCK")
		});
}

window.setInterval(()=>{
	getStatus(rhost, rport, rapi)
		.then(updatePage)
		.catch((err)=>{
			console.log("FUCK")
		});
	}, 10000);

// Holy shit I love fetch
let getStatus = function(host, port, api){
	return fetch(`${api}${host}:${port}`)
	.then((res)=>{
		return res.json();
	})
	.catch((err)=>{
		return { message : "Fetch failed."}
	});
}

let populatePlayers = function(playerList){

	console.log("this")

	let table = document.getElementById("playerTable");

	table.innerHTML = "";

	for( let i = 0; i < playerList.length; i++){
		console.log(playerList[i]);
		let newPlayer = document.createElement("div");
		newPlayer.className = "player";
		let newText = document.createTextNode(playerList[i]);
		newPlayer.appendChild(newText);
		table.appendChild(newPlayer);
	}
}

let updatePage = function(res){

	let body = document.getElementById("body");
	let numPlayers = document.getElementById("currPlayers");

	console.log("Here")
	if(!!res.status){
		console.log("there")
		body.style.backgroundColor = "lightgreen";
		numPlayers.innerHTML = res.players.online;
		//document.getElementById("playerTable").innerHTML = JSON.stringify(res);
		populatePlayers(res.list);
	} else {
		if(fuckedCount > 3){
			console.log("near")
			body.style.backgroundColor = "pink";
			numPlayers.parentElement.innerHTML = "<h1>SERVER'S FUCKED</h1>";
		} else {
			fuckedCount++;
			numPlayers.innerHTML = numPlayers.innerHTML+"?";
		}
	}

}
