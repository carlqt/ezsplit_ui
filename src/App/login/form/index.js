import React, { Component } from 'react';
import { login } from 'App/login/actions';
import styles from './form.module.css';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]:  value,
    })
  }

  onSubmit = (event) => {
    login(this.state);
    event.preventDefault();
  }

  render() {
    const { email, password } = this.state;

    return (
      <form className={styles.container} onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="email"
          onChange={this.onChange}
          value={email}
          name="email"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={this.onChange}
          value={password}
        />
        <button>Login</button>
      </form>
    )
  }
}

export default Form;
