import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import client from '../ApolloClient';
import gql from "graphql-tag";

class newHashtag extends Component {
  componentWillMount() {
    const sub = gql `
        subscription {
          newHash {
          id,
          content
        }
      }
    `;
    client
    .subscribe({
      query: sub
    }).subscribe({
      next(data) {
        console.log(data)
      }
    })

/*
    client
    .query({
      query: gql`
       {
        user(uuid: "5") {
           uuid,
           email
        }
       }
      `
    })
    .then(result => console.log(result)); */
  }

  subscribe() {

  }

  render() {
    return (
      <div>
        <div className="channelName">
          Yolito
        </div>
        Next hashs
      </div>
    )
  }
}
export default newHashtag
