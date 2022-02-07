import './App.css';
import React, { Component } from 'react';
import ApexRunner from './components/ApexRunner';
import Navigation from './components/Navigation';

class App extends Component {
  state = { 
    loggedIn: false,
    username: 'unknown',
    userId: ''
  };

  // Fetch passwords after first mount
  componentDidMount() {
    this.setInfo();
  }

  setInfo = () => {
    fetch('/api/info')
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          this.setState({ 
            loggedIn: result.data.loggedIn,
            username: result.data.userDisplayName 
          });
        }
      );
  }

  login() {
    fetch('/api/loginurl')
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          window.location.href = result.url;
        }
      );
  }

  logout = () => {
    fetch('api/logout')
    .then(() => {
      this.setInfo();
    })
  }

  render() {
    return (
      <div className="slds-grid slds-wrap grid_container">
        <div className="slds-col slds-size_1-of-1">
          <header>
            <div className="slds-global-header slds-grid slds-grid_align-spread">
              <div className="slds-global-header__item">
                <div className="slds-global-header__logo logo">
                  <span className="slds-assistive-text">Apex Sandbox</span>
                </div>
              </div>
              <div className="slds-global-header__item">
                {this.loginSection()}
              </div>
            </div>
          </header>
        </div>
        <div className="slds-col slds-size_1-of-6">
          <Navigation />
        </div>
        <div className="slds-col slds-size_2-of-6">
          The problem statement goes here
        </div>
        <div className="slds-col slds-size_3-of-6">
          <ApexRunner />
        </div>
      </div>
    );
  }

  loginSection() {
    if (this.state.loggedIn) {
      return (
        <ul className="slds-global-actions">
          <li className="slds-global-actions__item">You are logged in as: {this.state.username}</li>
          <li className="slds-global-actions__item"><button className="slds-button slds-button_neutral" onClick={this.logout}>Log out</button></li>
        </ul>);
    }
    else {
      return (
        <button className="slds-button slds-button_brand" onClick={this.login}>
          <svg class="slds-button__icon slds-button__icon_left" aria-hidden="true">
            <use href="/assets/icons/utility-sprite/svg/symbols.svg#salesforce1"></use>
          </svg>
          Log in with Salesforce
        </button>
      );
    }
  }
}

export default App;
