import React, { Component } from 'react';
import axios from 'axios';

import '../main-body/auth-reg-page.css';

const initialState = {
    username: "",
    email: "",
    password: "",
    repeatpassword: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    repeatpasswordError: "",
    checkRegistration: ""
};


export default class RegPage extends Component {
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
        let blankFieldsError = "";
        let usernameError = "";
        let emailError = "";
        let repeatpasswordError = "";
        if (!this.state.username || !this.state.email || !this.state.password || !this.state.repeatpassword) {
            blankFieldsError = "Все поля должны быть заполнены!";
        }
        if (this.state.username.length < 3 || this.state.username.length > 16) {
            usernameError = "Длина логина от 3 до 16 символов!"
        }

        if (!this.state.email.includes("@")) {
            emailError = "Неправильный email";
        }

        if (this.state.password !== this.state.repeatpassword) {
            repeatpasswordError = "Пароли не совпадают";
        }

        if (emailError || repeatpasswordError || blankFieldsError || usernameError) {
            this.setState({ emailError, repeatpasswordError, blankFieldsError, usernameError });
            return false;
        }
        return true;
    };

    handleSubmit = event => {
        event.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            console.log(this.state);
            const { username, email, password, repeatpassword } = this.state;
            axios
                .post(
                    "/api/reg",
                    {
                        username: username,
                        email: email,
                        password: password,
                        repeatpassword: repeatpassword
                    },
                    { withCredentials: true }
                )
                .then(response => {
                    console.log(response.data);
                    if (response.data.Success === true){
                        let checkRegistration = "Вы успешно зарегистрировались. Войдите в аккаунт";
                        this.setState({checkRegistration});
                    } else {
                        let checkRegistration = "Email уже занят";
                        this.setState({checkRegistration});
                    }
                })
                .catch(error => {
                    console.log("registration error", error);
                });
            this.setState(initialState);
        }
    };
    render() {
        return (
            <div className="limiter">
                <div className="container-login">
                    <div id="wrapper">
                        <h1>Создать аккаунт</h1>
                        <form
                            id="form"
                            method="post"
                            autoComplete="off"
                            onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                id="register-username"
                                name="username"
                                placeholder="Введите имя"
                                onChange={this.handleChange} 
                                value={this.state.username}/>
                            <input
                                type="text"
                                id="register-email"
                                name="email"
                                placeholder="Введите Email"
                                onChange={this.handleChange} 
                                value={this.state.email}/>
                            <input
                                type="password"
                                id="register-password"
                                name="password"
                                placeholder="Введите пароль"
                                onChange={this.handleChange} 
                                value={this.state.password}/>
                            <input
                                type="password"
                                id="register-repeatpassword"
                                name="repeatpassword"
                                placeholder="Повторите пароль"
                                onChange={this.handleChange} 
                                value={this.state.repeatpassword}/>
                            <p className="error">
                                {this.state.blankFieldsError}
                            </p>
                            <p className="error">
                                {this.state.emailError}
                            </p>
                            <p className="error">
                                {this.state.usernameError}
                            </p>
                            <p className="error">
                                {this.state.repeatpasswordError}
                            </p>
                            <p className="error" value={this.state.checkRegistration} >
                                {this.state.checkRegistration}
                            </p>
                            <button type="submit" id="register-button">&#xf0da;</button>
                            <p>Уже есть аккаунт? <a href="./authpage">Войди</a></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}