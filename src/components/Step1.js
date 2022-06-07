import React, { useState } from 'react';
import { Table, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import Validate from './Validation';
import Papa from "papaparse";
import csv_template from '../assets/csv_pi_tag_template.csv';

function Step1(props) {

  // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
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

  // if user has uploaded a non-empty file, display row number in header; otherwise, don't
  var rowNumberHeaderDisplay = null;
  if (parsedData.length > 0) {
  	rowNumberHeaderDisplay = '#';
  }

  const issues = Validate(parsedData);

  return (
    <div className="container">

    	<br/>

			<div>
			  <Card>
			    <CardBody>
			      <CardTitle tag="h3">
			        Upload an excel file
			      </CardTitle>
			      <CardSubtitle
			        className="mb-2 text-muted"
			        tag="h6"
			      >
			        Download and fill in the PI tag creation template <a href={csv_template} download>HERE</a>. Or you can create an excel file formatted like this:
			      </CardSubtitle>
			    </CardBody>
		      <Table
		      >
		        <thead>
		          <tr>
		            <th>PI Tag Name</th>
		            <th>descriptor</th>
		            <th>digitalset</th>
		            <th>engunits</th>
		            <th>instrumenttag</th>
		            <th>pointtype</th>
		            <th>span</th>
		            <th>zero</th>
		            <th>step</th>
		          </tr>
		        </thead>
		        <tbody>
		          <tr>
		            <td>pi_tag_name_ex1</td>
		            <td>descriptor_ex1</td>
		            <td>digital_set_ex1</td>
		            <td>eng_units_ex1</td>
		            <td>instrument_tag_ex1</td>
		            <td>point_type_ex1</td>
		            <td>span_ex1</td>
		            <td>zero_ex1</td>
		            <td>step_ex1</td>
		          </tr>
		          <tr>
		            <td>pi_tag_name_ex2</td>
		            <td>descriptor_ex2</td>
		            <td>digital_set_ex2</td>
		            <td>eng_units_ex2</td>
		            <td>instrument_tag_ex2</td>
		            <td>point_type_ex2</td>
		            <td>span_ex2</td>
		            <td>zero_ex2</td>
		            <td>step_ex2</td>
		          </tr>
		          <tr>
		            <td>...</td>
		            <td>...</td>
		            <td>...</td>
		            <td>...</td>
		            <td>...</td>
		            <td>...</td>
		            <td>...</td>
		            <td>...</td>
		            <td>...</td>
		          </tr>
		        </tbody>
		      </Table>
			    <CardBody>
			      <CardText>
			        A list of issues will be displayed below after the upload. If there is no issue, proceed to step 2 to publish the newly created PI tags.
			      </CardText>
			    </CardBody>
			  </Card>
			</div>

			<br/>

      <Card>
        <CardBody>
          <CardTitle tag="h3">Instructions</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">Follow these guidelines to create the excel file</CardSubtitle>
          <CardText>
          	<ul>
            	<li>Point type is one of: digital, int16, int32, float16, float32, float64, string, blob, timestamp (not case sensitive)</li>
            	<li>Don't leave any required field empty</li>
            	<li>PI Tag structure: KIT:<strong>Sector Number</strong>-<strong>Name</strong></li>
            	<li>Instrument tag structure: <strong>PLC Server</strong>::[<strong>PLC Name on the Server</strong>]<strong>Instrument Tag</strong></li>
          	</ul>
          </CardText>
        </CardBody>
      </Card>

			<br/>

      <Card>
        <CardBody>
          <CardTitle tag="h3" style={{ color: "red" }}>Issues</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">Refer back to the instructions, fix the following issues, and upload again</CardSubtitle>
          <CardText>
          	<ul style={{ color: "blue" }}>
            	{issues.map((issue, index) => {
            		return <li key={index}>{issue}</li>;
            	})}
          	</ul>
          </CardText>
        </CardBody>
      </Card>
      <br/>
      {/* File Uploader */}
      <input
        type="file"
        name="file"
        onChange={changeHandler}
        accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
          	<th>{rowNumberHeaderDisplay}</th>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
              	<td>{index + 2}</td>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Step1;
