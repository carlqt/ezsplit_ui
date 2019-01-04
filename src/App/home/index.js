import React, { Component } from 'react';
import styles from './home.module.css';
import Sidebar from 'Components/sidebar';

class Home extends Component {
  render() {
    return (
      <div className={styles.container} >
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
      </div>
    );
  }
}

export default Home;
