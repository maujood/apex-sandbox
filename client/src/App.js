import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  state = { data: '' };

  // Fetch passwords after first mount
  componentDidMount() {
    this.callApi();
  }

  callApi = () => {
    // Get the passwords and store them in state
    fetch('/api/info')
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          this.setState({ data: result.data });
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data}
          </p>
          <button
            className="App-link"
            onClick={this.login}
          >
            Log in with Salesforce
          </button>
        </header>
      </div>
    );
  }
}

export default App;
