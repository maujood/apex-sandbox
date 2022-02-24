import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Problem from './components/Problem';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import LoginButton from './components/LoginButton';
import { UserProvider } from './components/UserContext';
import NavigationHardcoded from './components/NavigationHardcoded';

class App extends Component {
  state = { 
    loggedIn: false,
    username: '',
    userId: ''
  };

  contextData = {
    loggedIn: true,
    username: ''
  }

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
          this.contextData.loggedIn = result.data.loggedIn;
          this.contextData.username = result.data.userDisplayName;
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
      <UserProvider value={this.contextData}>
        <div className="slds-grid slds-wrap slds-grid_vertical-align-start grid_container">
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
            <NavigationHardcoded />
          </div>
          <div className="slds-col slds-size_5-of-6">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />}>
              </Route>
              <Route path="/problem/:problemId" element={<Problem />}>
              </Route>
              <Route
                path="*"
                element={<p>There's nothing here!</p>}
              />
            </Routes>
          </BrowserRouter>
          </div>
        </div>
      </UserProvider>
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
        <LoginButton />
      );
    }
  }
}

export default App;
