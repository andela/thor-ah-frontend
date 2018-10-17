import React from 'react';
// styles
// images
import dotIcon from "../../assets/dot.png";
import likeIcon from "../../assets/up.png";
import dislikeIcon from "../../assets/down.png";
import commentIcon from '../../assets/comment.png';
import styles from './ArticleReaction.module.css';
import Favorite from '../Favorite/Favorite';

class ArticleReaction extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      optionsActive: false,
      message: ''
    }
  }

  toggleMoreOptions = () => {
    const { optionsActive } = this.state
    this.setState({ optionsActive: !optionsActive })
  }

  setMessasge = (msg) => {
    this.setState({ message: msg })
  }

  render() {
    const { articleId } = this.props;
    const { optionsActive, message } = this.state;

    const style = {
      display: optionsActive ? 'block' : 'none',
    };

    let showMessage;
    if (message !== '') {
      setTimeout(() => { this.setState({ message: '' }) }, 3000)
      showMessage = <div className={styles.message} id='message'> {message} </div>
    }


    return (
      <div className="d-flex justify-content-end">
        <div className="px-2">
          <img src={likeIcon} alt="icon" />
          <span>1.3K</span>
        </div>
        <div className="px-2">
          <img src={dislikeIcon} alt="icon" />
          <span>3</span>
        </div>
        <div className="px-2">
          <img src={commentIcon} alt="icon" />
          <span>145</span>
        </div>

        <div className={styles.popupContainer}>
          <button type='button' className={styles.transparentBtn} onClick={this.toggleMoreOptions}> <img src={dotIcon} alt="icon" /></button>

          <div className={styles.popup} id={styles.popup1} style={style}>
            <Favorite articleId={articleId} setMessasge={this.setMessasge} hideOptions={this.toggleMoreOptions} />
            <button type='button' className={styles.button}>Report abuse</button>
          </div>

          {showMessage}

        </div>
      </div>

    );
  }
}

export default ArticleReaction;
