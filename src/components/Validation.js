function Validate(parsedData) { // parsedData is an array of objects. Each object represents a row

  const issues = [];
  var issueMsg;

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
  }

  return issues;
}

export default Validate;
