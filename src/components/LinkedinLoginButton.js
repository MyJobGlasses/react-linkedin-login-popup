import React from 'react'
import PropTypes from 'prop-types'
import querystring from 'querystring'

/**
 * Documentation for linkedin authorization flow
 * @url https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/consumer/context
 */
class LinkedinLoginButton extends React.PureComponent {
  constructor(props) {
    super(props)
    this._openPopup = this._openPopup.bind(this)
    this.popup = null
    this.timer = null
    this.stateKey = Math.random().toString(36).substring(7)
  }

  _startWatchingCode() {
    const {
      onSuccess,
      onError,
    } = this.props
    this.timer = setInterval(() => {
      try {
        if (!this.popup) {
          clearInterval(this.timer)
        }
        if (this.popup.closed) {
          onError('popup closed')
          clearInterval(this.timer)
          return
        }
        if (this.popup.location && this.popup.location.search) {
          const search = this.popup.location.search
          console.log(search)

          if (search.indexOf('code') !== -1) {
            clearInterval(this.timer)
            const paramsString = search.split('?')[1]
            const params = paramsString ? querystring.parse(paramsString) : {}
            this.popup.close()
            if (params.state === this.stateKey) {
              onSuccess(params.code)
            }
          }
        }
      } catch (e) {
        // eslint-disable-next-line no-undef
        if (e instanceof DOMException) {
          // If there's a CORS warning => we cannot access the DOM
          // We assume here the user is still on the linkedin page to authorize.
          // Browsers will fire CORS error that are safe to ignore.
          return
        }
        if (e && e.number && (e.number === -2146828218 || e.number === -2147467259)) {
          // Because IE and Edge do nothing like everbody else
          // => there's an error while waiting for the user is on linkedin (-2146828218)
          // => AND when the popup closes another error is fired (-2147467259)
          return
        }
        if (typeof onError === 'function') {
          onError('unknow error', e)
        }
      }
    }, 200)
  }

  _openPopup() {
    const {
      clientId,
      redirectUrl,
    } = this.props
    this.popup = window.open(
      `https://www.linkedin.com/oauth/v2/authorization?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&state=${this.stateKey}`,
      'Login with linkedin',
      'height=600,width=500'
    )
    this._startWatchingCode()
  }

  render() {
    return (
      <button
        onClick={this._openPopup}
      >
        Signin with Linkedin
      </button>
    )
  }
}

LinkedinLoginButton.propTypes = {
  clientId: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func,
}

export default LinkedinLoginButton
