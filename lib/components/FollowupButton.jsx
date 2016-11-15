import React, { Component } from 'react';

export default class FollowupButton extends Component {
	constructor() {
		super();

	}

	render() {
		return(
  <button className="followup-button" onClick={this.props.handleClick}>Flag for Followup</button>
    );
	}
}
