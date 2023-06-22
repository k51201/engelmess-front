import React, { Component } from 'react';
import axios from 'axios';

import './messenger.css';
import DialogsListItem from './dialogs-list-item';

export default class DialogsList extends Component {
  state = {
    term: '',
    dialogs: [],
  }

  getDialogs(term) {
    axios.get(`/api/dialogs?search=${term}`)
      .then(response => {
        this.setState({ dialogs: response.data, term });
      })
      .catch(error => {
        console.log("search error", error);
      });
  }

  componentDidUpdate() {
    const { term } = this.props;
    if (term !== this.state.term) {
      this.getDialogs(term)
    }
  }

  componentDidMount() {
    this.getDialogs(this.props.term)
  }

  render() {
    const { activateDialog } = this.props;
    const elements = this.state.dialogs
      .map((dialog) => {
        return (
          <li key={dialog.id} >
            <DialogsListItem dialog={dialog} activateDialog={activateDialog} />
          </li>
        )
      })
    return (
      <div>
        <div className="start-dialog-message">
          {this.state.dialogs.length < 1 ? <h2>У вас еще нет начатых диалогов. Нажмите &#10010;, чтобы найти пользователя</h2> : null}
        </div>
        <ul>{elements}</ul>
      </div>
    );
  }
}