import React, { Component } from 'react';

import './messenger.css';
import DialogsList from './dialogs-list';
import UsersList from './users-list';

export default class ContactsPanel extends Component {
  state = {
    term: '',
    rosterMode: true,
  }

  onClickPlusCirceButton = (event) => {
    event.preventDefault();
    this.setState(({ rosterMode }) => {
      return { rosterMode: !rosterMode }
    });
  };

  onTermChange = (event) => {
    this.setState({
      term: event.target.value
    });
  }

  activate = (id) => {
    const { activateDialog } = this.props;
    this.setState({ rosterMode: true });
    activateDialog(id);
    this.setState({term: ''});
  }

  render() {
    const { term, rosterMode } = this.state;

    return (
      <div className="contacts" id="style-1">
        <div className="contacts_menu">
          <div className="contacts_menu-menu">
            <button
              className="fa fa-plus-circle fa-lg"
              onClick={this.onClickPlusCirceButton}
            ></button>
          </div>
          <div className="contacts__menu-search">
            <input
              type="text"
              placeholder="Поиск..."
              value={term}
              onChange={this.onTermChange}></input>
          </div>
        </div>
        <div className="dialogs__container" id="style-1">
          <ul className="contacts-list">
            {rosterMode ?
                <DialogsList term={term} activateDialog={this.activate} />
               :
              <div>
                <div className="start-dialog-message">
                  {!term ? <h2>Введите имя пользователя в строку поиска</h2> : null}
                </div>
                <UsersList term={term} activateDialog={this.activate}  />
              </div>}
          </ul>
        </div>
      </div>
    );
  }
}
