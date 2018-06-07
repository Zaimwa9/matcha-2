import * as types from './actionTypes.js';
import axios from 'axios';


/*
  * receiveUsers est un 'action creator' au sens ou un action creator se contente de creer une action.
  * Ici de type receive users avec data comme objet
*/
  export function receiveUsers(users) {
  console.log(users);
  return {
    type: types.RECEIVE_USERS,
    users: users
  };
}

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
          query user {
            user(id: 5) {
              first_name,
              last_name
              }
            }
          `
      }
    }).then((result) => {
      console.log(result.data)
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