const correctPassword = "longpassword";
const moan = new Audio('./assets/moan.wav');
const naom = new Audio('./assets/naom.wav');
let moanplayed = false;
let stage = 0;

document
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13 && stage==0){
    	if(document.getElementById("passwordBox").value == correctPassword) {
        	document.getElementById("bg").style.backgroundColor = "green";
        	setTimeout(nextPage(), 500);
	    } else {
	    	document.getElementById("bg").style.backgroundColor = "black";
	    }
	}
});

function arrowColor(element){
	let id = element.id;
	let arrow = document.getElementById("passwordArrow");
	let password = document.getElementById(id).value;
	let hint = document.getElementById("hint");
	let chars = document.getElementById("chars");

	chars.innerHTML = '&oline;'.repeat(password.length<21?password.length:21);

	if(password == correctPassword){
		arrow.style.color = "green";
		chars.style.color = "green";
	} else if(password == "hint"){
		hint.style.color = "white";
		chars.style.color = "gold";
		arrow.style.color = "gold";
	} else if(password == ""){
		arrow.style.color = "white";
		hint.style.color = "black";
		chars.style.color = "red";
	} else if(password == "poop" || password == "shit"){
		document.getElementById("bg").style.backgroundColor = "saddlebrown";
	} else {
		hint.style.color = "black";
		if(password.length == 4 || password.length == correctPassword.length){
			chars.style.color = "tomato";
			arrow.style.color = "tomato";
		} else {
			chars.style.color = "red";
			arrow.style.color = "red";
		}
	}

	if(password.includes("fuck")){
		if(!moanplayed){
			moan.play();
		}
		moanplayed = true;
		setTimeout(()=>{moanplayed = false;}, 10000);
	}
	if(password.includes("kcuf")){
		naom.play();
	}
}

function nextPage(){
	console.log("CORRECT!");
	stage += 1;
	window.location.href = "./page2.html";
}
