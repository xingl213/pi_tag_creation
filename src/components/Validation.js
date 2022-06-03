function Validate(parsedData) { // parsedData is an array of objects. Each object represents a row

  const issues = [];
  var issueMsg;

  const validPointTypes = new Set(['digital', 'int16', 'int32', 'float16', 'float32', 'float64', 'string', 'timestamp', 'blob']);

  for (var i = 0; i < parsedData.length; i++) {

    // check if any tag name contains space character
    if (parsedData[i]["PI Tag Name"].includes(' ')) {
      issueMsg = "Tag name on row " + (i+2).toString() + " contains illegal character: space.";
      issues.push(issueMsg);
    }

    // check if any tag name is empty
    if (parsedData[i]["PI Tag Name"] === '') {
      issueMsg = "Tag name on row " + (i+2).toString() + " is empty string.";
      issues.push(issueMsg);
    }

    // check if any instrument tag is empty
    if (parsedData[i]["instrumenttag"] === '') {
      issueMsg = "Instrument tag on row " + (i+2).toString() + " is empty string.";
      issues.push(issueMsg);
    }

    // check if point type is valid
    if (!validPointTypes.has(parsedData[i]["pointtype"].toLowerCase())) {
    	issueMsg = "Point type on row " + (i+2).toString() + " is not a valid option.";
    	issues.push(issueMsg);
    }

    // check if tag name matches allowed pattern (given it's not empty string)
    if (parsedData[i]["PI Tag Name"] !== '' && !/^KIT:\d{4}-.+/.test(parsedData[i]["PI Tag Name"])) {
    	issueMsg = "Tag name on row " + (i+2).toString() + " doesn't follow correct naming pattern.";
    	issues.push(issueMsg);
    }
  }

  return issues;
}

export default Validate;
