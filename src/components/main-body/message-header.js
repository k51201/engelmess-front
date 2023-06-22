import React, { Component } from 'react';

import './messenger.css';

export default class MessageHeader extends Component {

    render() {
        const { activeDialog } = this.props;
        const interlocutor = activeDialog ?
            <p
                className="message__header-text">
                <p>{activeDialog.user.username}</p>
                <span>В сети</span>
            </p>
        :
            <p className="message__header-text">
                Выберите собеседника, чтобы начать диалог
            </p>
        return (
            <div className="message__header">
                <div className="message__header-info">
                    {interlocutor}
                </div>
                <div className="message__header-menu">
                    <i className="fa fa-book fa-lg"></i>
                    <i className="fa fa-search fa-lg"></i>
                </div>
            </div>
        );
    }
}