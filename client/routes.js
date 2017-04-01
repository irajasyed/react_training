import React from 'react';
import {Route, IndexRoute } from 'react-router';

import App from './components/App';
import Greetings from './components/Greetings'
import SignupPage from './components/signup/SignupPage'

export default (
  <div>
  <Route path="/" component={App} />
  <Route exact path="/" component={Greetings} />
  <Route exact path ="/signup" component={SignupPage}/>
  </div>
)
