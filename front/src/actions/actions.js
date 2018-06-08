import * as types from './actionTypes.js';
import axios from 'axios';
import { SIGNUP_REQUEST, SIGNUP_FAILURE, SIGNUP_SUCCESS } from './actionTypes.js';

/*
  * receiveUsers est un 'action creator' au sens ou un action creator se contente de creer une action.
  * Ici de type receive users avec data comme objet
*/

export function receiveUsers(users) {
  return {
    type: types.RECEIVE_USERS,
    users: users
  };
}

export function signupRequest() {
  return {
    type: types.SIGNUP_REQUEST
  }
}

export function signupFailure(error) {
  return {
    error: {
      status: true,
      message: error.message
    },
    type: types.SIGNUP_FAILURE
  }
}

export function signupSuccess(data) {
  return {
    data: data,
    type: types.SIGNUP_SUCCESS
  }
}

export function signup(data) {
  return dispatch => {
    // dispatch Request et mode submitted
    // =>
    dispatch(signupRequest());
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      data: {
        query: `
          mutation signup {
            signup(email: "${data.email}", password: "${data.password}", first_name: "${data.first_name}", last_name: "${data.last_name}") {
              uuid,
              first_name,
              last_name,
              email,
              token
            }
          }
        `
      }
    })
    .then(result => {
      if (!result.data.errors) {
        dispatch(signupSuccess(result.data.data.signup));
        // localStorage.setItem('token', result.data.data.signup.token);
      } else {
        dispatch(signupFailure(result.data.errors[0]))
        // console.log(result.data.errors[0].message);
      }
    })

    // console.log(data);
    //axios.faistavie
    //
    // ==> En fonction de la reponse ==> dispatch Success soit erreur
  }
}
// export function postSignup(data) {
//   return dispatch => {
//     axios({
//       url: 'http://localhost:3000/graphql/',
//       method: 'post',
//       data: {
//         query: `
//           mutation signup {
//             signup(email: "${data.email}", password: "${data.password}", first_name: "${data.first_name}", last_name: "${data.last_name}") {
//               uuid,
//               first_name,
//               last_name,
//               email,
//               token
//             }
//           }
//         `
//       }
//     })
//     .then(result => {
//       if (!result.data.errors) {
//         console.log(result.data.data)
//         localStorage.setItem('token', result.data.data.signup.token);
//       } else {
//         console.log(result.data.errors[0].message);
//       }
//     })
//   }
// }

export function fetchUsers() {
  /*
    * Une action de call a l'api sera plus verbeuse.
    * A son issue elle fait appelle a l'action qui recoit la donnee et qui mettra a jour le state
  */
    return dispatch => {
    axios({
      url: 'http://localhost:3000/graphql/',
      method: 'post',
      data: {
        query: `
          query users {
            users {
              first_name,
              last_name,
              password
              }
            }
          `
      }
    }).then(result => {
      // console.log(result);
      dispatch(receiveUsers(result.data.data.users))
    });
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