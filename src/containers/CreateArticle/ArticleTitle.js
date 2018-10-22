import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";

const { REACT_APP_EDITOR_API_KEY } = process.env;

const ArticleTitle = ({
  value,
  titleChangeHandler,
  titlePlaceholderFocusInHandler,
  titlePlaceholderFocusOutHandler
}) => (
  <Editor
    apiKey={REACT_APP_EDITOR_API_KEY}
    value={value}
    onEditorChange={titleChangeHandler}
    onFocusIn={titlePlaceholderFocusInHandler}
    onFocusOut={titlePlaceholderFocusOutHandler}
    name="article-title"
    tagName="h1"
    init={{
      menubar: false,
      inline: true,
      theme: "inlite"
    }}
  />
);

ArticleTitle.propTypes = {
  value: PropTypes.string.isRequired,
  titleChangeHandler: PropTypes.func.isRequired,
};

export default ArticleTitle;
