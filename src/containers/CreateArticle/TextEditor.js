import React, { Component } from "react";
import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const { EDITOR_API_KEY } = process.env;

/* eslint-disable-next-line */
class TextEditor extends Component {
  render() {
    const {
      value,
      imageUploadHandler,
      editorChangeHandler,
      bodyPlaceholderFocusInHandler,
      bodyPlaceholderFocusOutHandler
    } = this.props;
    return (
      <Editor
        apiKey={EDITOR_API_KEY}
        value={value}
        onEditorChange={editorChangeHandler}
        onFocusIn={bodyPlaceholderFocusInHandler}
        onFocusOut={bodyPlaceholderFocusOutHandler}
        init={{
          menubar: false,
          theme: "inlite",
          inline: true,
          mobile: {
            theme: "mobile",
            plugins: ["autosave", "lists", "autolink"]
          },
          plugins: [
            "autolink",
            "codesample",
            "link",
            "linkchecker",
            "lists",
            "mediaembed",
            "textcolor",
            "image",
            "emoticons",
            "paste"
          ],
          selection_toolbar:
            "bold italic underline strikethrough| blockquote quicklink | alignleft aligncenter alignright alignfull | numlist bullist",
          images_upload_handler: imageUploadHandler,
          images_reuse_filename: true,
          toolbar: "emoticons",
          force_br_newlines: true,
          force_p_newlines: false,
          forced_root_block: '',
          paste_as_text: true
        }}
      />
    );
  }
}

TextEditor.propTypes = {
  imageUploadHandler: PropTypes.func.isRequired,
  editorChangeHandler: PropTypes.func.isRequired,
};

export default TextEditor;
