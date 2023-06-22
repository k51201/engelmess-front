import React, { Component } from 'react';

import './app-header.css';

export default class AppHeader extends Component {

    render() {
        const { user, handleLogout } = this.props;
        const greeting = user ? `Добро пожаловать, ${user.username}!` : 'что то не так';

        const Logged = <span>
            <a href="/" className="logAction">{greeting} </a>
            <button
                className="active"
                onClick={handleLogout}
                href="/authpage">Выйти
            </button>
        </span>

        return (
            <div className="header">
                <img className="messlogo" height="35px" width="35px" alt="logo of the messenger" src="/images/logo.png"></img>
                <a href="/" className="logo">angermess</a>
                <div className="header-right">
                    {user ? Logged : null}
                </div>
            </div>
        );
    }
}