import React, { Component } from 'react';
import NewContactForm from './NewContactForm.jsx';
import AddImageButton from './AddImageButton';
import DeleteImageButton from './DeleteImageButton';

export default class ContactCard extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      editable: false,
      contactImgURL: null,
    };
  }

  getContactImageURL = () => {
    this.props.imgStorage.child(
                    `${this.props.user.uid}/${this.props.contactImgID}.jpg`)
                    .getDownloadURL()
                    .then((url) => {
                      this.setState({ contactImgURL: url });
                    })
                    .catch(() => {
                    });
  }
  toggleExpand = () => {
    if (!this.state.expanded) {
      if (!this.props.test) {
        this.getContactImageURL();
      }
    }
    this.setState({ expanded: !this.state.expanded });
  }
  toggleEdit = () => {
    if (!this.props.test) {
      this.getContactImageURL();
    }
    this.setState({ editable: !this.state.editable });
  }
  toggleFollowup = () => {
    this.props.toggleFollowup(this.props.contactTextID, !this.props.followup);
  }
  submitEdit = (newContact, newImage) => {
    this.props.submitEdit(this.props.contactTextID, newContact, newImage);
    this.toggleEdit();
  }
  deleteContact = () => {
    const warning = confirm('Do you really want to delete this contact?');
    if (warning) {
      this.props.deleteContact(this.props.contactTextID);
    }
  }
  render() {
    const { firstName, lastName, companyName, title, city, website, category, numbers, emails,
          socialMedia, notes, followup,
        } = this.props;
    let display;
    let expandButtonClass;
    if (this.state.expanded) {
      expandButtonClass = 'expand-button invert';
      display = (<div className="expanded">
        <div className="fullname firstName lastName" aria-label="fullname">
          <span className="label"></span>
          {firstName} {lastName}
        </div>
        <div>{website ?
          <div className = "companyName" aria-label="companyName">
            <span className = "label">Company: </span>
            <a href={website}>{companyName}</a>
          </div> :
            <div className="companyName" aria-label="companyName">
              <span className="label">Company: </span> {companyName}
            </div>}
        </div>
        <div className="title" aria-label="title">
          <span className="label">Title: </span>
          {title}
        </div>
        <div className="city" aria-label="city">
          <span className="label">City: </span>
          {city}
        </div>
        <div className="category" aria-label="category">
          <span className="label">Category: </span>
          {category}
        </div>
        <div className = "cell" aria-label="cell">
          <span className="label">Cell Number: </span>
          {numbers.cell}
        </div>
        <div className = "home" aria-label="home">
          <span className="label">Home Number: </span>
          {numbers.home}
        </div>
        <div className = "work" aria-label="work">
          <span className="label">Work Number: </span>
          {numbers.work}
        </div>
        <div className = "primary-email" aria-label="primary-email">
          <span className="label">Email 1: </span>
          {emails.primary}
        </div>
        <div className = "secondary-email" aria-label="secondary-email">
          <span className="label">Email 2: </span>
          {emails.secondary}
        </div>
        {socialMedia.facebook ? <a className="facebook soc-media-link" href={socialMedia.facebook}><span className="label">Facebook</span></a> : <div>No Facebook listed for this contact.</div>}
        {socialMedia.twitter ? <a className="twitter soc-media-link" href={socialMedia.twitter}><span className="label">Twitter</span></a> : <div>No Twitter listed for this contact.</div>}
        {socialMedia.linkedIn? <a className="linkedIn soc-media-link" href={socialMedia.linkedIn}><span className="label">LinkedIn</span></a> : <div>No LinkedIn listed for this contact.</div>}
        {socialMedia.github ? <a className="github soc-media-link" href={socialMedia.github}><span className="label">Github</span></a> : <div>No Github listed for this contact.</div>}
       <div className="notes" aria-label="notes">
          <span className="label">Notes: </span>
          {notes}
        </div>
        <div className="image-container" aria-label="image">
          {this.state.contactImgURL ?
            <img
              alt="contact URL"
              className="image"
              src={this.state.contactImgURL}
            /> :
              <AddImageButton handleClick={() => { this.addImage(); }} />
          }
        </div>
      </div>);
    } else {
      expandButtonClass = 'expand-button';
      display = (
        <div
          className="fullname firstName lastName contracted"
        >
          {firstName} {lastName} <br></br>
        <span className="company-display-unexpanded">{companyName}</span>
        </div>
      );
    }

    if (this.state.editable) {
      display =
        (<div>
          <NewContactForm
            handleNewContact={this.submitEdit}
            {...this.props}
            image={this.state.contactImgURL}
          />
          <button
            className="delete-contact"
            onClick={this.deleteContact}
          >
          Delete Contact
          </button>
        </div>
      );
    }

    return (
      <div className = "contact-card-for-each-contact">
        <div className="contact-card-top-buttons-container">
          {followup ?
            <img
              src="../images/checked-checkbox.svg"
              alt="An empty checkbox"
              className="flagged-for-followup-button"
              onClick={() => this.toggleFollowup()}
            />
            :
              <img
                src="../images/empty-checkbox.svg"
                alt="A checked checkbox."
                className="not-flagged-for-followup-button"
                onClick={() => this.toggleFollowup()}
              />
            }
          <img
            src="../images/pencil.svg"
            alt="Icon to show that user can edit the contact card."
            className="edit-button"
            onClick={() => this.toggleEdit()}
          />
          <img
            src="../images/thin-down.svg"
            alt="Icon to show that user can expand the contact card."
            // className="expand-button"
            className={expandButtonClass}
            onClick={() => this.toggleExpand()}
          />
        </div>
        {display}
        <div
          className="delete-image"
        >
          {this.props.image ?
            <DeleteImageButton
              handleClick={() => this.deleteImage()}
            /> : '' }
        </div>
      </div>
    );
  }
}
