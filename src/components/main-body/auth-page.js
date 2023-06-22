import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import './auth-reg-page.css';

const initialState = {
    email: "",
    password: "",
    emailError: "",
    passwordError: ""
};

class AuthPage extends Component {
    state = initialState;

    handleChange = event => {
        const isCheckbox = event.target.type === "checkbox";
        this.setState({
            [event.target.name]: isCheckbox
                ? event.target.checked
                : event.target.value
        });
    };

    validate = () => {
        let emailError = "";
        let passwordError = "";

        if (!this.state.password) {
            passwordError = "Введите пароль";
        }

        if (!this.state.email.includes("@")) {
            emailError = "Неправильный email";
        }

        if (emailError || passwordError) {
            this.setState({ emailError, passwordError });
            return false;
        }
        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            const { history, handleLogin } = this.props
            const { email, password } = this.state;
            axios
                .post(
                    "/api/auth",
                    {
                        email: email,
                        password: password
                    },
                    { withCredentials: true }
                )
                .then(response => {
                    console.log(response.data);
                    if (response.data.Success === true) {
                        handleLogin().then(() => {
                             history.push('/')
                        });
                    } else {
                        let passwordError = "Неверный email или пароль";
                        this.setState({ passwordError });
                    }
                })
                .catch(error => {
                    console.log("login error", error);
                });
            event.preventDefault();
            this.setState(initialState);
        }
    };

    render() {
        return (
            <div className="limiter">
                <div id="wrapper">
                    <h1>Войти</h1>
                    <form
                        id="form"
                        method="post"
                        // action="/api/auth"
                        onSubmit={this.handleSubmit}
                        autoComplete="off">
                        <input
                            type="text"
                            d="login-email"
                            name="email"
                            placeholder="Введите Email"
                            onChange={this.handleChange} 
                            value={this.state.email}/>
                        <input
                            type="password"
                            id="login-password"
                            name="password"
                            placeholder="Введите пароль"
                            onChange={this.handleChange}
                            value={this.state.password} />
                        <p className="error">
                            {this.state.emailError}
                        </p>
                        <p className="error">
                            {this.state.passwordError}
                        </p>
                        <button type="submit" id="login-button" >&#xf0da;</button>
                        <p>Нет аккаунта?
                        <a href="./regpage"
                                className="switch-button"
                            >   Зарегистрируйся</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(AuthPage)