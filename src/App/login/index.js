import React, { Component } from 'react';

import Form from './form';
import styles from "./login.module.css";

class Login extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Form />
        </div>
      </div>
    )
  }
}

export default Login;
