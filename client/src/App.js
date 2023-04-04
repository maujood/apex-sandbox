import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Problem from './components/Problem';
import ProblemUpsert from './components/ProblemUpsert';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import Team from './components/Team';
import LoginButton from './components/LoginButton';
import { UserProvider } from './components/UserContext';

class App extends Component {
  state = { 
    loggedIn: false,
    username: '',
    userId: '',
    points: 0,
    rank: 0
  };

  contextData = {
    loggedIn: false,
    username: '',
    instanceUrl: '',
    points: 0,
    rank: 0
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
          this.contextData.instanceUrl = result.data.instanceUrl;
          this.setState({ 
            loggedIn: result.data.loggedIn,
            username: result.data.userDisplayName,
            points: result.data.points,
            rank: result.data.rank
          });
        }
      );
  }

  updatePoints = (points, rank) => {
    this.setState({
      points: points,
      rank: rank
    });
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
    fetch('/api/logout')
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
          <div className="slds-col slds-large-size_1-of-6 slds-medium-size_1-of-1 slds-small-size_1-of-1">
            <Navigation />
          </div>
          <div className="slds-col slds-large-size_5-of-6 slds-medium-size_1-of-1 slds-small-size_1-of-1">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />}>
              </Route>
              <Route path="/the-team" element={<Team />}>
              </Route>
              <Route path="/problem/create" element={<ProblemUpsert onlogout={this.setInfo} />}>
              </Route>
              <Route path="/problem/edit/:urlProblemId" element={<ProblemUpsert onlogout={this.setInfo} />}>
              </Route>
              <Route path="/problem/:problemId" element={<Problem onlogout={this.setInfo} onpointschanged={this.updatePoints} />}>
              </Route>
              <Route
                path="*"
                element={<p>There's nothing here!</p>}
              />
            </Routes>
          </BrowserRouter>
          </div>
          <div class="slds-col slds-size_1-of-1 slds-align_absolute-center App-footer">
            <a href="/privacypolicy.html" target="_blank">Privacy Policy</a>
          </div>
        </div>
      </UserProvider>
    );
  }

  loginSection() {
    if (this.state.loggedIn) {
      return (
        <ul className="slds-global-actions">
          <li className="slds-global-actions__item">You are logged in as: <a target="_blank" rel="noreferrer" href={this.contextData.instanceUrl}>{this.state.username}</a></li>
          <li className="slds-global-actions__item">
            <span class="slds-badge">
              <span class="slds-badge__icon slds-badge__icon_left">
                <span class="slds-icon_container slds-icon-utility-moneybag slds-current-color">
                  <svg class="slds-icon slds-icon_xx-small" aria-hidden="true">
                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#moneybag"></use>
                  </svg>
                </span>
              </span>
              {this.state.points.toLocaleString()} points
            </span>
            <span class="slds-badge">
              <span class="slds-badge__icon slds-badge__icon_left">
                <span class="slds-icon_container slds-icon-utility-trending slds-current-color">
                  <svg class="slds-icon slds-icon_xx-small" aria-hidden="true">
                    <use href="/assets/icons/utility-sprite/svg/symbols.svg#trending"></use>
                  </svg>
                </span>
              </span>
              Top {this.state.rank}%
            </span>
          </li>
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
