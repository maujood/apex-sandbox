import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

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
            userId: result.data.userId 
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            {this.loginSection()}
        </header>
      </div>
    );
  }

  loginSection() {
    if (this.state.loggedIn) {
      return (
        <div>
          <p>You are logged in as: {this.state.userId}.</p>
          <button onClick={this.logout}>Log out</button>
        </div>);
    }
    else {
      return (
        <button className="App-link" onClick={this.login}>
          Log in with Salesforce
        </button>
      );
    }
  }
}

export default App;
