import React, { Component } from 'react';
import axios from 'axios';

import './messenger.css';
import UsersListItem from './users-list-item';

export default class UsersList extends Component {
  state = {
    users: [],
    term: ''
  }

  componentDidUpdate() {
    const { term } = this.props;
    if (!term && this.state.term) {
      this.setState({ users: [], term });
    } else if (term !== this.state.term) {
      axios.get(`/api/users?search=${term}`)
        .then(response => {
          this.setState({ users: response.data, term });
        })
        .catch(error => {
          console.log("search error", error);
        });
    }
  }

  render() {
    const {activateDialog} = this.props;
    const elements = this.state.users
      .map(( user ) => {
        return (
          <li key={user.id} >
            <UsersListItem {...user} activateDialog={activateDialog}/>
          </li>
        )
      });

    return <ul>{elements}</ul>;
  }
}