import React, { Component } from 'react';

export default class DeleteImageButton extends Component {
	constructor() {
		super();
		this.state = {

		};
	}

	render() {
		return(
  <button onClick={this.props.handleClick}>Delete Image</button>
    );
	}
}
