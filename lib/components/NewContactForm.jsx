import React, { Component } from 'react';
import InputField from './InputField.jsx';

export default class NewContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactID: this.props.contactID || Date.now(),
      firstName: this.props.firstName || '',
      lastName: this.props.lastName || '',
      companyName: this.props.companyName || '',
      title: this.props.title || '',
      website: this.props.website || '',
      numbers: {
        cell: this.props.numbers.cell || '',
        work: this.props.numbers.work || '',
        home: this.props.numbers.home || '',
      },
      emails: {
        primary: this.props.emails.primary || '',
        secondary: this.props.emails.secondary || '',
      },
      socialMedia: {
        facebook: this.props.socialMedia.facebook || '',
        twitter: this.props.socialMedia.twitter || '',
        linkedIn: this.props.socialMedia.linkedIn || '',
        github: this.props.socialMedia.github || '',
        instagram: this.props.socialMedia.instagram || '',
      },
      notes: this.props.notes || '',
      image: this.props.image || '',
      followup: this.props.followup || false,
      reader: this.props.fileReaderTest || new FileReader(),
      groups: this.props.groups || [],
      imgSource: this.props.image || '',
    };
  }

  componentDidMount = () => {
    if (this.state.reader.constructor.name === 'FileReader') {
      this.state.reader.addEventListener('load', () => {
        this.setState({ imgSource: this.state.reader.result });
      }); }
  }

  addContactToGroup = () => {
    const existingGroupMemberships = this.state.groups;
    existingGroupMemberships.push('Test Group');
  }

  addImage = (e) => {
    const image = e.target.files[0];
    this.setState({ image },
        this.state.reader.readAsDataURL(image)
    );
  }

  toggleFollowup = () => {
    this.setState({ followup: !this.state.followup });
  }

  updateState = (e, keyName) => {
    this.setState({ [keyName]: e.target.value });
  }

  updateStateObject = (e, keyName, objName) => {
    const objState = this.state[objName];
    objState[keyName] = e.target.value;
    this.setState({ [objName]: objState });
  }

  submitNewContact = () => {
    const newContact = {
      contactID: this.state.contactID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      companyName: this.state.companyName,
      title: this.state.title,
      website: this.state.website,
      numbers: {
        cell: this.state.numbers.cell,
        work: this.state.numbers.work,
        home: this.state.numbers.home,
      },
      emails: {
        primary: this.state.emails.primary,
        secondary: this.state.emails.secondary,
      },
      socialMedia: {
        facebook: this.state.socialMedia.facebook,
        twitter: this.state.socialMedia.twitter,
        linkedIn: this.state.socialMedia.linkedIn,
        github: this.state.socialMedia.github,
        instagram: this.state.socialMedia.instagram,
      },
      notes: this.state.notes,
      followup: this.state.followup,
      groups: this.state.groups,
    };
    const image = this.state.image;
    this.props.handleNewContact(newContact, image);
  }

  render = () => {
    let imageSrc;

    if (this.state.imgSource) {
      imageSrc = this.state.imgSource;
    } else {
      imageSrc = '../images/user-ph.jpg';
    }

    return (
      <div className = "input-field-container">
        <div className="form-container">
          <InputField
            className = "firstName-Input input-field"
            value = {this.state.firstName}
            placeholder = "First Name"
            type = "text"
            handleChange = {this.updateState}
            name = "firstName"
            aria-label="firstName"
          />
          <InputField
            className = "lastName-Input input-field"
            value = {this.state.lastName}
            placeholder = "Last Name"
            type = "text"
            handleChange = {this.updateState}
            name = "lastName"
            aria-label="lastName"
          />
          <InputField
            className = "companyName-Input input-field"
            value = {this.state.companyName}
            placeholder = "Company Name"
            type = "text"
            handleChange = {this.updateState}
            name = "companyName"
            aria-label="companyName"
          />
          <InputField
            className = "title-Input input-field"
            value = {this.state.title}
            placeholder = "Title"
            type = "text"
            handleChange = {this.updateState}
            name = "title"
            aria-label = "title"
          />
          <InputField
            className = "website-Input input-field"
            value = {this.state.website}
            placeholder = "Company Website"
            type = "text"
            handleChange = {this.updateState}
            name = "website"
            aria-label="website"
          />
          <InputField
            className = "cellNumber-Input input-field"
            value = {this.state.numbers.cell}
            placeholder = "Primary Cell Number"
            type = "text"
            handleChange = {this.updateStateObject}
            objName = "numbers"
            name = "cell"
            aria-label="cell"
          />
          <InputField
            className = "workNumber-Input input-field"
            value = {this.state.numbers.work}
            placeholder = "Work Number"
            type = "text"
            handleChange = {this.updateStateObject}
            objName = "numbers"
            name = "work"
            aria-label="work"
          />
          <InputField
            className = "homeNumber-Input input-field"
            value = {this.state.numbers.home}
            placeholder = "Home Number"
            type = "text"
            handleChange = {this.updateStateObject}
            objName = "numbers"
            name = "home"
            aria-label="home"
          />
          <InputField
            className = "primaryEmail-Input input-field"
            value = {this.state.emails.primary}
            placeholder = "Primary Email"
            type = "text"
            handleChange = {this.updateStateObject}
            objName = "emails"
            name = "primary"
            aria-label="primary-email"
          />
          <InputField
            className = "secondaryEmail-Input input-field"
            value = {this.state.emails.secondary}
            placeholder = "Secondary Email"
            type = "text"
            handleChange = {this.updateStateObject}
            objName = "emails"
            name = "secondary"
            aria-label="secondary-email"
          />
          <InputField
            className = "facebook-Input input-field"
            value = {this.state.socialMedia.facebook}
            placeholder = "Facebook"
            type = "text"
            handleChange={this.updateStateObject}
            objName = "socialMedia"
            name = "facebook"
            aria-label="facebook"
          />
          <InputField
            className="twitter-Input input-field"
            value = {this.state.socialMedia.twitter}
            placeholder = "Twitter"
            type = "text"
            handleChange={this.updateStateObject}
            objName = "socialMedia"
            name = "twitter"
            aria-label="twitter"
          />
          <InputField
            className = "linkedIn-Input input-field"
            value = {this.state.socialMedia.linkedIn}
            placeholder = "LinkedIn"
            type = "text"
            handleChange={this.updateStateObject}
            objName = "socialMedia"
            name = "linkedIn"
            aria-label="linkedIn"
          />
          <InputField
            className = "github-Input input-field"
            value = {this.state.socialMedia.github}
            placeholder = "Github"
            type = "text"
            handleChange={this.updateStateObject}
            objName = "socialMedia"
            name = "github"
            aria-label="github"
          />
          <InputField
            className = "instagram-Input input-field"
            value = {this.state.socialMedia.instagram}
            placeholder = "Instagram"
            type = "text"
            handleChange={this.updateStateObject}
            objName = "socialMedia"
            name = "instagram"
            aria-label="instagram"
          />
          <textarea
            className = "notes-input input-field"
            value = {this.state.notes}
            placeholder="Notes..."
            onChange={e => this.updateState(e, 'notes')}
            type="text"
            name="notes"
            aria-label="notes"
          >
            Notes...
          </textarea>
        </div>

        <label className = "add-image-wrapper">
          <img src={imageSrc} alt="The user." />
          <input
            className="add-image-button"
            type="file"
            onChange={(e) => { this.addImage(e); }}
            accept="image/*"
            aria-label="image"
          />
          <p className = "add-image-label">Click To Upload Image</p>
        </label>

        <button
          className = "submit-new-contact-button"
          onClick={() => this.submitNewContact()}
        > Submit New Contact
        </button>
      </div>
    );
  }

}
