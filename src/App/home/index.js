import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className={styles.container} >
        <div className={styles.sidebar}>
          <h3>Groups</h3>
          <Link to="/receipts/new">
            <h3>Create Receipt</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
