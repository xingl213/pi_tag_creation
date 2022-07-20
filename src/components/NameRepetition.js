import { Buffer } from 'buffer';

function FindExistingTagNames(parsedData) {

	const issues = [];

	for (var i = 0; i < parsedData.length; i++) {
		var issueMsg;
		var tempResponse;
		var jsonResponse;
		
		var url = "https://cakitzapp1/piwebapi/dataservers/F1DSAAAAAAAAAAAAAAAAAACCYQS0lUUEkwMQ/points?nameFilter=" + parsedData[i]["PI Tag Name"];
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url); xhr.onload = function () {
				tempResponse = xhr.response;
		}

		const username = "CORP\\Xing.Ling";
		const password = "FGyXF13579";
		const encodedString = Buffer.from(username + ":" + password).toString('base64');
		xhr.setRequestHeader("Authorization", "Basic " + encodedString);
		xhr.send();

		if (tempResponse != null) { // tempResponse is a string so parse into js object first
			jsonResponse = JSON.parse(tempResponse);
		}
		if (jsonResponse != null && jsonResponse["Items"].length > 0) { // (get 200 response and) pi tag name exists in data archive
			issueMsg = "Tag name on row " + (i+2).toString() + " already exists: " + parsedData[i]["PI Tag Name"];
			issues.push(issueMsg);
		}
	}

	return issues;
}

export default FindExistingTagNames;
