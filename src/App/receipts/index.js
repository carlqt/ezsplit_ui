import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './receipts.module.css';

class Receipts extends Component {
  render() {
    return (
      <div className={styles.container} >
        <div className={styles.inputsContainer}>
          <div>
            <label>Name</label>
            <input type="text" placeholder="name" />
          </div>

          <div>
            <label>Cost</label>
            <input type="number" min="0" placeholder="cost" />
          </div>
        </div>
      </div>
    );
  }
}

export default Receipts;
