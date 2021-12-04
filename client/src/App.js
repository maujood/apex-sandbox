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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.data}
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
