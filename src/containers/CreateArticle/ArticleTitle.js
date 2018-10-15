import React from "react";
import PropTypes from "prop-types";
import { Editor } from "@tinymce/tinymce-react";

const { EDITOR_API_KEY } = process.env;

const ArticleTitle = ({
  value,
  titleChangeHandler,
  titlePlaceholderFocusInHandler,
  titlePlaceholderFocusOutHandler
}) => (
  <Editor
    apiKey={EDITOR_API_KEY}
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
  titlePlaceholderFocusInHandler: PropTypes.func.isRequired,
  titlePlaceholderFocusOutHandler: PropTypes.func.isRequired
};

export default ArticleTitle;
