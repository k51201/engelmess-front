import React from 'react';

import './messenger.css';

const DialogsListItem = ({ dialog, activateDialog }) => {
  return (
    <div
      className="contacts__item"
      onClick={() => activateDialog(dialog.id)}>
      <div className="contacts__item-left">
        <div className="contacts__item-text">
          <p>{dialog.user.username}</p>
          <span>Привет</span>
        </div>
      </div>
      <div className="contacts__item-time">11:45  | June 11 </div>
    </div>
  );
};

export default DialogsListItem
