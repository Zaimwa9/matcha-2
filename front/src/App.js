import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/actions';
import PropTypes from 'prop-types';
import logo from './logo.svg';
import './App.css';


class App extends Component {

  componentWillMount() {
    // HERE WE ARE TRIGGERING THE ACTION
    this.props.actions.fetchUsers();
  }

  renderData() {
    return <div>{this.props.users.name}</div>;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="">
          {this.props.users.name ?
            this.renderData()
            :
            <div className="">
              No Data
            </div>
          }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object,
  // users: PropTypes.array
};

function mapStateToProps(state) {
  return {
    users: state.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
    // en bindant actions, on pourra directement passer aux props les actions creators sans avoir a les reimporter
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
