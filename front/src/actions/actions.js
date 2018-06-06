import * as types from './actionTypes.js';
import axios from 'axios';


// receiveUsers est un 'action creator' au sens ou un action creator se contente de creer une action (ici de type receive users avec data comme objet)
export function receiveUsers(users) {
  console.log(users);
  return {
    type: types.RECEIVE_USERS,
    users: users
  };
}

export function fetchUsers() {
  // Une action de call a l'api sera plus verbeuse. A son issue elle fait appelle a l'action qui recoit la donnee et qui mettra a jour le state
  return dispatch => {
    return axios.get('http://localhost:3000/test', {
      mode: 'cors',
      // credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(response => response.data)
    .then(json => dispatch(receiveUsers(json))); // receiveUsers cree l'action, dispatch prend une action et la dispatch vers le store
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