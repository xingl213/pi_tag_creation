import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Papa from "papaparse";

function Step3() {

	const [hasResponse, setHasResponse] = useState(false);
	const [response, setResponse] = useState("");

  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);

	const handlePublish = () => {
		fetch("https://api.plos.org/search?q=title:DNA") // TODO: build urls using pi web api controllers
			.then(res => res.json())
			.then(
				(result) => {
					setHasResponse(true);
					setResponse(result.response);
				});
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
			<div>{JSON.stringify(response)}</div>
    </div>
  );
}

export default Step3;
