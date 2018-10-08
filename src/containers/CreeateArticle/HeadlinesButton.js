import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeadlinesPicker from './HeadlinesPickter';

import styles from "./CreateArticle.module.scss";

class HeadlinesButton extends Component {
  onClick = () => {
    const { onOverrideContent } = this.props;
    onOverrideContent(HeadlinesPicker);
  };

  render() {
    return (
      <div className={styles.headlineButtonWrapper}>
        <button
          onClick={this.onClick}
          className={styles.headlineButton}
          type="button"
        >
          H
        </button>
      </div>
    );
  }
}

HeadlinesButton.propTypes = {
  onOverrideContent: PropTypes.func.isRequired
}

export default HeadlinesButton;
