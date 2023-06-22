import React, { Component } from 'react';
import axios from 'axios';

import './messenger.css';

export default class UsersListItem extends Component {
  createDialog(id) {
    const {activateDialog} = this.props;
    axios.post(`/api/dialogs?userId=${id}`)
      .then(response => {
        activateDialog(response.data.id);
        
      })
      .catch(error => {
        console.log("creation error", error);
      });
    }

  render() {
    const { id, username, email } = this.props;
    return (
      <div
        className="contacts__item"
        onClick={() => this.createDialog(id)}>
        <div className="contacts__item-left">
          <div className="contacts__item-text">
            <p>{username}</p>
            <span>{email}</span>
          </div>
        </div>
      </div>
    );
  }
};
