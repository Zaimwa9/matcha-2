import * as types from './actionTypes.js';
import axios from 'axios';

export function receiveUsers(json) {
  console.log(json);
  return {type: types.RECEIVE_USERS, users: json};
}

export function fetchUsers() {
  return dispatch => {
    return fetch('http://localhost:3000/test', {
      method: 'GET',
      mode: 'cors',
      // credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUsers(json)));
  };
}

// export function fetchUsers() {
//   return dispatch => {
//     return fetch('http://localhost:3000/test', {
//       method: 'GET',
//       mode: 'cors',
//       // credentials: 'include',
//       headers: {
//         'Accept': 'application/json',
//       }
//     })
//     .then(response => dispatch(receiveUsers({stuff: response.data})))//console.log(response))//response.json())
//     // .then(json => dispatch(receiveUsers(json)));
//   };
// }