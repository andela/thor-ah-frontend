import React, { Component } from "react";
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton
} from "draft-js-buttons";

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => window.addEventListener("click", this.onWindowClick));
  }

  componentWillMount = () => {
    window.removeEventListener("click", this.onWindowClick);
  };

  onWindowClick = () => {
    const { onOverrideContent } = this.props;
    onOverrideContent(undefined);
  };

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => (
          /* eslint-disable-next-line */
          <Button key={i} {...this.props} />
        ))}
      </div>
    );
  }
}

export default HeadlinesPicker;
