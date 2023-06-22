import React, { Component } from 'react';

import './messenger.css';

export default class MessageFooter extends Component {

    state = {
        label: ''
    };

    onLabelChange = (event) => {
        this.setState({
            label: event.target.value
        })
    };

    onSubmit = (event) => {
        event.preventDefault();
        const { label } = this.state;
        this.setState({ label: '' });
        const cb = this.props.onMessageAdded || (() => { });
        cb(label);
        console.log('kva');
    };

    render() {
        const { activeDialog } = this.props;
        const inputField = <span>
            <input
                type="text"
                placeholder="Написать сообщение..."
                onChange={this.onLabelChange}
                value={this.state.label}>
            </input>
            <button
                type="submit"
                className="fa fa-paper-plane fa-lg">
            </button>
        </span>
        return (
            <div className="message__footer">
                <div className="message__footer-menu">
                    <i className="fa fa-gift fa-lg"> </i>
                    <i className="fa fa-camera fa-lg"></i>
                    <i className="fa fa-microphone fa-lg"></i>
                    <i className="fa fa-smile-o fa-lg"></i>
                </div>
                <form
                    className="message__footer-message"
                    onSubmit={this.onSubmit}>
                    {activeDialog ? inputField : null}

                </form>
            </div>
        );
    }
};