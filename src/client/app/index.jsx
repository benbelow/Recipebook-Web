import React from 'react';
import {render} from 'react-dom';

var SignInPanel = React.createClass({
  render: function() {
    return (
      <div>
        <SignInButton/>
        <SignOutButton/>
      </div>
    )
  }
});

var SignInButton = React.createClass({
  onSignIn: function(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  },

  renderGoogleLoginButton: function() {
    console.log('rendering google signin button')
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': this.onSignIn
    })
  },

  componentDidMount: function() {
    window.addEventListener('google-loaded',this.renderGoogleLoginButton);
  },

  render: function() {
    let displayText = "Sign in with Google";
    return (
      <div>
        <h2> HELLO</h2>
        <div id="my-signin2"></div>
      </div>
    );
  }
});

var SignOutButton = React.createClass({
  render: function() {
    return (
      <a href='#' onClick={signOut}>Sign out</a>
    )
  }
});

function signOut(){
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

render(
  <SignInPanel />,
  document.getElementById('app')
);
