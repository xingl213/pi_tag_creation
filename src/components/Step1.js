import React, { Component } from 'react';
import { Button } from 'reactstrap';
import FileUpload from './FileUpload';

class Step1 extends Component {

	constructor(props) {
		super(props);

		const piTagInfoParent = props.piTagInfo;

		this.state = {
			piTagInfo: {
				piTagName: piTagInfoParent.piTagName,
				description: piTagInfoParent.description, 
				instrTag: piTagInfoParent.instrTag,
				dataType: piTagInfoParent.dataType,
				maxVal: piTagInfoParent.maxVal,
				minVal: piTagInfoParent.minVal,
				freq: piTagInfoParent.freq
			}
		};

		this.validate = this.validate.bind(this);
	}

	// send modified state data to MainCompoenent
	sendData(props) {
		props.parentCallback(this.state.piTagInfo);
	}

	// these update functions are used to update main component and step 1 component's states, called when input changes onChange
	updatePiTagName(evt) {
		const val = evt.target.value;
		this.setState({
			piTagInfo: {
				piTagName: val,
				description: this.state.piTagInfo.description, 
				instrTag: this.state.piTagInfo.instrTag,
				dataType: this.state.piTagInfo.dataType,
				maxVal: this.state.piTagInfo.maxVal,
				minVal: this.state.piTagInfo.minVal,
				freq: this.state.piTagInfo.freq
			}			
		});
		// pass state change to MainComponent
		this.sendData();
	}

	updateDescription(evt) {
		const val = evt.target.value;
		this.setState({
			piTagInfo: {
				piTagName: this.state.piTagInfo.piTagName,
				description: val, 
				instrTag: this.state.piTagInfo.instrTag,
				dataType: this.state.piTagInfo.dataType,
				maxVal: this.state.piTagInfo.maxVal,
				minVal: this.state.piTagInfo.minVal,
				freq: this.state.piTagInfo.freq
			}			
		});
		// pass state change to MainComponent
		this.sendData();
	}

	updateInstrTag(evt) {
		const val = evt.target.value;
		this.setState({
			piTagInfo: {
				piTagName: this.state.piTagInfo.piTagName,
				description: this.state.piTagInfo.description, 
				instrTag: val,
				dataType: this.state.piTagInfo.dataType,
				maxVal: this.state.piTagInfo.maxVal,
				minVal: this.state.piTagInfo.minVal,
				freq: this.state.piTagInfo.freq
			}			
		});
		// pass state change to MainComponent
		this.sendData();
	}

	updateDataType(evt) {
		const val = evt.target.value;
		this.setState({
			piTagInfo: {
				piTagName: this.state.piTagInfo.piTagName,
				description: this.state.piTagInfo.description, 
				instrTag: this.state.piTagInfo.instrTag,
				dataType: val,
				maxVal: this.state.piTagInfo.maxVal,
				minVal: this.state.piTagInfo.minVal,
				freq: this.state.piTagInfo.freq
			}			
		});
		// pass state change to MainComponent
		this.sendData();
	}

	updateMaxVal(evt) {
		const val = evt.target.value;
		this.setState({
			piTagInfo: {
				piTagName: this.state.piTagInfo.piTagName,
				description: this.state.piTagInfo.description, 
				instrTag: this.state.piTagInfo.instrTag,
				dataType: this.state.piTagInfo.dataType,
				maxVal: val,
				minVal: this.state.piTagInfo.minVal,
				freq: this.state.piTagInfo.freq
			}			
		});
		// pass state change to MainComponent
		this.sendData();
	}

	updateMinVal(evt) {
		const val = evt.target.value;
		this.setState({
			piTagInfo: {
				piTagName: this.state.piTagInfo.piTagName,
				description: this.state.piTagInfo.description, 
				instrTag: this.state.piTagInfo.instrTag,
				dataType: this.state.piTagInfo.dataType,
				maxVal: this.state.piTagInfo.maxVal,
				minVal: val,
				freq: this.state.piTagInfo.freq
			}			
		});
		// pass state change to MainComponent
		this.sendData();
	}

	updateFreq(evt) {
		const val = evt.target.value;
		this.setState({
			piTagInfo: {
				piTagName: this.state.piTagInfo.piTagName,
				description: this.state.piTagInfo.description, 
				instrTag: this.state.piTagInfo.instrTag,
				dataType: this.state.piTagInfo.dataType,
				maxVal: this.state.piTagInfo.maxVal,
				minVal: this.state.piTagInfo.minVal,
				freq: val
			}			
		});
		// pass state change to MainComponent
		this.sendData();
	}

	validate() {
		// TODO: empty string validation
		// TODO: business rules validation
	}

	render() {
		// debugging purpose for now
		const field  = this.state.piTagInfo.piTagName + ' ' + this.state.piTagInfo.description + ' ' + this.state.piTagInfo.instrTag + ' ' + this.state.piTagInfo.dataType + ' ' + this.state.piTagInfo.maxVal + ' ' + this.state.piTagInfo.minVal + ' ' + this.state.piTagInfo.freq;

		return(
			<div className="container mt-2">
				<h1>Create a single PI tag</h1>
				<div className="m-2">
					<span>PI Tag Name: </span>
					<input value={this.state.piTagInfo.piTagName} onChange={evt => this.updatePiTagName(evt)}/>
				</div>
				<div className="m-2">
					<span>Description: </span>
					<input value={this.state.piTagInfo.description} onChange={evt => this.updateDescription(evt)}/>
				</div>
				<div className="m-2">
					<span>Instrument Tag: </span>
					<input value={this.state.piTagInfo.instrTag} onChange={evt => this.updateInstrTag(evt)}/>
				</div>
				<div className="m-2">
					<span>Data Type: </span>
					<input value={this.state.piTagInfo.dataType} onChange={evt => this.updateDataType(evt)}/>
				</div>
				<div className="m-2">
					<span>Max Value: </span>
					<input value={this.state.piTagInfo.maxVal} onChange={evt => this.updateMaxVal(evt)}/>
				</div>
				<div className="m-2">
					<span>Min Value: </span>
					<input value={this.state.piTagInfo.minVal} onChange={evt => this.updateMinVal(evt)}/>
				</div>
				<div className="m-2">
					<span>Frequency: </span>
					<input value={this.state.piTagInfo.freq} onChange={evt => this.updateFreq(evt)}/>
				</div>
				<div>
					<Button onClick={this.validate}>Validate</Button>
				</div>

				<div>
					{field}
				</div>

				<hr/>
				
				<h1>Or, upload an Excel File</h1>
				<div>
					<FileUpload />
				</div>
			</div>
		);
	}
}

export default Step1;
