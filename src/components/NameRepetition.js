import { Buffer } from 'buffer';

function FindExistingTagNames(parsedData) {

	var issues = [];
	var indices = [];

	for (var i = 0; i < parsedData.length; i++) {
		var issueMsg;
		var tempResponse;
		var jsonResponse;

		var url = "https://cakitzapp1/piwebapi/dataservers/F1DSAAAAAAAAAAAAAAAAAACCYQS0lUUEkwMQ/points?nameFilter=" + parsedData[i]["PI Tag Name"];
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url); xhr.onload = function () {
			// console.log(xhr.status, JSON.parse(xhr.responseText));
			// tempResponse = xhr.response;
			if (xhr.status == 200 && xhr.response["Items"].length > 0) {
				indices.push(i);
			}
		}

		const username = "CORP\\Xing.Ling";
		const password = "FGyXF13579";
		const encodedString = Buffer.from(username + ":" + password).toString('base64');
		xhr.setRequestHeader("Authorization", "Basic " + encodedString);
		xhr.send();

		// // debug
		// console.log("Response status is");
		// console.log(xhr.status);

		// if (tempResponse != null) { // tempResponse is a string so parse into js object first
		// 	jsonResponse = JSON.parse(tempResponse);
		// } else { // debug
		// 	console.log("tempResponse wasn't initialized.");
		// 	console.log("Response status is " + xhr.status.toString());
		// }
		// if (jsonResponse != null && jsonResponse["Items"].length > 0) { // (get 200 response and) pi tag name exists in data archive
		// 	issueMsg = "Tag name on row " + (i+2).toString() + " already exists: " + parsedData[i]["PI Tag Name"];
		// 	issues.push(issueMsg);
		// }
	}

	for (const j of indices) {
		var issueMsg = "Tag name on row " + (j+2).toString() + " already exists: " + parsedData[j]["PI Tag Name"];
		issues.push(issueMsg);
	}

	return issues;
}

export default FindExistingTagNames;
