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

        <LinkedinLoginButton
          clientId={process.env.REACT_APP_LINKEDIN_CLIENT_ID}
          redirectUrl={process.env.REACT_APP_LINKEDIN_REDIRECT_URL}
          onSuccess={console.log}
          onError={console.error}
        >
          { onclick => (
            <button
              style={{ backgroundColor: 'red', padding: '20px' }}
              onClick={onclick}
            >
              With function children
            </button>
          )}
        </LinkedinLoginButton>
      </div>
    )
  }
}
