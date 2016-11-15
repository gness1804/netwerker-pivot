require('./styles/reset')
require('./styles/main')
const React = require('react');
import { render } from 'react-dom';
const ReactDOM = require('react-dom');


import Application from './components/Application';
import firebase from './firebase';


render(<Application />, document.querySelector('.application'));
