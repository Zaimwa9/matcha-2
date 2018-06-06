import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions/actions';
import PropTypes from 'prop-types';
import React from 'react';


class usersList extends React.Component {

  componentWillMount() { // HERE WE ARE TRIGGERING THE ACTION
    this.props.actions.fetchUsers();
  }

  renderData() {
    return <div>{this.props.users.name}</div>;
  }
  

  render() {
    console.log(this.props.users);
    return (
      <div className="">
          {this.props.users.name ?
            this.renderData()
            :
            <div className="">
              No Data
            </div>
          }
      </div>
    );
  }
}

usersList.propTypes = {
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(usersList);