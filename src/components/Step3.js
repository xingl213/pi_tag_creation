import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Papa from "papaparse";
import { Buffer } from 'buffer';

function Step3() {

	const [hasResponse, setHasResponse] = useState(false);
	const [response, setResponse] = useState("");

  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

// POST template: right now this code gets 400 bad request error when sending in chrome dev tools console
// fetch("https://cakitzapp1/piwebapi/dataservers/F1DSAAAAAAAAAAAAAAAAAACCYQS0lUUEkwMQ/points",
// {
//     method: "POST",
// 	  headers: {
// 	    'Accept': 'application/json',
// 	    'Content-Type': 'application/json'
// 	  },
//     body: {
// 		  "Name": "test_xing_2",
// 		  "Descriptor": "try if I could create pi points using fetch api through chrome dev tools",
// 		  "PointClass": "classic",
// 		  "PointType": "Float32",
// 		  "EngineeringUnits": "",
// 		  "Step": false,
// 		  "Future": false,
// 		  "DisplayDigits": -5
// 		}
// })
// .then(res => res.json())
// .then((result) => {
// 	console.log(result);
// });

	const handlePublish = () => {
		var url = "https://cakitzapp1/piwebapi/dataservers/F1DSAAAAAAAAAAAAAAAAAACCYQS0lUUEkwMQ/points?nameFilter=test_xing*";
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url); xhr.onload = function () {
		    console.log(xhr.status, JSON.parse(xhr.responseText));
		    // console.log(xhr.response);
				if (xhr.status === 200) {
					setHasResponse(true);
				}
				setResponse(xhr.response);
		}

		const username = "COPR\\Xing.Ling";
		const password = "FGyXF13579";
		const encodedString = Buffer.from(username + ":" + password).toString('base64');
		xhr.setRequestHeader("Authorization", "Basic " + encodedString);
		xhr.send();
	}

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

  return (
    <div className="container">
    	<br/>
    	<h3>(After completing step 2)</h3>

      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />

			<Button onClick={handlePublish}>Publish</Button>

			<h2>Response:</h2>	
			<div>{response}</div>
    </div>
  );
}

export default Step3;
