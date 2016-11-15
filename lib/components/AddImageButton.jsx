import React, { Component } from 'react';

export default class AddImageButton extends Component {
	render() {
		return (
  <input
    className="add-image-button"
    type="file"
    onChange={this.props.handleChange}
    accept="image/*"
  />
    );
	}
}
