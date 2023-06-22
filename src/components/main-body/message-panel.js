import React, { Component } from 'react';
import axios from 'axios';

import MessageHeader from './message-header';
import MessageFooter from './message-footer';
import './messenger.css';

const MessageItemRecieve = ({ label }) => {
  return (
    <li className="message__container-item left ">
      <div className="message__item">
      </div>
      <div className="message__item-text">
        <p>{label}</p>
      </div>
      <div className="message__item-time">11:45</div>
    </li>
  );
};

// const MessageItemSend = ({ label }) => {
//     return (
//         <li class="message__container-item left">
//             <div className="message__item">
//                 Боря:
//             </div>
//             <div className="message__item-text">
//                 <p>{label}</p>
//             </div>
//             <div className="message__item-time">11:45</div>
//         </li>
//     );
// };

export default class MessagePanel extends Component {
  maxId = 100;
  state = {
    messagesToUser: [
      { id: 1, label: 'SoMETIMES...' },
      { id: 2, label: 'God TAKES MOMMIES ANd PuPPIES AWAY...' },
      { id: 3, label: 'ANd SoMETIMES..' },
      { id: 4, label: 'JuST SoMETIMES...I do' }
    ],
    messagesFromUser: [
      { id: 1, label: 'SoMETIMES...' },
      { id: 2, label: 'God TAKES MOMMIES ANd PuPPIES AWAY...' },
      { id: 3, label: 'ANd SoMETIMES..' },
      { id: 4, label: 'JuST SoMETIMES...I do' }
    ],
    activeDialog: null
  }

  onMessageAdded = (label) => {
    this.setState((state) => {
      const item = this.addMessage(label);
      return { messagesToUser: [...state.messagesToUser, item] };
    })
  };

  addMessage(label) {
    return {
      id: ++this.maxId,
      label
    };
  }

  fetchDialog = (id) => {
    axios.get(`/api/dialogs/${id}`)
      .then(response => {
        this.setState({ activeDialog: response.data })
        console.log(this.state.activeDialog)
      })
      .catch(error => {
        console.log("creation error", error);
      });

  }

  componentDidUpdate() {
    const { activeDialogId } = this.props;
    const { activeDialog } = this.state;
    if (!activeDialog || activeDialog.id !== activeDialogId) {
      this.fetchDialog(activeDialogId);
    }
  }

  componentDidMount() {
    
    const { activeDialogId } = this.props;
    if (activeDialogId) {
      this.fetchDialog(activeDialogId);
    }
  }

  render() {
    const { messagesToUser, activeDialog } = this.state;
    const messagesToUserList = messagesToUser.map((item) => {
      const { id, ...itemProps } = item;
      return (
        <li key={id} >
          <MessageItemRecieve {...itemProps} />
        </li>
      );
    });
    return (
      <div className="message">
        <MessageHeader activeDialog={activeDialog} />
        <section className="message__container" id="style-1">
          <ul className="message__container-items">
            {activeDialog ? messagesToUserList : null}
          </ul>
        </section>
        <MessageFooter
          onMessageAdded={this.onMessageAdded}
          activeDialog={activeDialog} />
      </div>
    );
  }
}