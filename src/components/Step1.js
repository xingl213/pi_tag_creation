import React, { useState } from 'react';
import { Button, Table, Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
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

  var issueMsg = "";
  for (var i = 0; i < values.length; i++) {
    // check if any tag name contains space character
    if (values[i][0].includes(' ')) {
      issueMsg = issueMsg + "Tag name on row " + (i+2).toString() + " contains illegal character: space.\n";
    }
    // check if any tag name is empty
    if (values[i][0] === '') {
      issueMsg = issueMsg + "Tag name on row " + (i+2).toString() + " is empty string.\n";
    }
    // check if any instrument tag is empty
    if (values[i][4] === '') {
      issueMsg = issueMsg + "Instrument tag on row " + (i+2).toString() + " is empty string.\n";
    }
  }

  return (
    <div className="container">
    	<h1>Upload an excel file</h1>
      Download PI tag creation template <a href={csv_template} download>Here</a>

      <Table
      >
        <thead>
          <tr>
            <th>
              PI Tag Name
            </th>
            <th>
              descriptor
            </th>
            <th>
              digitalset
            </th>
            <th>
              engunits
            </th>
            <th>
              instrumenttag
            </th>
            <th>
              pointtype
            </th>
            <th>
              span
            </th>
            <th>
              zero
            </th>
            <th>
              step
            </th>
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

      <Card>
        <CardBody>
          <CardTitle tag="h5" style={{ color: "red" }}>Issues</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">Fix the following issues and upload again</CardSubtitle>
          <CardText>
            <span style={{ color: "red" }}>{issueMsg}</span>
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
      <br />
      <br />
      {/* Table */}
      <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
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
