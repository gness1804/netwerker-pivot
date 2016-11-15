import React from 'react';
import { shallow, mount } from 'enzyme';
import { assert } from 'chai';
import Application from '../lib/components/Application';
import NewContactForm from '../lib/components/NewContactForm';
import ContactCard from '../lib/components/ContactCard';
import ContactCardList from '../lib/components/ContactCardList';
import contactList from './helpers/fake-contacts.js';

require('locus');

describe('application', () => {
  it('should render as a div', () => {
    const wrapper = shallow(<Application />);
    assert.strictEqual(wrapper.type(), 'div');
  });
});

describe('NewContactForm', () => {
  it('should change state when user enters info in a field', () => {
    const wrapper = mount(<NewContactForm numbers={{}} emails={{}} socialMedia={{}} fileReaderTest={'test'} />);
    const firstNameInput = wrapper.find('.firstName-Input');
    assert.strictEqual(wrapper.state('firstName'), '');
    firstNameInput.simulate('change', { target: { value: 'Hello World' } });
    assert.strictEqual(wrapper.state('firstName'), 'Hello World');
  });

  it('should change state on entry of a more complex data item like cell phone number', () => {
    const wrapper = mount(<NewContactForm numbers={{}} emails={{}} socialMedia={{}} fileReaderTest={'test'} />);
    const cellNumberInput = wrapper.find('.cellNumber-Input');

    assert.strictEqual(wrapper.state().numbers.cell, '');
    cellNumberInput.simulate('change', { target: { value: '99999999' } });
    assert.strictEqual(wrapper.state().numbers.cell, '99999999');
  });

  it('should change state on entry of a more complex data item: email', () => {
    const wrapper = mount(<NewContactForm numbers={{}} emails={{}} socialMedia={{}} fileReaderTest={'test'} />);
    const primaryEmailInput = wrapper.find('.primaryEmail-Input');

    assert.strictEqual(wrapper.state().emails.primary, '');
    primaryEmailInput.simulate('change', { target: { value: 'MatthewKaufman@mlk.com' } });
    assert.strictEqual(wrapper.state().emails.primary, 'MatthewKaufman@mlk.com');
  });
  it('should change state on entry of a more complex data item: socialMedia', () => {
    const wrapper = mount(<NewContactForm numbers={{}} emails={{}} socialMedia={{}} fileReaderTest={'test'} />);
    const facebookInput = wrapper.find('.facebook-Input');

    assert.strictEqual(wrapper.state().socialMedia.facebook, '');
    facebookInput.simulate('change', { target: { value: 'MatthewLeoKaufman' } });
    assert.strictEqual(wrapper.state().socialMedia.facebook, 'MatthewLeoKaufman');
  });
  it('should change state on entry of a more complex data item: Notes', () => {
    const wrapper = mount(<NewContactForm numbers={{}} emails={{}} socialMedia={{}} fileReaderTest={'test'} />);
    const cellNumberInput = wrapper.find('.notes-input');

    assert.strictEqual(wrapper.state().notes, '');
    cellNumberInput.simulate('change', { target: { value: 'This is a cool note' } });
    assert.strictEqual(wrapper.state().notes, 'This is a cool note');
  });
  it('should change state on entry of a more complex data item: image', () => {
    const fileReaderTest = {
      readAsDataURL() {
        return null;
      },
    };
    const wrapper = mount(
      <NewContactForm
        numbers={{}}
        emails={{}}
        socialMedia={{}}
        fileReaderTest={fileReaderTest}
      />);
    const imageInput = wrapper.find('.add-image-button');

    assert.strictEqual(wrapper.state().image, '');
    imageInput.simulate('change', { target: { files: ['This is a sweet image'] } });
    assert.strictEqual(wrapper.state().image, 'This is a sweet image');
  });
});

describe('ContactCard', () => {
  const newContact = contactList[0];
  it('should display contact info when user enters it', () => {
    const wrapper = mount(<ContactCard {...newContact} test={1} />);
    const name = wrapper.find('.fullname').text();
    assert.strictEqual(name, 'John Cleese');
  });

  it('should display all contact info when user clicks expand', () => {
    const wrapper = mount(<ContactCard {...newContact} test = {1} />);
    wrapper.find('.expand-button').simulate('click');

    const name = wrapper.find('.fullname').text();
    assert.strictEqual(name, 'John Cleese');
    const cell = wrapper.find('.cell').text();
    assert.strictEqual(cell, 'Cell Number: 44');
    const primEmail = wrapper.find('.primary-email').text();
    assert.strictEqual(primEmail, 'Email 1: john@schoolofsillywalks.com');
    const github = wrapper.find('.github').text();
    assert.strictEqual(github, 'Github: jcleese');
  });

  it('should toggle off expand when user clicks expand button', () => {
    const wrapper = mount(<ContactCard {...newContact} test={1} />);
    wrapper.find('.expand-button').simulate('click');
    let cell = wrapper.find('.cell').text();
    assert.strictEqual(cell, 'Cell Number: 44');

    wrapper.find('.expand-button').simulate('click');
    cell = wrapper.find('.cell');
    assert.strictEqual(cell.length, 0);
  });
});

describe('ContactCardList', () => {
  it('should allow search of contact cards', () => {
    const wrapper = mount(<ContactCardList contacts={contactList} />);
    const search = wrapper.find('.search');
    search.simulate('change', { target: { value: 'Cleese' } });
    assert.strictEqual(wrapper.find('.contact-card-for-each-contact').length, 1);
    assert.strictEqual(wrapper.find('.fullname').text(), 'John Cleese');
  });
  it('should change the state when user enters input into the search field', () => {
    const wrapper = mount(<ContactCardList contacts={['Hello', 'world']} />);
    const search = wrapper.find('.search');
    search.simulate('change', { target: { value: 'hello' } });
    assert.strictEqual(wrapper.state('searchString'), 'hello');
  });
  it('should allow user search to filter items on the page', () => {
    const wrapper = mount(<ContactCardList contacts={['Hello', 'world']} />);
    const search = wrapper.find('.search');
    search.simulate('change', { target: { value: 'z' } });
    assert.strictEqual(wrapper.find('.contact-card-for-each-contact').length, 0);
  });
  it('should sort contacts alphabetically by default', () => {
    const wrapper = mount(<ContactCardList contacts={[{ firstName: 'Jerry', lastName: 'Seinfeld' }, { firstName: 'Bill', lastName: 'Clinton' }]} />);
    assert.strictEqual(wrapper.props().contacts.length, 2);
    assert.strictEqual(wrapper.find('.contact-card-container').text(), 'Show:Bill ClintonJerry Seinfeld');
  });
  it('should show only flagged contacts when user toggles flag on', () => {
    const wrapper = mount(<ContactCardList contacts={contactList} />);
    assert.strictEqual(wrapper.find('.contact-card-for-each-contact').length, 2);
    wrapper.find('.show-followup-list-button').simulate('click');
    assert.strictEqual(wrapper.find('.contact-card-for-each-contact').length, 1);
  });
});
