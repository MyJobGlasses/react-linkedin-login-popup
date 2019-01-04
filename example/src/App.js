import React, { Component } from 'react'

import LinkedinLoginButton from 'react-linked-login-popup'

export default class App extends Component {
  render () {
    return (
      <div>
        <LinkedinLoginButton
          clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
          redirectUrl={process.env.REACT_APP_LINKEDIN_REDIRECT_URL}
          onSuccess={console.log}
          onError={console.error}
        />
      </div>
    )
  }
}
