import React, { useState } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import FindExistingTagNames from './NameRepetition';
import Papa from "papaparse";

function Step2() {

  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },
    });
  };

  const issues = FindExistingTagNames(parsedData);
  // debugging use
  console.log("The issues regarding naming repetition are:");
  console.log(issues);

  return (
    <div className="container">
    	<br/>

      <Card>
        <CardBody>
          <CardTitle tag="h3" style={{ color: "red" }}>Issues</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">The following tag names already exist in PI data archive:</CardSubtitle>
          <CardText>
          	<ul style={{ color: "blue" }}>
            	{issues.map((issue, index) => {
            		return <li key={index}>{issue}</li>;
            	})}
          	</ul>
          </CardText>
        </CardBody>
      </Card>

      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
    </div>
  );
}

export default Step2;
