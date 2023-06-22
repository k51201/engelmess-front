import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import ContactsPanel from './contacts-panel';
import MessagePanel from './message-panel'
import './messenger.css';

export default class Messenger extends Component {
  state = {
    activeDialogId: null
  }

  activateDialog = (id) => {
    this.setState({ activeDialogId: id })
  }

  render() {
    const { user } = this.props;

    return (
      <section className="section">
        {user ? null : <Redirect to="/authpage" />}
        <ContactsPanel activateDialog={this.activateDialog} />
        <MessagePanel activeDialogId={this.state.activeDialogId} />
      </section>
    );
  };
}