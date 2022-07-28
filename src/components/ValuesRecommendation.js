import Papa from "papaparse";
import data_model from '../assets/data_model.csv';

var model = [];

function readModel() {
	if (model.length === 0) {
	    Papa.parse(data_model, {
	      header: true,
	      skipEmptyLines: true,
	      complete: function (results) {
	        for (const tag of results.data) {
	        	model.push(tag);
	        }
	        // model = model.concat(results.data);
	      },
	    });		
	}
}

function compare(modelObj, actualObj) {
	// tag name lengths differ, return null
	if (modelObj["PI Tag Name"].length !== actualObj["PI Tag Name"].length) {
		return null;
	}

	var diffIndices = [];
	var arrLen = 0;
	var i = 0;
	while (arrLen < 3 && i < modelObj.length) {
		if (modelObj["PI Tag Name"].charAt(i) === actualObj["PI Tag Name"].charAt(i)) {
			diffIndices.push(i);
			arrLen = arrLen + 1;
		}
		i = i + 1;
	}

	// more than two characters differ, return null
	if (arrLen > 2) {
		return null;
	}

	// non-numeric characters differ, return null
	for (var j = 0; j < diffIndices.length; j++) {
		if (!(j >= '0' && j <= '9')) {
			return null;
		}
	}

	// non-consecutive characters differ, return null
	if (arrLen === 2 && diffIndices[0] + 1 !== diffIndices) {
		return null;
	}

	// all the tests pass, modelObj is an example of actualObj
	return modelObj;
}

function Recommend(parsedData) {
	readModel();
	console.log(model);
	var messages = [];

	for (const tag of parsedData) {
		for (const ex of model) {
			if (compare(ex, tag) != null) {
				var msg;
				if (tag["engunits"] !== ex["engunits"]) {
					msg = msg + "Recommended value for engunits of tag " + tag["PI Tag Name"] + ": " + ex["engunits"] + ".";
				}
				if (tag["span"] !== ex["span"]) {
					msg = msg + "Recommended value for span of tag " + tag["PI Tag Name"] + ": " + ex["span"].toString() + ".";
				}
				if (tag["zero"] !== ex["zero"]) {
					msg = msg + "Recommended value for zero of tag " + tag["PI Tag Name"] + ": " + ex["zero"].toString() + ".";
				}
				if (tag["Step"] !== ex["Step"]) {
					msg = msg + "Recommended value for Step of tag " + tag["PI Tag Name"] + ": " + ex["Step"].toString() + ".";
				}
				messages.push(msg);
				break;
			}
		}
	}

	return messages;
}

export default Recommend;
